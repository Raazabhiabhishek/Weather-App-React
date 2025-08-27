// 📂 src/App.jsx (Updated & Improved Version)

import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";

const getBackgroundClass = (weather) => {
  if (!weather) return 'bg-default';
  const condition = weather.weather[0].main;
  switch (condition) {
    case 'Clear': return 'bg-clear';
    case 'Clouds': return 'bg-clouds';
    case 'Rain': case 'Drizzle': return 'bg-rain';
    case 'Thunderstorm': return 'bg-thunderstorm';
    case 'Snow': return 'bg-snow';
    case 'Atmosphere': return 'bg-atmosphere';
    default: return 'bg-default';
  }
};

// A simple loading spinner component
const Loader = () => (
  <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
);

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  // This single function now handles all data fetching
  const getWeatherData = async (locationQuery) => {
    setLoading(true);
    setError(null);
    setWeather(null);
    setForecast(null);

    try {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?${locationQuery}&appid=${API_KEY}&units=metric`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?${locationQuery}&appid=${API_KEY}&units=metric`;
      
      // Fetch both APIs in parallel for better performance
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(weatherUrl),
        fetch(forecastUrl)
      ]);

      if (!weatherResponse.ok || !forecastResponse.ok) {
        throw new Error("City not found. Please try again.");
      }

      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();
      
      setWeather(weatherData);
      setForecast(forecastData);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (city) => {
    getWeatherData(`q=${city}`);
  };

  const handleGeolocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeatherData(`lat=${latitude}&lon=${longitude}`);
        },
        (err) => {
          setError("Unable to retrieve your location. Please enable location services.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };
  
  // On initial load, try to geolocate, otherwise default to Kanpur
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeatherData(`lat=${latitude}&lon=${longitude}`);
        },
        () => { // Handle user denying permission on startup
          getWeatherData(`q=Kanpur`);
        }
      );
    } else {
      getWeatherData(`q=Kanpur`);
    }
  }, []);

  const backgroundClass = getBackgroundClass(weather);

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen text-white p-4 transition-all duration-500 ${backgroundClass}`}>
      <SearchBar onSearch={handleSearch} onGeolocate={handleGeolocate} />
      
      <div className="mt-6 w-full max-w-4xl flex flex-col items-center justify-center flex-grow">
        {loading && <Loader />}
        {error && <p className="text-xl bg-red-500/50 p-4 rounded-lg">{error}</p>}
        {!loading && !error && weather && (
          <div className="w-full flex flex-col items-center gap-8">
            <CurrentWeather data={weather} />
            <Forecast data={forecast} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;