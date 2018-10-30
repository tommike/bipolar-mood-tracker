import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';

const Error404Page = ({ location }) => (
  <article className="layout-grid page not-found">
    <Helmet>
      <title>Page not found</title>
    </Helmet>
    <h1 className="page__title">Page not found</h1>
    <div className="page__copy page__copy--default-txt">
      <p>No match for '{location.pathname}'</p>
    </div>
  </article>
);

Error404Page.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(Error404Page);
