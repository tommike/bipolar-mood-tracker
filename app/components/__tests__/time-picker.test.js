import React from 'react';
import { shallow, mount } from 'enzyme';
import moment from 'moment';
import TimePicker from '../time-picker';

let wrapper;
const createWrapper = props => mount(<TimePicker {...props} />);
const props = {
  id: 'med-time',
  timePropId: 'time',
  controlFunc: () => {},
  time: '02:03:2018 23:59',
};

describe('<TimePicker />', () => {
  beforeEach(() => {
    wrapper = createWrapper(props);
  });

  it('renders without throwing an error', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('initializes <select> fields correctly', () => {
    expect(wrapper.find('[name="med-time-day"]').props().value).toBe('02');
    expect(wrapper.find('[name="med-time-month"]').props().value).toBe('03');
    expect(wrapper.find('[name="med-time-year"]').props().value).toBe(2018);
    expect(wrapper.find('[name="med-time-hours"]').props().value).toBe(23);
    expect(wrapper.find('[name="med-time-minutes"]').props().value).toBe(59);
  });
});
