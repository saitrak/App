
export interface ImageStyle {
  name: string;
  promptSuffix: string;
}

export interface ImageTypeOption {
  mimeType: 'image/jpeg' | 'image/png';
  extension: 'jpg' | 'png';
  name: string;
}
