
import React from 'react';
import type { ImageStyle } from '../types';

interface StyleSelectorProps {
  selectedStyle: ImageStyle;
  onStyleChange: (style: ImageStyle) => void;
  styles: ImageStyle[];
  isLoading: boolean;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onStyleChange, styles, isLoading }) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = styles.find(s => s.name === event.target.value);
    if (selected) {
      onStyleChange(selected);
    }
  };

  return (
    <div className="w-full">
      <label htmlFor="style" className="block text-sm font-medium text-purple-300 mb-2">
        Choose a style
      </label>
      <select
        id="style"
        value={selectedStyle.name}
        onChange={handleSelectChange}
        disabled={isLoading}
        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {styles.map((style) => (
          <option key={style.name} value={style.name}>
            {style.name}
          </option>
        ))}
      </select>
    </div>
  );
};
