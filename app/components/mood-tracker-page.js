/* eslint no-shadow: ["error", { "allow": ["props"] }] */

import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import MoodCategories from './mood-categories';
import ConnectedSleepValuesList from './sleep-values-list';
import SelfCareSubcategories from './self-care-subcategories';
import DietCategories from './diet-categories';
import ConnectedMedicaments from './medicaments';
import CategoryList from './category-list';
import { Breadcrumbs } from './breadcrumbs';

const subroutes = [
  {
    id: 'mood',
    label: 'Mood',
    path: '/mood',
    component: MoodCategories,
  },
  {
    id: 'sleep',
    label: 'Sleep',
    path: '/sleep',
    component: ConnectedSleepValuesList,
  },
  {
    id: 'medicaments',
    label: 'Medicaments',
    path: '/medicaments',
    component: ConnectedMedicaments,
  },
  {
    id: 'self-care',
    label: 'Self-care',
    path: '/self-care',
    component: SelfCareSubcategories,
  },
  {
    id: 'diet',
    label: 'Diet',
    path: '/diet',
    component: DietCategories,
  },
];

const MoodTrackerPage = props => {
  const { match } = props;

  return (
    <div className="page mood-tracker">
      <Route
        exact
        path={match.path}
        render={() => (
          <>
            <Breadcrumbs />
            <CategoryList list={subroutes} {...props} title="Mood tracker" />
          </>
        )}
      />

      {subroutes.map(({ path, component: Component, label }) => (
        <Route
          path={`${match.path}${path}`}
          key={path}
          render={props => <Component {...props} title={label} />}
        />
      ))}
    </div>
  );
};

MoodTrackerPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default MoodTrackerPage;
