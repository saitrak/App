
import React from 'react';

interface ImageCardProps {
  src: string;
  alt: string;
}

export const ImageCard: React.FC<ImageCardProps> = ({ src, alt }) => {
  return (
    <div className="bg-gray-800 p-2 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
      <img
        src={src}
        alt={alt}
        className="rounded-md w-full h-auto object-cover"
        loading="lazy"
      />
    </div>
  );
};
