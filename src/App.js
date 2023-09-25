import React from 'react';
import './App.css';
import WeatherApp from './conponents/WeatherApp';


function App() {


  return (
    <div className="App">
      
      <WeatherApp />
      <div className='footer'>
        <h2>
        Design by Thế Thuyên
        </h2>  
        
        <a className='footer_a' href="https://www.facebook.com/profile.php?id=100007362887304"><i class="fa-brands fa-facebook footer_i"></i></a>
      </div>
    </div>
  );
}

export default App;

