
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-24 h-24 border-8 border-dashed rounded-full animate-spin border-purple-500"></div>
        <p className="text-purple-400 text-lg font-semibold">Creating your masterpiece...</p>
    </div>
  );
};
