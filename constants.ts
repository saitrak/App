
import type { ImageStyle, ImageTypeOption } from './types';

export const IMAGE_STYLES: ImageStyle[] = [
  { name: 'Cinematic', promptSuffix: 'cinematic style, dramatic lighting, high detail' },
  { name: 'Photorealistic', promptSuffix: 'photorealistic, 8k, sharp focus, detailed' },
  { name: 'Anime', promptSuffix: 'anime style, vibrant colors, clean lines' },
  { name: 'Digital Art', promptSuffix: 'digital painting, fantasy, intricate, concept art' },
  { name: 'Pixel Art', promptSuffix: 'pixel art, 16-bit, retro gaming style' },
  { name: 'Watercolor', promptSuffix: 'watercolor painting, soft edges, vibrant wash' },
  { name: 'Abstract', promptSuffix: 'abstract, geometric shapes, non-representational' },
  { name: '3D Render', promptSuffix: '3d render, octane render, high quality, realistic materials' },
  { name: 'Vintage', promptSuffix: 'vintage photograph, sepia tones, grainy texture' },
  { name: 'Minimalist', promptSuffix: 'minimalist style, clean, simple, few elements' },
];

export const ASPECT_RATIOS: string[] = ['1:1', '16:9', '9:16', '4:3', '3:4'];

export const IMAGE_TYPES: ImageTypeOption[] = [
    { mimeType: 'image/jpeg', extension: 'jpg', name: 'JPEG' },
    { mimeType: 'image/png', extension: 'png', name: 'PNG' },
];
