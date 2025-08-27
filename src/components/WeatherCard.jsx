import React from "react";
import { motion } from "framer-motion";

function WeatherCard({ weather }) {
  if (!weather) {
    return (
      <div className="backdrop-blur-md bg-white/20 border border-white/30 shadow-lg rounded-2xl p-6 text-white text-center">
        <p className="text-lg">Loading weather...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="backdrop-blur-md bg-white/20 border border-white/30 shadow-lg rounded-2xl p-6 text-white text-center"
    >
      <h2 className="text-3xl font-bold">{weather.city}</h2>
      <p className="text-lg mt-2">{weather.condition}</p>
      <p className="text-5xl font-extrabold mt-4">{weather.temp}°C</p>
      <div className="flex justify-between mt-6 text-sm opacity-90">
        <span>💧 {weather.humidity}% Humidity</span>
        <span>🌬️ {weather.wind} km/h Wind</span>
      </div>
    </motion.div>
  );
}

export default WeatherCard;
