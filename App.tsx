import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { StyleSelector } from './components/StyleSelector';
import { GenerateButton } from './components/GenerateButton';
import { ImageCard } from './components/ImageCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { generateImage } from './services/geminiService';
import { IMAGE_STYLES, ASPECT_RATIOS, IMAGE_TYPES } from './constants';
import type { ImageStyle, ImageTypeOption } from './types';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [style, setStyle] = useState<ImageStyle>(IMAGE_STYLES[0]);
  const [aspectRatio, setAspectRatio] = useState<string>(ASPECT_RATIOS[0]);
  const [imageType, setImageType] = useState<ImageTypeOption>(IMAGE_TYPES[0]);

  const [generatedImage, setGeneratedImage] = useState<{ src: string; type: ImageTypeOption } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt) {
      setError('Please enter a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const fullPrompt = `${prompt}, ${style.promptSuffix}`;
      const imageData = await generateImage(fullPrompt, aspectRatio, imageType.mimeType);
      if (imageData) {
        const imageUrl = `data:${imageType.mimeType};base64,${imageData}`;
        setGeneratedImage({ src: imageUrl, type: imageType });
      } else {
        setError('Failed to generate image. The response was empty.');
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, style, aspectRatio, imageType]);

  const handleDownload = useCallback(() => {
    if (!generatedImage) return;

    const link = document.createElement('a');
    link.href = generatedImage.src;
    const fileName = prompt.substring(0, 20).replace(/[^a-zA-Z0-9]/g, '_').toLowerCase() || 'generated_image';
    link.download = `${fileName}.${generatedImage.type.extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [generatedImage, prompt]);

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200 font-sans antialiased">
      <main className="container mx-auto px-4 py-8">
        <Header />

        <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-800 rounded-2xl shadow-2xl shadow-purple-900/20">
          <div className="space-y-6">
            <PromptInput
              prompt={prompt}
              setPrompt={setPrompt}
              isLoading={isLoading}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StyleSelector
                selectedStyle={style}
                onStyleChange={setStyle}
                styles={IMAGE_STYLES}
                isLoading={isLoading}
              />
              <div>
                <label htmlFor="aspectRatio" className="block text-sm font-medium text-purple-300 mb-2">Quality</label>
                <select
                  id="aspectRatio"
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {ASPECT_RATIOS.map(ratio => <option key={ratio} value={ratio}>{ratio}</option>)}
                </select>
              </div>
               <div>
                <label htmlFor="imageType" className="block text-sm font-medium text-purple-300 mb-2">Format</label>
                <select
                  id="imageType"
                  value={imageType.name}
                  onChange={(e) => {
                    const selected = IMAGE_TYPES.find(t => t.name === e.target.value);
                    if (selected) setImageType(selected);
                  }}
                  disabled={isLoading}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {IMAGE_TYPES.map(type => <option key={type.name} value={type.name}>{type.name}</option>)}
                </select>
              </div>
            </div>
            <GenerateButton
              onClick={handleGenerate}
              isLoading={isLoading}
            />
          </div>
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mt-6 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-center">
            <p>{error}</p>
          </div>
        )}

        <div className="mt-12">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner />
            </div>
          ) : (
            generatedImage && (
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-center text-purple-400 mb-6">Generated Image</h2>
                <div className="space-y-6">
                  <ImageCard src={generatedImage.src} alt={`Generated image for: ${prompt}`} />
                  <button
                    onClick={handleDownload}
                    className="w-full flex justify-center items-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Download Image
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
