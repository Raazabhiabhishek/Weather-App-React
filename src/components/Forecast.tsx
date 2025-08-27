// 📂 src/components/Forecast.tsx

import { motion } from "framer-motion";

// Define the structure of the data we expect
interface ForecastData {
  list: {
    dt_txt: string;
    weather: {
      description: string;
      icon: string;
    }[];
    main: {
      temp: number;
    };
  }[];
}

interface Props {
  data: ForecastData;
}

export default function Forecast({ data }: Props) {
  // Safety check: if there's no data or list, render nothing.
  if (!data || !data.list || data.list.length === 0) {
    return null;
  }

  // Filter the list to get one forecast per day (every 8th item = 24 hours)
  const dailyForecasts = data.list.filter((_, index) => index % 8 === 0);

  return (
    <motion.div
      className="mt-8 w-full max-w-4xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">5-Day Forecast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {dailyForecasts.map((day, idx) => (
          <div
            key={idx}
            className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 shadow-lg text-center hover:scale-105 transition"
          >
            <p className="font-semibold">
              {new Date(day.dt_txt).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
              className="mx-auto w-16 h-16"
            />
            <p className="text-xl font-bold">{Math.round(day.main.temp)}°C</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}