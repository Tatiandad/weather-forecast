import React, { Component } from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import "babel-polyfill";
import { shallow, mount } from 'enzyme';
import Day from '../Day';
import forecast from '../../../utils/dummy-forecast';

configure({ adapter: new Adapter() });

let shallowWrapper;
let mountWrapper;

const dummyProps = {
  data: [forecast.list[0]],
  date: '2018-12-17',
  unit: 'F'
};

beforeEach(() => {
  shallowWrapper = shallow(<Day {...dummyProps}/>);
  mountWrapper = mount(<Day {...dummyProps}/>);
});

describe('<Day />', () => {
  it('renders <Day /> component', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });

  it('renders elements of <Day /> correctly', () => {
    const wrapperDiv = shallowWrapper.find('.forecast-day');
    const collapsible = shallowWrapper.find('Collapsible');
    const weatherIcon = shallowWrapper.find('.forecast-hourly-icon');
    const weatherDesc = shallowWrapper.find('.forecast-hourly-desc').at(0);
    expect(wrapperDiv.length).toBe(1);
    expect(collapsible.length).toBe(1);
    expect(weatherIcon.prop('alt')).toEqual(dummyProps.data[0].weather[0].description);
    expect(weatherDesc.text()).toEqual(dummyProps.data[0].weather[0].description);
  });

  it('toggles collapsible', () => {
    let collapsible = mountWrapper.find('.Collapsible__trigger').at(0);
    expect(collapsible.prop('className')).toEqual('Collapsible__trigger is-closed');
    collapsible.simulate('click');
    mountWrapper.update();
    collapsible = mountWrapper.find('.Collapsible__trigger').at(0);
    expect(collapsible.prop('className')).toEqual('Collapsible__trigger is-open');
  });
});