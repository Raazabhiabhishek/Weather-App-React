import React from 'react';
import { WeatherData, Units } from '../types/weather';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Wind, Droplets, Thermometer } from 'lucide-react';

interface CurrentWeatherProps {
  data: WeatherData;
  units: Units;
}

export function CurrentWeather({ data, units }: CurrentWeatherProps) {
  const { current, location } = data;
  
  // Get the appropriate weather icon based on the weather condition
  const getWeatherIcon = () => {
    const iconCode = current.weather.icon;
    const id = current.weather.id;
    
    // Check if it's day or night
    const isDay = iconCode.includes('d');
    
    // Based on weather condition code
    if (id >= 200 && id < 300) {
      return <CloudLightning className="h-16 w-16 text-yellow-300" />;
    } else if (id >= 300 && id < 600) {
      return <CloudRain className="h-16 w-16 text-blue-400" />;
    } else if (id >= 600 && id < 700) {
      return <CloudSnow className="h-16 w-16 text-blue-100" />;
    } else if (id >= 700 && id < 800) {
      return <Wind className="h-16 w-16 text-gray-400" />;
    } else if (id === 800) {
      return <Sun className="h-16 w-16 text-yellow-400" />;
    } else {
      return <Cloud className="h-16 w-16 text-gray-300" />;
    }
  };
  
  // Format temperature with unit
  const formatTemp = (temp: number) => {
    return `${Math.round(temp)}°${units === 'metric' ? 'C' : 'F'}`;
  };
  
  // Format wind speed with unit
  const formatWind = (speed: number) => {
    return units === 'metric' 
      ? `${speed.toFixed(1)} m/s` 
      : `${speed.toFixed(1)} mph`;
  };
  
  // Format date
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString(undefined, options);
  };

  // Format time
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString(undefined, { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  // Check if it's currently day or night
  const isDay = current.dt > current.sunrise && current.dt < current.sunset;
  
  // Determine the background class based on weather
  const getBackgroundClass = () => {
    const id = current.weather.id;
    
    if (id >= 200 && id < 300) { // Thunderstorm
      return 'bg-gradient-to-br from-gray-700 to-gray-900';
    } else if (id >= 300 && id < 600) { // Drizzle and Rain
      return 'bg-gradient-to-br from-blue-700 to-blue-900';
    } else if (id >= 600 && id < 700) { // Snow
      return 'bg-gradient-to-br from-blue-100 to-blue-300';
    } else if (id >= 700 && id < 800) { // Atmosphere (fog, mist, etc.)
      return 'bg-gradient-to-br from-gray-400 to-gray-600';
    } else if (id === 800) { // Clear sky
      return isDay 
        ? 'bg-gradient-to-br from-blue-400 to-blue-600' 
        : 'bg-gradient-to-br from-indigo-900 to-purple-900';
    } else { // Clouds
      return isDay 
        ? 'bg-gradient-to-br from-blue-300 to-gray-400' 
        : 'bg-gradient-to-br from-gray-700 to-gray-900';
    }
  };

  return (
    <div className={`${getBackgroundClass()} rounded-2xl shadow-xl overflow-hidden transition-all duration-500`}>
      <div className="p-6 text-white">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h2 className="text-2xl font-bold">{location.name}, {location.country}</h2>
            <p className="text-sm opacity-80">{formatDate(current.dt)}</p>
            <p className="text-sm opacity-80">Updated as of {formatTime(current.dt)}</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center">
            {getWeatherIcon()}
            <span className="text-5xl font-light ml-2">{formatTemp(current.temp)}</span>
          </div>
        </div>
        
        <div className="mt-6">
          <p className="text-xl capitalize">{current.weather.description}</p>
          <p className="text-sm">Feels like {formatTemp(current.feels_like)}</p>
        </div>
        
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-10 rounded-lg p-3 backdrop-blur-sm">
            <div className="flex items-center text-sm font-medium">
              <Thermometer className="h-4 w-4 mr-1" />
              <span>Feels Like</span>
            </div>
            <p className="text-lg font-semibold mt-1">{formatTemp(current.feels_like)}</p>
          </div>
          
          <div className="bg-white bg-opacity-10 rounded-lg p-3 backdrop-blur-sm">
            <div className="flex items-center text-sm font-medium">
              <Droplets className="h-4 w-4 mr-1" />
              <span>Humidity</span>
            </div>
            <p className="text-lg font-semibold mt-1">{current.humidity}%</p>
          </div>
          
          <div className="bg-white bg-opacity-10 rounded-lg p-3 backdrop-blur-sm">
            <div className="flex items-center text-sm font-medium">
              <Wind className="h-4 w-4 mr-1" />
              <span>Wind</span>
            </div>
            <p className="text-lg font-semibold mt-1">{formatWind(current.wind_speed)}</p>
          </div>
          
          <div className="bg-white bg-opacity-10 rounded-lg p-3 backdrop-blur-sm">
            <div className="flex items-center text-sm font-medium">
              <Sun className="h-4 w-4 mr-1" />
              <span>UV Index</span>
            </div>
            <p className="text-lg font-semibold mt-1">{current.uvi.toFixed(1)}</p>
          </div>
        </div>
        
        <div className="mt-6 flex justify-between items-center">
          <div>
            <p className="text-sm opacity-80">Sunrise</p>
            <p className="font-medium">{formatTime(current.sunrise)}</p>
          </div>
          
          <div className="border-t border-white border-opacity-20 flex-grow mx-4 my-2"></div>
          
          <div>
            <p className="text-sm opacity-80">Sunset</p>
            <p className="font-medium">{formatTime(current.sunset)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
