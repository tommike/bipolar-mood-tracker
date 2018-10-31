import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import MoodTrackerPage from '../mood-tracker-page';
import { ThemeContext, theme } from '../../theme-context';

describe('<MoodTrackerPage />', () => {
  it('renders without throwing an error', () => {
    const props = {
      match: {
        path: '/mood-tracker',
      },
    };

    const wrapper = mount(
      <MemoryRouter>
        <MoodTrackerPage {...props} />
      </MemoryRouter>
    );
    expect(wrapper).toHaveLength(1);
  });

  it('renders five dashboard <Link/>s at mood-tracking landing page', () => {
    const props = {
      match: {
        path: '/mood-tracker',
      },
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={[props.match.path]}>
        <ThemeContext.Provider value={theme}>
          <MoodTrackerPage {...props} />
        </ThemeContext.Provider>
      </MemoryRouter>
    );
    expect(wrapper.find('.category-list__item')).toHaveLength(5);
  });

  // it(renders sub-route layout when sub-route is accessed)
});
