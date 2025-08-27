import React from "react";
import { motion } from "framer-motion";

const WeatherAlerts = ({ alerts }) => {
  if (!alerts || alerts.length === 0) return null;

  return (
    <motion.div
      className="max-w-3xl mx-auto mt-6 p-6 rounded-2xl shadow-lg 
                 bg-red-500/10 backdrop-blur-lg border border-red-500/30 text-red-200"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-xl font-semibold mb-4 text-center">Weather Alerts</h2>
      {alerts.map((alert, index) => (
        <div
          key={index}
          className="mb-3 p-3 rounded-lg bg-red-500/20 border border-red-400/40"
        >
          <p className="font-bold">{alert.event}</p>
          <p className="text-sm">{alert.description}</p>
        </div>
      ))}
    </motion.div>
  );
};

export default WeatherAlerts;
