import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Header from '../header';

const mockStore = configureMockStore([])({});

describe('<Header />', () => {
  it('renders without throwing an error', () => {
    const wrapper = shallow(
      <Provider store={mockStore}>
        <Header />
      </Provider>
    );
    expect(wrapper).toHaveLength(1);
  });

  // it('should render <TimeToInterveneWarningConnected /> for logged in user when mood level in critical zone');
});
