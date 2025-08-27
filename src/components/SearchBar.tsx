// 📂 src/components/SearchBar.tsx

import { useState } from "react";
import { motion } from "framer-motion";

// We add a new prop, 'onGeolocate', to handle the button click
interface SearchBarProps {
  onSearch: (city: string) => void;
  onGeolocate: () => void;
}

const SearchBar = ({ onSearch, onGeolocate }: SearchBarProps) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity("");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex items-center justify-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city..."
        className="px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 outline-none border border-white/20"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:scale-105 transform transition"
      >
        Search
      </button>

      {/* This is the new button for geolocation */}
      <button
        type="button" // Use type="button" to prevent form submission
        onClick={onGeolocate}
        className="px-3 py-2 rounded-lg bg-white/20 text-white font-semibold hover:scale-105 transform transition"
        title="Use my current location"
      >
        📍
      </button>
    </motion.form>
  );
};

export default SearchBar;