import React from 'react';

import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import WeightForm from '../weight-form';
import * as diet from '../../actions/diet';

let wrapper;
const middlewares = [thunk];
const initialState = {};
const mockStore = configureMockStore(middlewares)(initialState);

const weight = 100;

jest.mock('../../utils/api');

const createWrapper = () =>
  mount(
    <Provider store={mockStore}>
      <WeightForm />
    </Provider>
  );

describe('<WeightForm />', () => {
  beforeEach(() => {
    wrapper = createWrapper();
  });

  it('renders without throwing an error', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('submit button is disabled if text field is empty', () => {
    expect(wrapper.find('button[type="submit"]').props().disabled).toBe(true);
  });

  it('submit button is enabled if text field is not empty', () => {
    wrapper.find('input[name="weight-form"]').simulate('change', { target: { value: weight } });
    expect(wrapper.find('button[type="submit"]').props().disabled).toBe(false);
  });

  it('dispatch is called after form submit', async () => {
    const spy = jest.spyOn(mockStore, 'dispatch');
    wrapper = shallow(<WeightForm store={mockStore} />).dive();

    wrapper.find('input[name="weight-form"]').simulate('change', { target: { value: weight } });

    await wrapper.find('form').simulate('submit', { preventDefault: () => {} });

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('handleAddWeight is called with (kg, callback)', async () => {
    const spy = jest.spyOn(diet, 'handleAddWeight');
    wrapper = shallow(<WeightForm store={mockStore} />).dive();

    wrapper.find('input[name="weight-form"]').simulate('change', { target: { value: weight } });

    await wrapper.find('form').simulate('submit', { preventDefault: () => {} });

    expect(spy).toBeCalledWith(weight, wrapper.instance().afterSubmit);
  });

  it('shows thank you message', async () => {
    wrapper = shallow(<WeightForm store={mockStore} />).dive();

    wrapper.find('input[name="weight-form"]').simulate('change', { target: { value: weight } });
    await wrapper.find('form').simulate('submit', { preventDefault: () => {} });

    expect(wrapper.find('.form-feedback--success').exists()).toBe(true);
  });
});
