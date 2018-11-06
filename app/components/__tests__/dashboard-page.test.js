import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import Dashboard from '../dashboard-page';
import { ThemeContext, theme } from '../../theme-context';

describe('<Dashboard />', () => {
  it('renders without throwing an error', () => {
    const wrapper = mount(
      <MemoryRouter>
        <ThemeContext.Provider value={theme}>
          <Dashboard />
        </ThemeContext.Provider>
      </MemoryRouter>
    );
    expect(wrapper).toHaveLength(1);
  });
});
