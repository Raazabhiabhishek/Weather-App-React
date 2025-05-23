import React from 'react';
import { Units } from '../types/weather';

interface UnitToggleProps {
  units: Units;
  setUnits: (units: Units) => void;
}

export function UnitToggle({ units, setUnits }: UnitToggleProps) {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setUnits('metric')}
        className={`px-3 py-1 rounded-l-full text-sm font-medium transition-all duration-200 ${
          units === 'metric'
            ? 'bg-white text-blue-500'
            : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
        }`}
      >
        °C
      </button>
      <button
        onClick={() => setUnits('imperial')}
        className={`px-3 py-1 rounded-r-full text-sm font-medium transition-all duration-200 ${
          units === 'imperial'
            ? 'bg-white text-blue-500'
            : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
        }`}
      >
        °F
      </button>
    </div>
  );
}
