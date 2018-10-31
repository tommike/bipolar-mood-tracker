import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import PrevNextMonth from '../prev-next-month';

describe('<PrevNextMonth />', () => {
  it('renders without throwing an error', () => {
    const props = {
      showDateRange: '2/2018',
      currentURL: '/reports',
    };

    const wrapper = shallow(<PrevNextMonth {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  it('shows previous link when current month is shown', () => {
    const currentMonth = moment().format('M');
    const currentYear = moment().format('YYYY');
    const currentDate = `${currentMonth}/${currentYear}`;

    const props = {
      showDateRange: currentDate,
      currentURL: '/reports',
    };

    const outer = shallow(<PrevNextMonth {...props} />);
    const Children = outer.props().children;
    const wrapper = shallow(<Children {...props} />);

    expect(wrapper.find('.prev-next-nav__item-prev')).toHaveLength(1);
    expect(wrapper.find('.prev-next-nav__item-next')).toHaveLength(0);
  });

  it('shows both previous and next links when month from the past is shown to user', () => {
    const currentMonth = moment().format('M');
    const currentYear = parseInt(moment().format('YYYY')) - 1;
    const currentDate = `${currentMonth}/${currentYear}`;

    const props = {
      showDateRange: currentDate,
      currentURL: '/reports',
    };

    const outer = shallow(<PrevNextMonth {...props} />);
    const Children = outer.props().children;
    const wrapper = shallow(<Children {...props} />);

    expect(wrapper.find('.prev-next-nav__item-prev')).toHaveLength(1);
    expect(wrapper.find('.prev-next-nav__item-next')).toHaveLength(1);
  });
});
