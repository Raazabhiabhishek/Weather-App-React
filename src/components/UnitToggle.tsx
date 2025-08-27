import React from "react";
import { motion } from "framer-motion";

const UnitToggle = ({ unit, onToggle }) => {
  return (
    <motion.div
      className="flex justify-center mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <button
        onClick={onToggle}
        className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-lg 
                   border border-white/20 text-white font-medium 
                   hover:scale-105 transform transition"
      >
        Switch to {unit === "metric" ? "°F" : "°C"}
      </button>
    </motion.div>
  );
};

export default UnitToggle;
