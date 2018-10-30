/* eslint no-shadow: ["error", { "allow": ["props"] }] */

import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { dietOptions } from '../tracker-options.config.js';
import ConnectedDietValuesList from './diet-values-list';
import { Breadcrumbs } from './breadcrumbs';
import CategoryList from './category-list';
import { capitalize } from '../utils/shared';

const DietCategories = props => {
  const { match } = props;

  const dietOptionsToRender = dietOptions.map(
    item => (item.id === 'eating' ? { ...item, search: '?weight=true' } : item)
  );

  return (
    <>
      <Route
        exact
        path={match.path}
        render={() => (
          <>
            <Breadcrumbs />
            <CategoryList list={dietOptionsToRender} {...props} />
          </>
        )}
      />

      <Route
        path={`${match.path}/:categoryID`}
        render={props => {
          const { categoryID } = props.match.params;
          const title = capitalize(categoryID);
          return <ConnectedDietValuesList {...props} title={title} />;
        }}
      />
    </>
  );
};

DietCategories.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default DietCategories;
