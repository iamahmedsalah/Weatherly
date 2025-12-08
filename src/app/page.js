'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { showIn } from '../../variants';
import { FcSearch } from "react-icons/fc";
import { MdMyLocation } from "react-icons/md";
import ParticlesContainer from '../components/ParticlesContainer';





const Home = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForecast, setShowForecast] = useState(false);
  const [particleConfig, setParticleConfig] = useState('default');

  // Update particle configuration based on weather
  useEffect(() => {
    if (weatherData) {
      const condition = weatherData.current.condition.text.toLowerCase();
      
      if (condition.includes('rain') || condition.includes('drizzle')) {
        setParticleConfig('rain');
      } else if (condition.includes('snow')) {
        setParticleConfig('snow');
      } else if (condition.includes('clear') || condition.includes('sunny')) {
        setParticleConfig('sunny');
      } else if (condition.includes('cloud')) {
        setParticleConfig('cloudy');
      } else {
        setParticleConfig('default');
      }
    }
  }, [weatherData]);

  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!location) return;

    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.weatherApiKey}&aqi=yes&days=3&q=${location}`);
      const data = await res.json();

      if (data.error) {
        setError(data.error.message);
      } else {
        setWeatherData(data);
      }
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.weatherApiKey}&aqi=yes&days=3&q=${lat},${lon}`);
      const data = await res.json();

      if (data.error) {
        setError(data.error.message);
      } else {
        setWeatherData(data);
        setLocation(data.location.name);
      }
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          setError('Location access denied. Please enable location services.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  // Helper to get AQI description
  const getAqiDescription = (epaIndex) => {
    const descriptions = {
      1: 'Good',
      2: 'Moderate',
      3: 'Sensitive Groups',
      4: 'Unhealthy',
      5: 'Very Unhealthy',
      6: 'Hazardous'
    };
    return descriptions[epaIndex] || 'Unknown';
  };

  return (
    <div className='flex flex-col items-center justify-center  px-4 py-8'>
      <ParticlesContainer weatherCondition={particleConfig}/>
      
      <motion.div 
        className='relative w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-[30px] overflow-hidden p-4 sm:p-6'
        variants={showIn(0.2)}
        initial='hidden'
        animate='show'
      >
        {/* Search Bar */}
        <form onSubmit={fetchWeather} className='mb-4 sm:mb-6'>
          <div className='flex items-center gap-2'>
            <input 
              type="text" 
              placeholder="Enter city name..." 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className='flex-1 rounded-full bg-white/20 border-none outline-none py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base text-black placeholder-black/50 focus:ring-2 focus:ring-white/50 transition-all text-center'
            />
          </div>
          
          {/* Action Buttons */}
          <div className='flex items-center gap-2 mt-2 sm:mt-3'>
            <button 
              type="submit"
              disabled={loading}
              className='flex-1 bg-white/20 hover:bg-white/60 rounded-full p-2.5 sm:p-3 transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 sm:gap-2'
              title="Search"
            >
              {loading ? (
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <FcSearch size={18} className="sm:hidden" />
                  <FcSearch size={20} className="hidden sm:block" />
                  <span className='text-black text-xs sm:text-sm font-medium'>Search</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleCurrentLocation}
              className='flex-1 bg-white/20 hover:bg-white/60 rounded-full p-2.5 sm:p-3 transition-all flex items-center justify-center gap-1.5 sm:gap-2'
              title="Use current location"
            >
              <MdMyLocation size={18} className="text-blue-500 sm:hidden" />
              <MdMyLocation size={20} className="text-blue-500 hidden sm:block" />
              <span className='text-black text-xs sm:text-sm font-medium'>Location</span>
            </button>
          </div>
        </form>

        {/* Content */}
        <AnimatePresence mode='wait'>
          {error && (
            <motion.div 
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className='flex flex-col items-center justify-center py-10'
            >
              <img src="/images/no-results.png" alt="error" width={64} height={64} className="mb-2" />
              <p className='text-black text-center font-medium'>{error}</p>
            </motion.div>
          )}

          {!weatherData && !error && !loading && (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='flex flex-col items-center justify-center py-10 text-black/60'
            >
              <img src="/images/location-pointer.png" alt="location" width={64} height={64} className="mb-2" />
              <p>Search for a city to see the weather</p>
            </motion.div>
          )}

          {weatherData && !showForecast && (
            <motion.div
              key="weather"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className='text-black cursor-pointer'
              onClick={() => setShowForecast(true)}
              title="Click to see 3-day forecast"
            >
              {/* Location & Date */}
              <div className='text-center mb-4 sm:mb-6'>
                <h2 className='text-2xl sm:text-3xl font-bold'>{weatherData.location.name}</h2>
                <p className='text-xs sm:text-sm opacity-80'>{weatherData.location.region}, {weatherData.location.country}</p>
                <p className='text-xs opacity-60 mt-1'>{weatherData.location.localtime}</p>
              </div>

              {/* Main Weather */}
              <div className='flex flex-col items-center mb-6 sm:mb-8'>
                <div className='flex items-center justify-center gap-2 sm:gap-4'>
                  <Image 
                    src={`https:${weatherData.current.condition.icon}`} 
                    alt={weatherData.current.condition.text} 
                    width={64} 
                    height={64} 
                    className="drop-shadow-lg sm:w-20 sm:h-20"
                  />
                  <div className='text-center'>
                    <p className='text-5xl sm:text-6xl font-bold'>{weatherData.current.temp_c}°</p>
                    <p className='text-base sm:text-lg font-medium opacity-90'>{weatherData.current.condition.text}</p>
                  </div>
                </div>
                <p className='mt-2 text-xs sm:text-sm opacity-80'>Feels like {weatherData.current.feelslike_c}°</p>
              </div>

              {/* Stats Grid */}
              <div className='grid grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6 text-center'>
                <div className='flex flex-col items-center'>
                  <img src="/images/wind-icon.png" alt="wind" width={24} height={24} className="sm:w-[30px] sm:h-[30px]" />
                  <p className='text-[10px] sm:text-xs mt-1 opacity-70'>Wind</p>
                  <p className='font-bold text-xs sm:text-sm'>{weatherData.current.wind_kph} km/h</p>
                </div>
                <div className='flex flex-col items-center'>
                  <img src="/images/gust-icon.png" alt="gust" width={24} height={24} className="sm:w-[30px] sm:h-[30px]" />
                  <p className='text-[10px] sm:text-xs mt-1 opacity-70'>Gust</p>
                  <p className='font-bold text-xs sm:text-sm'>{weatherData.current.gust_kph} km/h</p>
                </div>
                <div className='flex flex-col items-center'>
                  <img src="/images/water-icon.png" alt="humidity" width={24} height={24} className="sm:w-[30px] sm:h-[30px]" />
                  <p className='text-[10px] sm:text-xs mt-1 opacity-70'>Humidity</p>
                  <p className='font-bold text-xs sm:text-sm'>{weatherData.current.humidity}%</p>
                </div>
                <div className='flex flex-col items-center'>
                  <img src="/images/fog-icon.png" alt="visibility" width={24} height={24} className="sm:w-[30px] sm:h-[30px]" />
                  <p className='text-[10px] sm:text-xs mt-1 opacity-70'>Visibility</p>
                  <p className='font-bold text-xs sm:text-sm'>{weatherData.current.vis_km} km</p>
                </div>
              </div>

            </motion.div>
          )}

          {/* 3-Day Forecast Toggle */}
          {weatherData && showForecast && (
            <motion.div
              key='forecast'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='cursor-pointer'
              onClick={() => setShowForecast(false)}
              title="Click to toggle back to weather"
            >
              <h3 className='text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 text-center'>3-Day Forecast</h3>
              <div className='space-y-2 sm:space-y-3'>
                {weatherData.forecast.forecastday.map((day, index) => (
                  <div key={day.date} className='flex items-center justify-between bg-white/10 rounded-2xl p-3 sm:p-4'>
                    <div>
                      <p className='text-xs sm:text-sm font-bold text-black'>
                        {index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}
                      </p>
                      <p className='text-xs text-black/60'>{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                      <p className='text-xs text-black/70 mt-1'>{day.day.condition.text}</p>
                    </div>
                    <div className='flex items-center gap-3'>
                      <Image src={`https:${day.day.condition.icon}`} alt="icon" width={48} height={48} />
                      <div className='text-right'>
                        <p className='text-2xl font-bold text-black'>{Math.round(day.day.avgtemp_c)}°</p>
                        <p className='text-xs text-black/60'>{Math.round(day.day.mintemp_c)}° / {Math.round(day.day.maxtemp_c)}°</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Home;
