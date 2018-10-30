import React from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Footer from './footer';

const DefaultLayout = props => (
  <>
    <Header />
    {props.children}
    <Footer />
  </>
);

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DefaultLayout;
