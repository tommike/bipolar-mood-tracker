import React from 'react';
import { shallow } from 'enzyme';
import DefaultLayout from '../default-layout';

let wrapper;
const createWrapper = () =>
  shallow(
    <DefaultLayout>
      <p id="testChild">test</p>
    </DefaultLayout>
  );

describe('<DefaultLayout />', () => {
  beforeEach(() => {
    wrapper = createWrapper();
  });

  it('renders without throwing an error', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('renders child components', () => {
    expect(wrapper.find('#testChild')).toHaveLength(1);
  });
});
