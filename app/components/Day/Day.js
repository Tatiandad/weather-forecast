import React, { Component } from 'react';
import Moment from 'moment';
import Collapsible from 'react-collapsible';
import ClassNames from 'classnames';

const icon = require('../../images/white-arrow-transparent-png-22.png');
const windIcon = require('../../images/compass.png');

class Day extends Component {
  state = {
    open: false
  }

  degToCompass = (num) => {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
  }

  toggleHeader = () => {
    this.setState({ open: !this.state.open });
  }

  hourlyForecast = () => {
    const windUnit = this.props.unit === 'F' ? 'mph' : 'm/sec';
    const rows = this.props.data.map((set) => {
      const { wind, dt, dt_txt, weather, main  } = set;
      const windDir = this.degToCompass(wind.deg);
      const windIconDir = {transform: `rotate(${Math.round(wind.deg)}deg)`};
      return (
        <div key={`day-${dt}`} className='forecast-hourly-container'>
          <p>
            {Moment(dt_txt).format('HH:mm')}
          </p>
          <p>
            <img 
              className='forecast-hourly-icon' 
              src={`https://openweathermap.org/img/w/${weather[0].icon}.png`} 
              alt={weather[0].description}
            />
          </p>
          <p className='forecast-hourly-desc'>
            {weather[0].description}
          </p>
          <p>
            {Math.round(main.temp_min)}&deg;{this.props.unit} / {Math.round(main.temp_max)}&deg;{this.props.unit}
          </p>
          <p>
            <img className='forecast-hourly-wind-icon' src={windIcon} alt={windDir} style={windIconDir}/>
            {wind.speed}{windUnit}
          </p>
        </div>
      )
    });
    return (
      <div>
        {rows}
      </div>
    )
  }

  renderDayHeader = () => {
    const currentWeather = this.props.data[0];
    let date = Moment(this.props.date).format("dddd Do MMMM");
    if ( Moment(new Date()).format("dddd Do MMMM") === date) {
      date = 'Today'
    }
    
    return (
      <div className='forecast-hourly-header'>
        <p>
          <span className='forecast-hourly-date'>
            {date}
          </span>
          <img 
            className={ClassNames('forecast-hourly-icon', { 'hide': this.state.open })}
            src={`https://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`} 
            alt={currentWeather.weather[0].description}
          />
          <span className={ClassNames('forecast-hourly-temp', { 'hide': this.state.open })}>
            {Math.round(currentWeather.main.temp)}&deg;{this.props.unit}
          </span>
        </p>
        <img className='icon' src={icon} alt='trigger-icon'/>
      </div>
    )
  }

  render () {
    return (
      <div className='forecast-day'>
        <Collapsible 
          trigger={this.renderDayHeader()}
          triggerTagName='div'
          triggerStyle={{ backgroundColor: '#1b2d3a', color: '#ffffff', cursor: 'pointer' }}
          onOpen={this.toggleHeader}
          onClose={this.toggleHeader}
        >
          {this.hourlyForecast()}
        </Collapsible>
      </div>
    )
  }
}

export default Day;