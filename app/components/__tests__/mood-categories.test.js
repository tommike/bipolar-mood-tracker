import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router';
import MoodCategories from '../mood-categories';

describe('<MoodCategories />', () => {
  it('renders without throwing an error', () => {
    const props = {
      match: {
        path: '/mood-tracker/mood',
      },
    };

    const wrapper = shallow(
      <MemoryRouter initialEntries={['/mood-tracker/mood']}>
        <MoodCategories {...props} />
      </MemoryRouter>
    );
    expect(wrapper).toHaveLength(1);
  });

  // it('renders subroute')
});
