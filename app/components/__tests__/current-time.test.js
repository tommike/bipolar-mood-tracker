import React from 'react';
import { shallow } from 'enzyme';
import CurrentTime from '../current-time';

jest.mock('moment', () => () => ({
  format: args => {
    if (args === 'MMM Do YYYY') {
      return 'Oct 8th 2018';
    }
    return '2018-10-08T17:27:08+02:00';
  },
}));

let wrapper;
const createWrapper = () => shallow(<CurrentTime />);

describe('<CurrentTime />', () => {
  beforeEach(() => {
    wrapper = createWrapper();
  });

  it('renders without throwing an error', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correct dateTime and displayTime to HTML', () => {
    expect(wrapper.find('time').props().dateTime).toBe('2018-10-08T17:27:08+02:00');
    expect(wrapper.find('time').text()).toBe('Oct 8th 2018');
  });

  // it('calls handleVisibilityChange when visibilitychange event is triggered') {
});
