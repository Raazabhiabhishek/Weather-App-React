import { WeatherData, SearchResult, Units } from '../types/weather';

const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

import { mockWeatherData } from './mockData';

export const getWeatherData = async (
  lat: number,
  lon: number,
  units: Units = 'metric'
): Promise<WeatherData> => {
  if (API_KEY === 'YOUR_API_KEY') {
    console.warn('Using mock weather data. Please add your OpenWeatherMap API key.');
    return mockWeatherData;
  }

  try {
    const response = await fetch(
      `${BASE_URL}/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Weather data not available');
    }

    const data = await response.json();
    
    return {
      location: {
        name: '', 
        country: '',
        lat,
        lon,
      },
      current: {
        temp: data.current.temp,
        feels_like: data.current.feels_like,
        humidity: data.current.humidity,
        wind_speed: data.current.wind_speed,
        weather: data.current.weather[0],
        dt: data.current.dt,
        sunrise: data.current.sunrise,
        sunset: data.current.sunset,
        uvi: data.current.uvi,
        visibility: data.current.visibility,
        pressure: data.current.pressure,
      },
      forecast: data.daily.slice(1, 6).map((day: any) => ({
        dt: day.dt,
        sunrise: day.sunrise,
        sunset: day.sunset,
        temp: day.temp,
        feels_like: day.feels_like,
        pressure: day.pressure,
        humidity: day.humidity,
        weather: day.weather,
        wind_speed: day.wind_speed,
        pop: day.pop,
      })),
      alerts: data.alerts,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const searchLocation = async (query: string): Promise<SearchResult[]> => {
  if (API_KEY === 'YOUR_API_KEY') {
    console.warn('Using mock location data. Please add your OpenWeatherMap API key.');
    return [
      { name: 'New Delhi', country: 'IN', lat: 28.6139, lon: 77.2090 },
      { name: 'Mumbai', country: 'IN', lat: 19.0760, lon: 72.8777 },
      { name: 'Bangalore', country: 'IN', lat: 12.9716, lon: 77.5946 },
      { name: 'Chennai', country: 'IN', lat: 13.0827, lon: 80.2707 },
      { name: 'Kolkata', country: 'IN', lat: 22.5726, lon: 88.3639 },
    ];
  }

  try {
    // Prioritize Indian cities by appending ", IN" to the search query
    const indianQuery = query.includes(',') ? query : `${query}, IN`;
    const response = await fetch(
      `${GEO_URL}/direct?q=${encodeURIComponent(indianQuery)}&limit=5&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Location search failed');
    }

    const data = await response.json();
    
    // If no Indian cities found, try the original query
    if (data.length === 0 && !query.includes(',')) {
      const globalResponse = await fetch(
        `${GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
      );
      
      if (!globalResponse.ok) {
        throw new Error('Location search failed');
      }
      
      const globalData = await globalResponse.json();
      return globalData.map((item: any) => ({
        name: item.name,
        country: item.country,
        lat: item.lat,
        lon: item.lon,
      }));
    }
    
    return data.map((item: any) => ({
      name: item.name,
      country: item.country,
      lat: item.lat,
      lon: item.lon,
    }));
  } catch (error) {
    console.error('Error searching location:', error);
    throw error;
  }
};

export const getLocationByCoords = async (
  lat: number,
  lon: number
): Promise<SearchResult> => {
  if (API_KEY === 'YOUR_API_KEY') {
    console.warn('Using mock reverse geocoding data. Please add your OpenWeatherMap API key.');
    return { name: 'New Delhi', country: 'IN', lat: 28.6139, lon: 77.2090 };
  }

  try {
    const response = await fetch(
      `${GEO_URL}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Reverse geocoding failed');
    }

    const data = await response.json();
    
    if (data.length === 0) {
      throw new Error('No location found for coordinates');
    }
    
    return {
      name: data[0].name,
      country: data[0].country,
      lat: data[0].lat,
      lon: data[0].lon,
    };
  } catch (error) {
    console.error('Error in reverse geocoding:', error);
    throw error;
  }
};
