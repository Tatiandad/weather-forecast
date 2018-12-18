import React from 'react';
import Day from './Day/Day';
import CurrentWeather from './CurrentWeather/CurrentWeather'

const Api_Key = 'f2cec2774f3fcfa5572d11e08827b56f';

class App extends React.Component {
  state = {
    city: '',
    country: '',
    list: [],
    errorMessage: '',
    unit: 'C',
    currentWeather: {}
  }

  async getForecast(city, unit='F') {
    const tempUnit = unit === 'F' ? 'imperial' : 'metric';
    try {
      const api_call = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${Api_Key}&units=${tempUnit}`);
      const response = await api_call.json()
      if (response.cod === '200') {
        this.setState({ 
          list: response.list,
          country: response.city.country,
          city: response.city.name
        });
      } else {
        this.setState({ 
          errorMessage: response.message,
          city: '',
          country: '',
          list: [],
          unit: 'C',
          currentWeather: {}
        });
      }
    } catch(err) {
      console.log(err);
    }
  }

  async getTodaysWeather(city, unit='F') {
    const tempUnit = unit === 'F' ? 'imperial' : 'metric';
    try {
      const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_Key}&units=${tempUnit}`);
      const response = await api_call.json()
      if (response.cod === 200) {
        this.setState({
          currentWeather: {
            main: response.main,
            weather: response.weather,
            wind: response.wind
          }
        });
      } else {
        this.setState({ 
          errorMessage: response.message,
          city: '',
          country: '',
          list: [],
          unit: 'C',
          currentWeather: {}
        });
      }
    } catch(err) {
      console.log(err);
    }
  }

  processData = () => {
    const days = new Map();
    this.state.list.forEach((item) => {
      const day = this.getDate(item.dt_txt);
      if( !days[day] ) days[day] = []
      days[day].push(item)
    });
    return days;
  }

  getDate = (dateString) => {
    const regex = /([0-9]{4}-[0-9]{2}-[0-9]{2})/;
    return dateString.match(regex)[0];
  }

  handlechange = (e) => {
    this.setState({ 
      city: e.target.value,
      errorMessage: '',
      list: [],
      unit: 'C',
      currentWeather: {}
    });
  }

  handleClick = () => {
    this.getTodaysWeather(this.state.city);
    this.getForecast(this.state.city);
  }

  toggleUnit = () => {
    const unit = this.state.unit === 'F' ? 'C' : 'F';
    this.setState({ unit });
    this.getTodaysWeather(this.state.city, this.state.unit);
    this.getForecast(this.state.city, this.state.unit)
  }

  render () {
    const days = this.processData();
    const unit = this.state.unit === 'F' ? 'C' : 'F';
    return (
      <div className='container'>
        <div className='container-controls'>
          <input type='text' value={this.state.city} onChange={this.handlechange} />
          <button name='goButton' onClick={this.handleClick}>Go</button>
          <button name='tempButton' onClick={this.toggleUnit}>&deg;{this.state.unit}</button>
        </div>
        {this.state.currentWeather.weather &&
          <div>
            <CurrentWeather 
              city={this.state.city}
              country={this.state.country}
              currentWeather={this.state.currentWeather}
              unit={unit}
            />
          </div>
        }
        { this.state.list.length > 0 && 
          <div className='forecast-container'>
            {Object.keys(days).map((day, idx) => {
              return (
                <Day 
                  key={`${day}-${idx}`} 
                  data={days[day]} 
                  date={this.getDate(days[day][0].dt_txt)} 
                  unit={unit}
                />)
            })}
          </div>
        }
        { this.state.errorMessage && 
          <div>
            {this.state.errorMessage}
          </div>
        }
      </div>
    )
  }
}

export default App;