import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { ThemeContext, theme } from '../../theme-context';
import SelfCareNote from '../self-care-note';

const mockStore = configureMockStore([])({});

let wrapper;
const createWrapper = props =>
  mount(
    <MemoryRouter>
      <Provider store={mockStore}>
        <ThemeContext.Provider value={theme}>
          <SelfCareNote {...props} />
        </ThemeContext.Provider>
      </Provider>
    </MemoryRouter>
  );

const mockProps = {
  match: {
    url: '/mood-tracker/self-care/self-care-physical-activity',
    params: {
      optionID: 'self-care-meditation',
    },
  },
};

describe('<SelfCareNote />', () => {
  beforeEach(() => {
    wrapper = createWrapper(mockProps);
  });

  it('renders without throwing an error', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('submit button is disabled if text field is empty', () => {
    expect(wrapper.find('button[type="submit"]').props().disabled).toBe(true);
  });

  it('submit button is enabled if text field is not empty', () => {
    wrapper.find('textarea').simulate('change', { target: { value: 'Lorem ipsum' } });
    expect(wrapper.find('button[type="submit"]').props().disabled).toBe(false);
  });

  // it('shows success message on submit')
  // it('redirects to parent when Add another is clicked')
});
