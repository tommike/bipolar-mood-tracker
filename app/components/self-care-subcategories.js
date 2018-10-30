import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { selfCareOptions } from '../tracker-options.config.js';
import ConnectedselfCareNote from './self-care-note';
import { Breadcrumbs } from './breadcrumbs';
import CategoryList from './category-list';

const SelfCareSubcategories = props => {
  const { match } = props;

  return (
    <>
      <Route
        exact
        path={match.path}
        render={() => (
          <>
            <Breadcrumbs />
            <CategoryList list={selfCareOptions} {...props} />
          </>
        )}
      />

      <Route path={`${match.path}/:optionID`} component={ConnectedselfCareNote} />
    </>
  );
};

SelfCareSubcategories.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default SelfCareSubcategories;
