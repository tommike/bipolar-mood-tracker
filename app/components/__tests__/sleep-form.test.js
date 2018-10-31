import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import SleepForm from '../sleep-form';

const mockStore = configureMockStore([])({});

let wrapper;
const createWrapper = () =>
  mount(
    <Provider store={mockStore}>
      <SleepForm />
    </Provider>
  );

describe('<SleepForm />', () => {
  beforeEach(() => {
    wrapper = createWrapper();
  });

  it('renders without throwing an error', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('submit button is disabled if date is not selected', () => {
    expect(wrapper.find('button[type="submit"]').props().disabled).toBe(true);
  });

  it('submit button is enabled if bedtime and wakeup are selected', () => {
    wrapper.find('[id="bed-time-day"]').simulate('change', { target: { value: '02' } });
    wrapper.find('[id="bed-time-month"]').simulate('change', { target: { value: '03' } });
    wrapper.find('[id="bed-time-year"]').simulate('change', { target: { value: 2018 } });
    wrapper.find('[id="bed-time-hours"]').simulate('change', { target: { value: 23 } });
    wrapper.find('[id="bed-time-minutes"]').simulate('change', { target: { value: 59 } });

    wrapper.find('[id="wake-up-day"]').simulate('change', { target: { value: '02' } });
    wrapper.find('[id="wake-up-month"]').simulate('change', { target: { value: '03' } });
    wrapper.find('[id="wake-up-year"]').simulate('change', { target: { value: 2018 } });
    wrapper.find('[id="wake-up-hours"]').simulate('change', { target: { value: 23 } });
    wrapper.find('[id="wake-up-minutes"]').simulate('change', { target: { value: 59 } });

    expect(wrapper.find('button[type="submit"]').props().disabled).toBe(false);
  });

  // it('shows success message on submit')
  // it('shows error message if bedtime > wakeup')
});
