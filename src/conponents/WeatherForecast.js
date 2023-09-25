
import React from 'react';
import './WeatherForecast.css';
import moment from 'moment';

// Hàm ánh xạ thứ từ tiếng Anh sang tiếng Việt
function mapDayOfWeek(dayOfWeek) {
  const daysOfWeekMap = {
    Monday: 'Thứ Hai',
    Tuesday: 'Thứ Ba',
    Wednesday: 'Thứ Tư',
    Thursday: 'Thứ Năm',
    Friday: 'Thứ Sáu',
    Saturday: 'Thứ Bảy',
    Sunday: 'Chủ Nhật',
  };

  return daysOfWeekMap[dayOfWeek] || dayOfWeek;
}

function WeatherForecast({ forecastData }) {
  return (
    <div className='du_bao'>
      {/* <h2>Dự Báo Thời Tiết 5 Ngày</h2> */}
      <div className="forecast">
        {forecastData.map((forecast, index) => (
          
          <div key={index} className="forecast-item">
            {/* Áp dụng hàm ánh xạ cho thứ */}
            <div> {mapDayOfWeek(moment(forecast.dt_txt).format('dddd'))}</div>
            
            <img className='forecast_img'
              src={`https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
              alt={`Biểu tượng thời tiết cho ${forecast.weather[0].description}`}
            />
            <div className='forecast_temp'>{forecast.main.temp}°C</div>
            {/* <p>{forecast.weather[0].description}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherForecast;
