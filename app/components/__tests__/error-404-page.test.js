import React from 'react';
import { shallow } from 'enzyme';
import Error404Page from '../error-404-page';

describe('<Error404Page />', () => {
  it('renders without throwing an error', () => {
    const props = {
      location: { pathname: '/test-path' },
    };

    const wrapper = shallow(<Error404Page.WrappedComponent {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
