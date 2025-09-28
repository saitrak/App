
import React from 'react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  isLoading: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, isLoading }) => {
  return (
    <div>
      <label htmlFor="prompt" className="block text-sm font-medium text-purple-300 mb-2">
        Enter your prompt
      </label>
      <textarea
        id="prompt"
        rows={4}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={isLoading}
        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
        placeholder="e.g., A majestic lion wearing a crown, sitting on a throne in space"
      />
    </div>
  );
};
