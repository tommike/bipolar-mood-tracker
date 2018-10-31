import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import Nav from '../nav';

describe('<Nav />', () => {
  it('renders without throwing an error', () => {
    const wrapper = shallow(<Nav.WrappedComponent />);
    expect(wrapper).toHaveLength(1);
  });

  it('is collapsed by default', () => {
    const wrapper = shallow(<Nav.WrappedComponent />);
    expect(wrapper.find('.header-nav').hasClass('mobile-menu-collapsed')).toBe(true);
  });

  it('expands when hamburger icon is clicked', () => {
    const wrapper = shallow(<Nav.WrappedComponent />);
    wrapper.find('button').simulate('click');
    expect(wrapper.find('.header-nav').hasClass('mobile-menu-expanded')).toBe(true);
  });

  it('collapses when any <Link> is clicked', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <Nav.WrappedComponent />
      </MemoryRouter>
    );
    wrapper.find('button').simulate('click'); // show dropdown
    wrapper.find('a[href*="about"]').simulate('click');
    expect(wrapper.find('.header-nav').hasClass('mobile-menu-collapsed')).toBe(true);
  });
});
