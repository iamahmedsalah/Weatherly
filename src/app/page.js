'use client';

import Image from 'next/image';

// Framer motion
import { motion } from 'framer-motion';
//useState useEffect
import { useState, useEffect } from 'react';
// Variants
import { showIn } from '../../variants';
// React icons
import { FcSearch } from "react-icons/fc";





const Home = () => {

  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState('');

  const API_URL = 'https://api.weatherapi.com/v1/forecast.json?key=' + process.env.weatherApiKey + '&aqi=yes&days=3&q=' + location

  // const [isVisible, setIsVisible] = useState(false);;

  // const handleClick = e => {
  //   // 👇️ toggle shown state
  //   setIsVisible(current => !current);
  // };


  const fetchWeather = async () => {



    if (location) {
      try {
        const res = await fetch(API_URL)
        const data = await res.json()
        if (data) {
          // console.log(data)
          // Weather Data
          const apiData = {
            country: data.location.country,
            region: data.location.region,
            city: data.location.name,
            time: data.location.localtime,
            feellikeC: data.current.feelslike_c,
            tempC: data.current.temp_c,
            windKph: data.current.wind_kph,
            visibilityKm: data.current.vis_km,
            gust: data.current.gust_kph,
            humidity: data.current.humidity,
            condition: data.current.condition.text,
            img: data.current.condition.icon,
          }
          // Air Quality Index
          const aqi = data.current.air_quality
          const aqiData = Object.values(aqi)
          const epa = aqiData[6]
          let epaAqi = ''
          switch (epa) {
            case 1:
              if (epa === 1) {
                epaAqi = 'Good'
                // console.log('Good')
              }
              break;
            case 2:
              if (epa === 2) {
                epaAqi = 'Moderate'
                // console.log('Moderate')
              }
              break;
            case 3:
              if (epa === 3) {
                epaAqi = 'Sensitive Groups'
                // console.log('Sensitive Groups')
              }
              break;
            case 4:
              if (epa === 4) {
                epaAqi = 'Unhealthy'
                // console.log('Unhealthy')
              }
              break;
            case 5:
              if (epa === 5) {
                epaAqi = 'Very Unhealthy'
                // console.log('Very Unhealthy')
              }
              break;
            case 6:
              if (epa === 6) {
                epaAqi = 'Hazardous'
                // console.log('Hazardous')
              }
              break;
            default:
              break;
          }
          // console.log(aqiData)
          setWeather(<>
            <motion.div className='rounded-[31px] mt-10 mx-5 transition-all duration-150'
              variants={showIn(0.2)}
              initial='hidden'
              animate='show'
              exit='hidden'>
              <div className='flex flex-col items-center shadow-xl h-[300px] w-[300px] 
            bg-[#29a1c6]/10 rounded-[29px] outline outline-offset-2 outline-[#29a1c6]/10'>
                <div className='flex flex-col items-center justify-center pt-3 '>
                  <div className='flex flex-col items-center mb-5 font-bold'>
                    <p className='text-[20px] space'>{apiData.city}</p>
                    <small> {apiData.region} / {apiData.country}  </small>
                  </div>
                  <div className='mb-3 flex flex-row '>
                    <img className='' src={apiData.img} alt="weatherImg" width={64} height={64} />
                    <div className='flex flex-col items-center'>
                      <p className='font-bold text-[30px] text-black/70 ms-10'>{apiData.tempC}° </p>
                      <p className='ms-4 text-center'>{apiData.condition}</p>
                    </div>
                  </div>
                  <div>
                    <p className='text-center'> feels like: {apiData.feellikeC}° </p>
                    <div className='flex flex-row items-center justify-center mb-3'>
                      <img className='px-2' src="/images/aqi.png" alt="AQI"  />
                      <p className='text-center'> AQI: {epaAqi} </p>
                    </div>
                    <div className='grid grid-cols-4 gap-7 text-center items-center justify-center'>
                      <div className='grid grid-col justify-center'>
                        <img src="/images/wind-icon.png" alt="windicon" />
                        {apiData.windKph} <small> Km/h</small>
                      </div>
                      <div className='grid grid-col justify-center'>
                        <img src="/images/gust-icon.png" alt="gusticon" />
                        {apiData.gust}<small>Km/h</small>
                      </div>
                      <div className='grid grid-col justify-center'>
                        <img src="/images/water-icon.png" alt="humidityicon" />
                        {apiData.humidity} <small>%</small>
                      </div>
                      <div className='grid grid-col justify-center'>
                        <img src="/images/fog-icon.png" alt="humidityicon" />
                        {apiData.visibilityKm} <small>km/h</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>)
        }
      } catch (err) {
        console.log(err)
        const res = await fetch(API_URL)
        const msg = await res.json()
        if (msg.error.code === 1006) {
          const errMsg = msg.error.message
          // console.log(errMsg)
          setWeather(<>
            <motion.div className='flex flex-col items-center justify-center mt-[80px] transition-all duration-150'
              variants={showIn(0.2)}
              initial='hidden'
              animate='show'
              exit='hidden'>
              <div className='flex flex-col items-center justify-center'>
                <p className='text-center text-[20px] font-bold'>{errMsg}</p>
                <img className='mt-5' src="/images/no-results.png" alt="no result" width={64} height={64} />
              </div>
            </motion.div>
          </>)
        }
      }
    } else {
      setWeather(<>
        <motion.div className='flex flex-col items-center justify-center mt-[80px] transition-all duration-150'
          variants={showIn(0.2)}
          initial='hidden'
          animate='show'
          exit='hidden'>
          <div className='flex flex-col items-center justify-center'>
            <p className='text-center text-[20px] font-bold'>Please enter a city name.</p>
            <img className='mt-5' src="/images/location-pointer.png" alt="empty" width={64} height={64} />
          </div>
        </motion.div>
      </>)
    }
  }


  const fetchForecast = async () => {

    if (location) {
      try {
        const res = await fetch(API_URL)
        const data = await res.json()
        if (data) {
          // console.log(data)
          // Weather Data
          const apiData = {
            country: data.location.country,
            region: data.location.region,
            city: data.location.name,
            tempC: data.current.temp_c,
            condition: data.current.condition.text,
            img: data.current.condition.icon,
          }
          // Air Quality Index
          // const aqi = data.current.air_quality
          // const aqiData = Object.values(aqi)
          // const epa = aqiData[6]
          // let epaAqi = ''
          // switch (epa) {
          //   case 1:
          //     if (epa === 1) {
          //       epaAqi = 'Good'
          //       // console.log('Good')
          //     }
          //     break;
          //   case 2:
          //     if (epa === 2) {
          //       epaAqi = 'Moderate'
          //       // console.log('Moderate')
          //     }
          //     break;
          //   case 3:
          //     if (epa === 3) {
          //       epaAqi = 'Sensitive Groups'
          //       // console.log('Sensitive Groups')
          //     }
          //     break;
          //   case 4:
          //     if (epa === 4) {
          //       epaAqi = 'Unhealthy'
          //       // console.log('Unhealthy')
          //     }
          //     break;
          //   case 5:
          //     if (epa === 5) {
          //       epaAqi = 'Very Unhealthy'
          //       // console.log('Very Unhealthy')
          //     }
          //     break;
          //   case 6:
          //     if (epa === 6) {
          //       epaAqi = 'Hazardous'
          //       // console.log('Hazardous')
          //     }
          //     break;
          //   default:
          //     break;
          // }
          // console.log(aqiData)

          // 3 Days Forecast
          // Change date format
          const forecast = data.forecast.forecastday.map((day) => ({
            date: day.date,
          }))
          for (let i = 0; i < forecast.length; i++) {
            let ele = forecast[i];
            forecast[0].date = 'Today'
            forecast[1].date = 'Tomorrow'
            forecast[2].date = 'After'
            // console.log(ele)
          }
          // 3 Days Forecast
          const day1 = {
            tempC: data.forecast.forecastday[0].day.avgtemp_c,
            moon: data.forecast.forecastday[0].astro.moon_phase,
            img: data.forecast.forecastday[0].day.condition.icon,
          }
          const day2 = {
            tempC: data.forecast.forecastday[1].day.avgtemp_c,
            condition: data.forecast.forecastday[1].day.condition.text,
            img: data.forecast.forecastday[1].day.condition.icon,
          }
          const day3 = {
            tempC: data.forecast.forecastday[2].day.avgtemp_c,
            condition: data.forecast.forecastday[2].day.condition.text,
            img: data.forecast.forecastday[2].day.condition.icon,
          }
          // Moon Phase
          setWeather(<>
            <motion.div className='rounded-[31px] mt-10 mx-5 transition-all duration-150'
              variants={showIn(0.2)}
              initial='hidden'
              animate='show'
              exit='hidden'>
              <motion.div className='flex flex-col items-center shadow-xl h-[300px] w-[310px] 
            bg-[#29a1c6]/10 rounded-[29px] outline outline-offset-2 outline-[#29a1c6]/10'
                variants={showIn(0.3)}
                initial='hidden'
                animate='show'
                exit='hidden'>
                <div className='flex flex-col items-center justify-center pt-3 '>
                  <div className='flex flex-col items-center mb-5 font-bold'>
                    <p className='text-[20px] space'>{apiData.city}</p>
                    <small> {apiData.region} / {apiData.country}  </small>
                  </div>
                  <div>
                    <div className='mb-3 flex flex-row justify-center'>
                      <img className='' src={apiData.img} alt="weatherImg" width={64} height={64} />
                      <div className='flex flex-col items-center'>
                        <p className='font-bold text-[30px] text-black/70 ms-10'>{apiData.tempC}° </p>
                        <p className='ms-4 text-center'>{apiData.condition}</p>
                      </div>
                    </div>
                    <div className='grid grid-cols-3 gap-5 items-center justify-center text-center'>
                      <div className='grid flex-row rounded-xl px-1 items-center justify-center bg-[#29a1c6]/10 shadow-xl outline  outline-[#29a1c6]/10'>
                        <p className='font-medium py-1'>
                          {forecast[0].date}
                        </p>
                        <img className='ms-1 py-1 mb-2' src={day1.img} alt="today" width={42} />
                        <small className='font-bold pb-2'>{day1.tempC}°</small>
                      </div>
                      <div className='grid flex-row rounded-xl px-1 items-center justify-center bg-[#29a1c6]/10 shadow-xl outline  outline-[#29a1c6]/10'>
                        <p className='font-medium py-1' >
                          {forecast[1].date}
                        </p>
                        <img className='ms-1 py-1 mb-2' src={day2.img} alt="today" width={42} />
                        <small className='font-bold pb-2'>{day2.tempC}°</small>
                      </div>
                      <div className='grid flex-row rounded-xl  px-1 items-center justify-center bg-[#29a1c6]/10 shadow-xl outline  outline-[#29a1c6]/10'>
                        <p className='font-medium py-1'>
                          {forecast[2].date}
                        </p>
                        <img className='ms-1 py-1 mb-2' src={day3.img} alt="today" width={42} />
                        <small className='font-bold pb-2'>{day3.tempC}°</small>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>)
        }
      } catch (err) {
        console.log(err)
        const res = await fetch(API_URL)
        const msg = await res.json()
        if (msg.error.code === 1006) {
          const errMsg = msg.error.message
          // console.log(errMsg)
          setWeather(<>
            <motion.div className='flex flex-col items-center justify-center mt-[80px] transition-all duration-150'
              variants={showIn(0.2)}
              initial='hidden'
              animate='show'
              exit='hidden'>
              <div className='flex flex-col items-center justify-center'>
                <p className='text-center text-[20px] font-bold'>{errMsg}</p>
                <img className='mt-5' src="/images/no-results.png" alt="no result" width={64} height={64} />
              </div>
            </motion.div>
          </>)
        }
      }
    } else {
      setWeather(<>
        <motion.div className='flex flex-col items-center justify-center mt-[80px] transition-all duration-150'
          variants={showIn(0.2)}
          initial='hidden'
          animate='show'
          exit='hidden'>
          <div className='flex flex-col items-center justify-center'>
            <p className='text-center text-[20px] font-bold'>Please enter a city name.</p>
            <img className='mt-5' src="/images/location-pointer.png" alt="empty" width={64} height={64} />
          </div>
        </motion.div>
      </>)
    }

  }

  return (
    <div className='flex flex-col items-center justify-center mt-2'>
      <motion.div className='border-solid border-2 rounded-[30px] outline outline-offset-2 outline-[#29a1c6]/10
      border-b-amber-500 border-t-[#29a1c6] border-r-[#008000] border-l-[#7f3f00]'
        variants={showIn(2.4)}
        initial='hidden'
        animate='show'
      >
        <div className="flex flex-col items-center justify-start bg-[#29a1c6]/20 rounded-[25px]
            h-[500px] w-[350px] lg:w-[440px] md:w-[430px] sm:w-[420px] transition-all duration-150">
          <motion.img className='mb-3 mt-3' src="/season.png" alt="seasonImg" width={64} height={64}
            variants={showIn(2.8)}
            initial='hidden'
            animate='show' />
          <div className='flex flex-row'>
            <motion.input type="text" placeholder="Enter your city name" id='location'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className='rounded-xl bg-[#29a1c6]/10 shadow-xl py-2 px-3 focus:px-7 
              transition-all duration-150 outline outline-offset-2 outline-[#29a1c6]/10 text-center'
              variants={showIn(3.2)}
              initial='hidden'
              animate='show' />
            <motion.button className='ms-7 rounded-xl bg-[#29a1c6]/10 shadow-xl py-1 px-1 
                outline outline-offset-2 outline-[#29a1c6]/10' id='search'
              onClick={fetchWeather}
              variants={showIn(3.6)}
              initial='hidden'
              animate='show'>
              <FcSearch size={30} />
            </motion.button>
            <motion.button
              onClick={fetchForecast}
              className='ms-7 rounded-xl bg-[#29a1c6]/10 shadow-xl py-1 px-1 
                outline outline-offset-2 outline-[#29a1c6]/10'
              variants={showIn(4)}
              initial='hidden'
              animate='show'>
              <img src="/images/meteorology.png" alt="more info" width={30} />
            </motion.button>
          </div>
          {weather}
        </div>
      </motion.div>
    </div>
  )
};

export default Home;
