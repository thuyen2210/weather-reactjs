import React, { useState, useEffect } from 'react';
import WeatherForecast from './WeatherForecast';
import DateTimeDisplay from './DateTimeDisplay';
import WindDirection from './WindDirection';

import logo from '../img/41217715.jpg'  
import "./WeatherApp.css"

import video from '../videos/bautroi.mp4';
import backgroundImage from '../img/background.jpg';
import nhac from '../videos/nhacthugian.mp3';




function WeatherApp() {
  
  const [location, setLocation] = useState('');
  const [forecastData, setForecastData] = useState(null);
  const [forecastDataHouse, setForecastDataHouse] = useState(null);
  const [forecastDataName, setForecastDataName] = useState(null);

   // Sử dụng state để theo dõi trạng thái nền (video hoặc ảnh)
   const [isVideoBackground, setIsVideoBackground] = useState(true);
   const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  
  const [error, setError] = useState(null);

  // State để lưu trạng thái nhiệt độ (true là °C, false là °F)
  const [isCelsius, setIsCelsius] = useState(true);

  // const [apiData, setApiData] = useState(null);

  const API_KEY = 'c574e296e2dd9308964c9b00542a3c63';

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      if (!location) {
        setError('Please enter a location.');
        
        setForecastData(null);
        setForecastDataHouse(null);
        return;
      }

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric&lang=vi`
      );

      if (forecastResponse.status === 404) {
        setError('Location not found.');
        setForecastData(null);
        setForecastDataHouse(null);
        setForecastDataName(null);
        
      } else {
        const forecastData = await forecastResponse.json();
        
        const filteredForecastData = forecastData.list.filter(
          (item) => item.dt_txt.includes("00:00:00")
        ).slice(0, 5);
        setForecastData(filteredForecastData);
        
        
        // const filteredForecastDataHouse = forecastData.list.filter(
        //   (item1) => item1.dt_txt.includes(moment().format('YYYY-MM-DD'))
        // );
        const filteredForecastDataHouse = forecastData.list.slice(0, 8);
        setForecastDataHouse(filteredForecastDataHouse);
        setError(null);

        

        const filteredForecastDataName = forecastData.city;
        setForecastDataName(filteredForecastDataName);
        setError(null);

      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('An error occurred while fetching weather data.');
    }
  };
  
  const getWeatherSuggestion = (description) => {
    if (description.includes('mưa nhẹ')||description.includes('mưa vừa')) {
      return ' Trời đang mưa, bạn hãy ở nhà.';
    } else if (description.includes('mây đen u ám')) {
      return 'Trời sắp có khả năng mưa, nhớ mang ô, áo mưa đi cùng';
    } else if (description.includes('mây rải rác')) {
      return 'Hôm này trời mát mẻ, thích hợp đi chơi';
    } else if (description.includes('Sun')) {
      return 'Nắng nóng, đội mũ và sử dụng kem chống nắng.';
    } else {
      return '';
    }
  };

  // Hàm chuyển đổi nhiệt độ từ °C sang °F và ngược lại
  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  // Hàm để chuyển đổi giữa video và ảnh
  const toggleBackground = () => {
    setIsVideoBackground(!isVideoBackground);
  };
  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
    const audio = document.getElementById('background-music');
    if (isMusicPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };


  return (
    <div className='weather-app'>
      <div className='weather-app_header'>
        <div className='header__logo'>
          <img className='weather-app_logo' src={logo} alt='logo'></img>
          <div>Weather App</div>
        </div>
        <div className='header_find'>
          <input className='header_input'
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                fetchWeatherData();
              }
            }}
          />
          <button className='header_btn' onClick={fetchWeatherData}><i class="fa-solid fa-magnifying-glass"></i></button>

        </div>
        <div className='header_menu'>
      
          {isVideoBackground ? (
            <video autoPlay loop muted id="background-video">
              <source src={video} type="video/mp4" />
            </video>
          ) : (
            <img id="background-video" src={backgroundImage} alt="Background" />
          )}
          
          <button className="button" onClick={toggleBackground}>
            {isVideoBackground ? <i className="fas fa-image koko"></i>  : <i className="fas fa-video koko"></i> }
          </button>
          <audio id="background-music" loop>
            <source src={nhac} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <button  className="button1" onClick={toggleMusic}>
            {isMusicPlaying ? <i class="fa-solid fa-pause koko"></i> : <i class="fa-solid fa-play koko"></i>}
          </button>

      </div>
        
        
      </div>


      {error && <div className="error1">{error}</div>}
      
      {forecastData && (
      <div className='forecateNow'>
        <div className='forecateNow_name' >
          <div>{forecastDataName.name}, {forecastDataName.country}</div>
          <DateTimeDisplay /> 

        </div>
        {/* <p>Date: {forecastData[0].dt_txt}</p> */}
        <div className='test1' >
          <img className='test1_img' 
                src={`https://openweathermap.org/img/w/${forecastData[0].weather[0].icon}.png`}
                alt={`Weather icon for ${forecastData[0].weather[0].description}`}
          />
          <div>
          {isCelsius
                ? `${forecastData[0].main.temp}°C|`
                : `${(forecastData[0].main.temp * 9) / 5 + 32}°F|`}
                
          
            <button className='btn_chuyen__doi' onClick={toggleTemperatureUnit}>
                {!isCelsius ? '°C' : '°F'}
            </button>
          </div>

        </div>
        <div style={{fontSize:'24px',fontWeight:'bold',marginBottom:'5px'}}>{forecastData[0].weather[0].description}</div>
        <div style={{display:'flex',justifyContent:'center'}}> 
          <div style={{marginRight:'77px'}}>
            <WindDirection deg={forecastData[0].pop} />
            <p>Độ ẩm: {forecastData[0].main.humidity} %</p>
          </div>
          <div>
            <p>Tốc độ gió: {forecastData[0].wind.speed}m/s</p>
            <p>Tỉ lệ mưa: {forecastData[0].wind.speed}</p>  
          </div>
        </div>

        <p>{getWeatherSuggestion(forecastData[0].weather[0].description)}</p>
        
      </div>
      )}

      {forecastDataHouse && (
        <div className="okkk" style={{marginTop:'10px'}}>
          {/* <h2>Dự báo các giờ   </h2> */}
          <div className='oke'>
            {forecastDataHouse.map((forecast1, index) => (
              <div key={index} className='oke1'>
                {/* <p style={{fontSize:'22px'}}>{forecast1.dt_txt.split(' ')[0].split('-').slice(1).join('/')}</p> */}
                <p style={{fontSize:'1.5rem'}}>{forecast1.dt_txt.split(' ')[1].slice(0, -5).replace(':', 'h')}</p>
                <p style={{fontSize:'1rem'}}>{forecast1.main.temp}°C</p>
                {/* <p >{forecast1.weather[0].description}</p> */}
                <img style={{width:'65px'}}
              src={`https://openweathermap.org/img/w/${forecast1.weather[0].icon}.png`}
              alt={`Weather icon for ${forecast1.weather[0].description}`}
              />
                
              </div>
            ))}
          </div>
          
        </div>
        
      )}

  
      {forecastData && (
        <WeatherForecast forecastData={forecastData} />
      )}
      {/* <div className='footer'>
        <h2>
        Design by Thế Thuyên
        </h2>  
        
        <a className='footer_a' href="https://www.facebook.com/profile.php?id=100007362887304"><i class="fa-brands fa-facebook footer_i"></i></a>
      </div> */}
    </div>

  );
}

export default WeatherApp;
