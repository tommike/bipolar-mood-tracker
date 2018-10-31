import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { BreadcrumbsItem, Breadcrumbs } from '../breadcrumbs';
import { ThemeContext, theme } from '../../theme-context';

describe('<Breadcrumbs />', () => {
  it('renders without throwing an error', () => {
    const wrapper = shallow(<Breadcrumbs />);
    expect(wrapper).toHaveLength(1);
  });
});

describe('<BreadcrumbsItem />', () => {
  it('renders without throwing an error', () => {
    const props = {
      match: {
        isExact: false,
        path: '/main-page',
        url: '/main-page',
        params: {
          nextpath: '/subpage',
        },
      },
    };

    const outer = shallow(<BreadcrumbsItem {...props} />);
    const Children = outer.props().children;
    const wrapper = shallow(<Children {...props} />);

    expect(wrapper.find('.breadcrumbs__item').exists()).toBe(true);
  });

  it('renders <span> for current path (isExact:true)', () => {
    const props = {
      match: {
        isExact: true,
        path: '/main-page',
        url: '/main-page',
        params: {
          nextpath: '/subpage',
        },
      },
    };

    const outer = shallow(<BreadcrumbsItem {...props} />);
    const Children = outer.props().children;
    const wrapper = shallow(<Children {...props} />);

    expect(wrapper.find('.breadcrumbs__text')).toHaveLength(1);
  });

  it('renders <Link> for non-exact path (isExact:false)', () => {
    const props = {
      match: {
        isExact: false,
        path: '/main-page',
        url: '/main-page',
        params: {
          nextpath: '/subpage',
        },
      },
    };

    const outer = shallow(<BreadcrumbsItem {...props} />);
    const Children = outer.props().children;
    const wrapper = shallow(<Children {...props} />);

    expect(wrapper.find('.breadcrumbs__anchor')).toHaveLength(1);
  });

  it('renders current path and next path in sub-route', () => {
    const props = {
      match: {
        isExact: false,
        path: '/main-page',
        url: '/main-page',
        params: {
          nextpath: '/subpage',
        },
      },
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={['/main-page/subpage']}>
        <ThemeContext.Provider value={theme}>
          <BreadcrumbsItem {...props} />
        </ThemeContext.Provider>
      </MemoryRouter>
    );
    expect(wrapper.find('.breadcrumbs__item')).toHaveLength(2);
  });

  // it('functional test - renders Breadcrumb and BreadcrumbsItem');
});
