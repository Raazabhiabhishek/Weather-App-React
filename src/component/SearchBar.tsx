import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X, Clock } from 'lucide-react';
import { searchLocation, SearchResult } from '../services/weatherService';

interface SearchBarProps {
  onSelectLocation: (location: SearchResult) => void;
}

export function SearchBar({ onSelectLocation }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches));
      } catch (error) {
        console.error('Failed to parse recent searches', error);
      }
    }
  }, []);

  // Save recent searches to localStorage when they change
  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle search input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 2) {
      setIsSearching(true);
      setShowDropdown(true);
      
      const delaySearch = setTimeout(() => {
        searchLocation(value)
          .then(data => {
            setResults(data);
            setIsSearching(false);
          })
          .catch(error => {
            console.error('Search error:', error);
            setIsSearching(false);
          });
      }, 500);
      
      return () => clearTimeout(delaySearch);
    } else {
      setResults([]);
      setIsSearching(false);
    }
  };

  // Handle location selection
  const handleSelectLocation = (location: SearchResult) => {
    onSelectLocation(location);
    setQuery(`${location.name}, ${location.country}`);
    setShowDropdown(false);
    
    // Add to recent searches if not already there
    if (!recentSearches.some(item => 
      item.lat === location.lat && item.lon === location.lon
    )) {
      const updatedSearches = [location, ...recentSearches].slice(0, 5);
      setRecentSearches(updatedSearches);
    }
  };

  // Handle using current location
  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: SearchResult = {
            name: 'Current Location',
            country: '',
            lat: position.coords.latitude,
            lon: position.coords.longitude
          };
          onSelectLocation(location);
          setQuery('Current Location');
          setShowDropdown(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert('Unable to retrieve your location. Please try searching manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  // Focus input when search bar is clicked
  const handleSearchBarClick = () => {
    setShowDropdown(true);
  };

  return (
    <div 
      ref={searchRef}
      className="relative w-full max-w-md mx-auto"
    >
      <div 
        className="flex items-center bg-white bg-opacity-20 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-white border-opacity-20 transition-all duration-300 focus-within:bg-opacity-30 focus-within:shadow-xl"
        onClick={handleSearchBarClick}
      >
        <Search className="h-5 w-5 text-white mr-2" />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a city..."
          className="w-full bg-transparent border-none focus:outline-none text-white placeholder-white placeholder-opacity-70"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
            }}
            className="ml-2"
          >
            <X className="h-4 w-4 text-white opacity-70 hover:opacity-100" />
          </button>
        )}
      </div>

      {/* Dropdown for search results and recent searches */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-xl border border-white border-opacity-20 max-h-80 overflow-y-auto z-10">
          {/* Current location option */}
          <div
            className="flex items-center px-4 py-3 hover:bg-black hover:bg-opacity-5 cursor-pointer transition-colors duration-200"
            onClick={handleUseCurrentLocation}
          >
            <MapPin className="h-5 w-5 text-blue-500 mr-3" />
            <span className="text-gray-800">Use current location</span>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Search results */}
          {isSearching ? (
            <div className="flex justify-center items-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            results.length > 0 && (
              <div>
                <div className="px-4 py-2 text-xs font-semibold text-gray-500">SEARCH RESULTS</div>
                {results.map((result, index) => (
                  <div
                    key={`${result.lat}-${result.lon}-${index}`}
                    className="flex items-center px-4 py-3 hover:bg-black hover:bg-opacity-5 cursor-pointer transition-colors duration-200"
                    onClick={() => handleSelectLocation(result)}
                  >
                    <Search className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-800">{result.name}, {result.country}</span>
                  </div>
                ))}
              </div>
            )
          )}

          {/* Recent searches */}
          {recentSearches.length > 0 && (
            <div>
              <div className="flex justify-between items-center px-4 py-2">
                <span className="text-xs font-semibold text-gray-500">RECENT SEARCHES</span>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-blue-500 hover:text-blue-700"
                >
                  Clear
                </button>
              </div>
              {recentSearches.map((search, index) => (
                <div
                  key={`recent-${search.lat}-${search.lon}-${index}`}
                  className="flex items-center px-4 py-3 hover:bg-black hover:bg-opacity-5 cursor-pointer transition-colors duration-200"
                  onClick={() => handleSelectLocation(search)}
                >
                  <Clock className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-800">{search.name}, {search.country}</span>
                </div>
              ))}
            </div>
          )}

          {/* No results message */}
          {query.length > 2 && !isSearching && results.length === 0 && (
            <div className="px-4 py-3 text-gray-600 text-center">
              No locations found. Try a different search.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
