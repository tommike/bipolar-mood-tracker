import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../footer';

let wrapper;
const createWrapper = () => shallow(<Footer />);

describe('<Footer />', () => {
  beforeEach(() => {
    wrapper = createWrapper();
  });

  it('renders without throwing an error', () => {
    expect(wrapper).toHaveLength(1);
  });
  it('renders date', () => {
    const date = new Date().getFullYear();
    expect(wrapper.find('.footer__copyright').text()).toContain(date);
  });
});
