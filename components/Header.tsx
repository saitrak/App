
import React from 'react';

const WandIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 3l-2.5 2.5 3 3L17.5 6l-3-3zM3 21l3-3 2.5 2.5L6 23.5 3 21z" />
        <path d="M8 16l-3-3" />
        <path d="M14 8l-3-3" />
        <path d="M19 13l-3-3" />
        <path d="M22 16l-3-3" />
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex justify-center items-center gap-4">
        <WandIcon />
        <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          AI Image Generator
        </h1>
      </div>
      <p className="mt-4 text-lg text-gray-400">
        Bring your imagination to life. Describe anything and watch it become a stunning image.
      </p>
    </header>
  );
};
