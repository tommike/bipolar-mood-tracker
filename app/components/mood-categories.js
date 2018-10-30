/* eslint no-shadow: ["error", { "allow": ["props", "title"] }] */

import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { moodOptions } from '../tracker-options.config.js';
import ConnectedMoodValuesList from './mood-values-list';
import { Breadcrumbs } from './breadcrumbs';
import CategoryList from './category-list';
import { capitalize } from '../utils/shared';

const MoodCategories = props => {
  const { match, title } = props;

  return (
    <>
      <Route
        exact
        path={match.path}
        render={() => (
          <>
            <Breadcrumbs />
            <CategoryList list={moodOptions} {...props} title={title} />
          </>
        )}
      />

      <Route
        path={`${match.path}/:categoryID`}
        render={props => {
          const { categoryID } = props.match.params;
          const title = capitalize(categoryID);
          return <ConnectedMoodValuesList {...props} title={title} />;
        }}
      />
    </>
  );
};

MoodCategories.propTypes = {
  title: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default MoodCategories;
