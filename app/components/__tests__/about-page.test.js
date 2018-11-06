import React from 'react';
import { shallow } from 'enzyme';
import AboutPage from '../about-page';
import { Breadcrumbs } from '../breadcrumbs';

let wrapper;
const createWrapper = () => shallow(<AboutPage />);

describe('<AboutPage />', () => {
  beforeEach(() => {
    wrapper = createWrapper();
  });

  it('renders without throwing an error', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('renders <Breadcrumbs /> component', () => {
    expect(wrapper.find(Breadcrumbs)).toHaveLength(1);
  });
});
