// 📂 src/components/CurrentWeather.jsx

import { motion } from "framer-motion";

export default function CurrentWeather({ data }) {
  if (!data) return null;

  return (
    <motion.div
      className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-lg text-center w-full max-w-sm"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold">{data.name}</h2>
      <p className="text-xl capitalize mt-1">{data.weather[0].description}</p>
      <p className="text-6xl font-extrabold my-4">{Math.round(data.main.temp)}°C</p>
      <div className="flex justify-around text-lg">
        <span>💧 {data.main.humidity}% Humidity</span>
        <span>💨 {data.wind.speed} km/h Wind</span>
      </div>
    </motion.div>
  );
}