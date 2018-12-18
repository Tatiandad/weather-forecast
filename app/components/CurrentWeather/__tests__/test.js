import React, { Component } from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import "babel-polyfill";
import { shallow } from 'enzyme';
import CurrentWeather from '../CurrentWeather';
import weather from '../../../utils/dummy-weather';

configure({ adapter: new Adapter() });

const dummyProps = {
  city: 'London',
  country: 'GB',
  unit: 'F',
  currentWeather: {
    main: weather.main,
    weather: weather.weather,
    wind: weather.wind
  }
};

let shallowWrapper;

beforeEach(() => {
  shallowWrapper = shallow(<CurrentWeather {...dummyProps}/>);
});

describe('<CurrentWeather />', () => {
  it('renders <CurrentWeather /> component', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });

  it('renders elements of <Day /> correctly', () => {
    const wrapperDiv = shallowWrapper.find('.today-container');
    const header = shallowWrapper.find('.today-weather p');
    expect(wrapperDiv.length).toBe(1);
    expect(header.text()).toEqual(dummyProps.currentWeather.weather[0].description);
  });
});