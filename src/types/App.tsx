import React, { useState, useEffect } from 'react';
import { getWeatherData, getLocationByCoords, SearchResult } from './services/weatherService';
import { WeatherData, Units } from './types/weather';
import { SearchBar } from './components/SearchBar';
import { CurrentWeather } from './components/CurrentWeather';
import { Forecast } from './components/Forecast';
import { WeatherAlerts } from './components/WeatherAlerts';
import { UnitToggle } from './components/UnitToggle';
import { Cloud, CloudRain, Sun } from 'lucide-react';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [units, setUnits] = useState<Units>('metric');

  useEffect(() => {
    const savedUnits = localStorage.getItem('weatherUnits') as Units | null;
    if (savedUnits) {
      setUnits(savedUnits);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('weatherUnits', units);
  }, [units]);

  useEffect(() => {
    const initializeLocation = async () => {
      setLoading(true);
      setError(null);

      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              try {
                const userLocation = await getLocationByCoords(
                  position.coords.latitude,
                  position.coords.longitude
                );
                setLocation(userLocation);
                
                const data = await getWeatherData(
                  userLocation.lat,
                  userLocation.lon,
                  units
                );
                
                data.location = {
                  ...data.location,
                  name: userLocation.name,
                  country: userLocation.country
                };
                
                setWeatherData(data);
                setLoading(false);
              } catch (err) {
                console.error('Error fetching location data:', err);
                fallbackToDefaultLocation();
              }
            },
            (error) => {
              console.error('Geolocation error:', error);
              fallbackToDefaultLocation();
            }
          );
        } else {
          fallbackToDefaultLocation();
        }
      } catch (err) {
        console.error('Initialization error:', err);
        setError('Failed to initialize the weather app. Please try again later.');
        setLoading(false);
      }
    };

    const fallbackToDefaultLocation = async () => {
      try {
        // Default to New Delhi
        const defaultLocation: SearchResult = {
          name: 'New Delhi',
          country: 'IN',
          lat: 28.6139,
          lon: 77.2090
        };
        setLocation(defaultLocation);
        
        const data = await getWeatherData(
          defaultLocation.lat,
          defaultLocation.lon,
          units
        );
        
        data.location = {
          ...data.location,
          name: defaultLocation.name,
          country: defaultLocation.country
        };
        
        setWeatherData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching default location:', err);
        setError('Failed to load weather data. Please try again later.');
        setLoading(false);
      }
    };

    initializeLocation();
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!location) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const data = await getWeatherData(location.lat, location.lon, units);
        
        data.location = {
          ...data.location,
          name: location.name,
          country: location.country
        };
        
        setWeatherData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError('Failed to load weather data. Please try again later.');
        setLoading(false);
      }
    };

    if (location) {
      fetchWeatherData();
    }
  }, [location, units]);

  const handleSelectLocation = (selectedLocation: SearchResult) => {
    setLocation(selectedLocation);
  };

  const getBackgroundClass = () => {
    if (!weatherData) return 'bg-gradient-to-br from-blue-400 to-blue-700';
    
    const id = weatherData.current.weather.id;
    const isDay = weatherData.current.dt > weatherData.current.sunrise && 
                 weatherData.current.dt < weatherData.current.sunset;
    
    if (id >= 200 && id < 300) {
      return 'bg-gradient-to-br from-gray-700 to-gray-900';
    } else if (id >= 300 && id < 600) {
      return 'bg-gradient-to-br from-blue-700 to-blue-900';
    } else if (id >= 600 && id < 700) {
      return 'bg-gradient-to-br from-blue-100 to-blue-300';
    } else if (id >= 700 && id < 800) {
      return 'bg-gradient-to-br from-gray-400 to-gray-600';
    } else if (id === 800) {
      return isDay 
        ? 'bg-gradient-to-br from-orange-400 to-red-600' // Adjusted for Indian summer
        : 'bg-gradient-to-br from-indigo-900 to-purple-900';
    } else {
      return isDay 
        ? 'bg-gradient-to-br from-blue-300 to-blue-600' 
        : 'bg-gradient-to-br from-gray-700 to-gray-900';
    }
  };

  const WeatherBackgroundElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-16 -left-16 text-white text-opacity-10 animate-float">
        <Cloud size={120} />
      </div>
      <div className="absolute top-1/4 -right-16 text-white text-opacity-5 animate-float-delayed">
        <Cloud size={180} />
      </div>
      <div className="absolute bottom-1/3 -left-20 text-white text-opacity-5 animate-float-slow">
        <Cloud size={150} />
      </div>
      
      {weatherData?.current.weather.main === 'Clear' && (
        <div className="absolute -top-32 -right-32 text-yellow-400 text-opacity-10 animate-pulse-slow">
          <Sun size={250} />
        </div>
      )}
      {(weatherData?.current.weather.main === 'Rain' || weatherData?.current.weather.main === 'Drizzle') && (
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="rain-container">
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={i} 
                className="rain-drop"
                style={{ 
                  left: `${Math.random() * 100}%`, 
                  animationDuration: `${0.5 + Math.random() * 0.7}s`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              >
                <CloudRain size={20} className="text-white text-opacity-20" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className={`min-h-screen ${getBackgroundClass()} transition-colors duration-1000`}>
      <WeatherBackgroundElements />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div className="flex items-center">
            <Sun className="h-8 w-8 text-white mr-2" />
            <h1 className="text-2xl font-bold text-white">WeatherAI India</h1>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <SearchBar onSelectLocation={handleSelectLocation} />
            <UnitToggle units={units} setUnits={setUnits} />
          </div>
        </header>

        <main>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          ) : error ? (
            <div className="bg-red-500 bg-opacity-20 backdrop-blur-md rounded-xl p-6 text-white">
              <h2 className="text-xl font-semibold mb-2">Error</h2>
              <p>{error}</p>
              <button 
                className="mt-4 px-4 py-2 bg-white text-red-500 rounded-lg font-medium"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          ) : weatherData ? (
            <div className="animate-fade-in">
              <CurrentWeather data={weatherData} units={units} />
              <Forecast data={weatherData} units={units} />
              <WeatherAlerts alerts={weatherData.alerts} />
            </div>
          ) : null}
        </main>

        <footer className="mt-12 text-center text-white text-opacity-70 text-sm">
          <p>© 2025 WeatherAI • Powered by OpenWeatherMap & IMD</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
