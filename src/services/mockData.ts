import { WeatherData } from '../types/weather';

export const mockWeatherData: WeatherData = {
  location: {
    name: 'New Delhi',
    country: 'IN',
    lat: 28.6139,
    lon: 77.2090,
  },
  current: {
    temp: 32,
    feels_like: 34,
    humidity: 65,
    wind_speed: 3.5,
    weather: {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d',
    },
    dt: Math.floor(Date.now() / 1000),
    sunrise: Math.floor(Date.now() / 1000) - 21600, // Adjusted for IST
    sunset: Math.floor(Date.now() / 1000) + 21600,  // Adjusted for IST
    uvi: 8.5,
    visibility: 8000,
    pressure: 1008,
  },
  forecast: [
    {
      dt: Math.floor(Date.now() / 1000) + 86400,
      sunrise: Math.floor(Date.now() / 1000) + 86400 - 21600,
      sunset: Math.floor(Date.now() / 1000) + 86400 + 21600,
      temp: {
        day: 33,
        min: 26,
        max: 35,
        night: 27,
        eve: 31,
        morn: 26,
      },
      feels_like: {
        day: 35,
        night: 28,
        eve: 33,
        morn: 27,
      },
      pressure: 1007,
      humidity: 60,
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        }
      ],
      wind_speed: 3.2,
      pop: 0,
    },
    {
      dt: Math.floor(Date.now() / 1000) + 172800,
      sunrise: Math.floor(Date.now() / 1000) + 172800 - 21600,
      sunset: Math.floor(Date.now() / 1000) + 172800 + 21600,
      temp: {
        day: 34,
        min: 27,
        max: 36,
        night: 28,
        eve: 32,
        morn: 27,
      },
      feels_like: {
        day: 36,
        night: 29,
        eve: 34,
        morn: 28,
      },
      pressure: 1006,
      humidity: 55,
      weather: [
        {
          id: 801,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '02d',
        }
      ],
      wind_speed: 4.0,
      pop: 0.2,
    },
    {
      dt: Math.floor(Date.now() / 1000) + 259200,
      sunrise: Math.floor(Date.now() / 1000) + 259200 - 21600,
      sunset: Math.floor(Date.now() / 1000) + 259200 + 21600,
      temp: {
        day: 31,
        min: 25,
        max: 33,
        night: 26,
        eve: 30,
        morn: 25,
      },
      feels_like: {
        day: 34,
        night: 27,
        eve: 32,
        morn: 26,
      },
      pressure: 1005,
      humidity: 70,
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d',
        }
      ],
      wind_speed: 4.5,
      pop: 0.6,
    },
    {
      dt: Math.floor(Date.now() / 1000) + 345600,
      sunrise: Math.floor(Date.now() / 1000) + 345600 - 21600,
      sunset: Math.floor(Date.now() / 1000) + 345600 + 21600,
      temp: {
        day: 30,
        min: 24,
        max: 32,
        night: 25,
        eve: 29,
        morn: 24,
      },
      feels_like: {
        day: 33,
        night: 26,
        eve: 31,
        morn: 25,
      },
      pressure: 1004,
      humidity: 75,
      weather: [
        {
          id: 501,
          main: 'Rain',
          description: 'moderate rain',
          icon: '10d',
        }
      ],
      wind_speed: 5.0,
      pop: 0.8,
    },
    {
      dt: Math.floor(Date.now() / 1000) + 432000,
      sunrise: Math.floor(Date.now() / 1000) + 432000 - 21600,
      sunset: Math.floor(Date.now() / 1000) + 432000 + 21600,
      temp: {
        day: 32,
        min: 26,
        max: 34,
        night: 27,
        eve: 31,
        morn: 26,
      },
      feels_like: {
        day: 35,
        night: 28,
        eve: 33,
        morn: 27,
      },
      pressure: 1006,
      humidity: 65,
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03d',
        }
      ],
      wind_speed: 3.8,
      pop: 0.3,
    }
  ],
  alerts: [
    {
      sender_name: 'IMD Delhi',
      event: 'Heat Wave Warning',
      start: Math.floor(Date.now() / 1000),
      end: Math.floor(Date.now() / 1000) + 86400,
      description: 'Heat wave conditions likely in parts of Delhi NCR. Take necessary precautions.',
    }
  ]
};
