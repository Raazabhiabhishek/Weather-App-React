import React from 'react';
import { ForecastDay as ForecastDayType, Units } from '../types/weather';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Wind } from 'lucide-react';

interface ForecastDayProps {
  day: ForecastDayType;
  units: Units;
}

export function ForecastDay({ day, units }: ForecastDayProps) {
  // Format day name
  const getDayName = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString(undefined, { weekday: 'short' });
  };
  
  // Format date (e.g., "Jun 15")
  const getDateString = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Get weather icon based on weather condition
  const getWeatherIcon = () => {
    const weather = day.weather[0];
    const id = weather.id;
    
    if (id >= 200 && id < 300) {
      return <CloudLightning className="h-8 w-8 text-yellow-300" />;
    } else if (id >= 300 && id < 600) {
      return <CloudRain className="h-8 w-8 text-blue-400" />;
    } else if (id >= 600 && id < 700) {
      return <CloudSnow className="h-8 w-8 text-blue-100" />;
    } else if (id >= 700 && id < 800) {
      return <Wind className="h-8 w-8 text-gray-400" />;
    } else if (id === 800) {
      return <Sun className="h-8 w-8 text-yellow-400" />;
    } else {
      return <Cloud className="h-8 w-8 text-gray-300" />;
    }
  };
  
  // Format temperature with unit
  const formatTemp = (temp: number) => {
    return `${Math.round(temp)}°`;
  };
  
  // Calculate the rain probability as a percentage
  const getRainProbability = () => {
    return `${Math.round(day.pop * 100)}%`;
  };

  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-4 transition-all duration-300 hover:bg-opacity-30 hover:shadow-lg">
      <div className="flex flex-col items-center">
        <h3 className="font-semibold text-white">{getDayName(day.dt)}</h3>
        <p className="text-xs text-white opacity-80">{getDateString(day.dt)}</p>
        
        <div className="my-3">
          {getWeatherIcon()}
        </div>
        
        <p className="text-xs text-white capitalize mb-2">{day.weather[0].description}</p>
        
        <div className="flex justify-between w-full mt-2">
          <span className="text-white font-bold">{formatTemp(day.temp.max)}</span>
          <span className="text-white opacity-70">{formatTemp(day.temp.min)}</span>
        </div>
        
        {day.pop > 0 && (
          <div className="mt-2 text-xs text-white flex items-center">
            <CloudRain className="h-3 w-3 mr-1" />
            <span>{getRainProbability()}</span>
          </div>
        )}
      </div>
    </div>
  );
}
