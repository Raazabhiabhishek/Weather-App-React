import React from "react";
import { motion } from "framer-motion";

const Rain = ({ chance }) => {
  if (chance === undefined) return null;

  return (
    <motion.div
      className="max-w-md mx-auto mt-6 p-6 rounded-2xl shadow-lg 
                 bg-blue-500/10 backdrop-blur-lg border border-blue-400/20 text-blue-200"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-xl font-semibold text-center">Rain Probability</h2>
      <p className="text-3xl font-bold text-center mt-2">{chance}%</p>
    </motion.div>
  );
};

export default Rain;
