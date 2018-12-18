import React, { Component } from 'react';

class CurrentWeather extends Component {
  render () {
    const { city, country, currentWeather } = this.props;

    return (
      <div className='today-container'>
        <h2>{`Current weather in ${city}, ${country}`}</h2>
        <div className='today-weather'>
          <h3>
            <img 
              src={`https://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`} 
              alt={currentWeather.weather[0].description}
            />
            {Math.round(currentWeather.main.temp)}&deg;{this.props.unit}
          </h3>
          <p>{currentWeather.weather[0].description}</p>
        </div>
      </div>
    )
  }
}

export default CurrentWeather;