import React, { Component } from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import "babel-polyfill";
import fetch from 'isomorphic-fetch';
import { shallow, mount, render } from 'enzyme';
import App from '../App';
import forecast from '../../utils/dummy-forecast';
import weather from '../../utils/dummy-weather';

configure({ adapter: new Adapter() });

let shallowWrapper;
let mountWrapper;

beforeEach(() => {
  shallowWrapper = shallow(<App />);
  mountWrapper = mount(<App />);
});

describe('<App />', () => {
  it('renders <App /> component', () => {
    expect(shallowWrapper).toMatchSnapshot();
    const input = shallowWrapper.find('input');
    const buttons = shallowWrapper.find('button');
    expect(input.length).toBe(1);
    expect(buttons.length).toBe(2);
  });

  it('temp buttons toggle on click', () => {
    let tempButton = shallowWrapper.find('button[name="tempButton"]');
    expect(tempButton.text()).toEqual(`°${shallowWrapper.state().unit}`);

    const instance = shallowWrapper.instance();
    const getWeather = jest.spyOn(instance, 'getTodaysWeather');
    const getForecast = jest.spyOn(instance, 'getForecast');
    shallowWrapper.setState({ city: 'London' });

    instance.forceUpdate();

    tempButton.simulate('click');
    
    tempButton = shallowWrapper.find('button[name="tempButton"]');
    expect(tempButton.text()).toEqual(`°F`);
    expect(getWeather).toHaveBeenCalled();
    expect(getForecast).toHaveBeenCalled();
  });

  it('Go button triggers handleClick function', () => {
    const instance = shallowWrapper.instance();
    const handle = jest.spyOn(instance, 'handleClick');
    const ApiCall = jest.spyOn(instance, 'getForecast');

    instance.forceUpdate();    

    const goButton = shallowWrapper.find('button[name="goButton"]');
    goButton.simulate('click');
    expect(handle).toHaveBeenCalled();
    expect(ApiCall).toHaveBeenCalled();
  });

  it('Input change updates state', () => {
    const input = shallowWrapper.find('input');
    input.simulate('change', {target: { value: 'london' }});
    expect(shallowWrapper.state().city).toEqual('london');
  });

 it('Mocking forecast call success', () => {
    const getForecast = shallowWrapper.instance().getForecast;
    const fetchSpy = jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        json: () => ( forecast ),
      }));
    
    return getForecast.call(shallowWrapper, 'London')
      .then(() => {
          expect(fetchSpy).toHaveBeenCalledWith('http://api.openweathermap.org/data/2.5/forecast?q=London&appid=f2cec2774f3fcfa5572d11e08827b56f&units=imperial');
          expect(shallowWrapper.state().list.length).toEqual(forecast.list.length);
      });
  });

  it('Mocking forecast call failure', () => {
    const getForecast = shallowWrapper.instance().getForecast;
    const fetchSpy = jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        json: () => ({ cod:'404',message:'city not found' }),
      }));
    
    return getForecast.call(shallowWrapper, 'London')
      .then(() => {
          expect(fetchSpy).toHaveBeenCalledWith('http://api.openweathermap.org/data/2.5/forecast?q=London&appid=f2cec2774f3fcfa5572d11e08827b56f&units=imperial');
          expect(shallowWrapper.state().list.length).toEqual(0);
          expect(shallowWrapper.state().errorMessage).toEqual('city not found');
      });
  });
  
  it('Mocking weather call success', () => {
    const getTodaysWeather = shallowWrapper.instance().getTodaysWeather;
    const fetchSpy = jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        json: () => ( weather ),
      }));
    
    return getTodaysWeather.call(shallowWrapper, 'London', 'C')
      .then(() => {
          expect(fetchSpy).toHaveBeenCalledWith('http://api.openweathermap.org/data/2.5/weather?q=London&appid=f2cec2774f3fcfa5572d11e08827b56f&units=metric');
          expect(shallowWrapper.state().currentWeather.main.temp).toEqual(weather.main.temp);
      });
  });
});