/* eslint no-shadow: ["error", { "allow": ["props"] }] */

import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import ConnectedMoodReports from './mood-reports';
import ConnectedSleepReports from './sleep-reports';
import ConnectedSelfCareReports from './self-care-reports';
import ConnectedDietReports from './diet-reports';
import ConnectedMedicamentsReports from './medicaments-reports';
import CategoryList from './category-list';
import { Breadcrumbs } from './breadcrumbs';

const ReportsPage = props => {
  const { match } = props;

  const subroutes = [
    {
      id: 'mood',
      label: 'Mood',
      path: '/mood',
      component: ConnectedMoodReports,
    },
    {
      id: 'sleep',
      label: 'Sleep',
      path: '/sleep',
      component: ConnectedSleepReports,
    },
    {
      id: 'medicaments',
      label: 'Medicaments',
      path: '/medicaments',
      component: ConnectedMedicamentsReports,
    },
    {
      id: 'self-care',
      label: 'Self-care',
      path: '/self-care',
      component: ConnectedSelfCareReports,
    },
    {
      id: 'diet',
      label: 'Diet',
      path: '/diet',
      component: ConnectedDietReports,
    },
  ];

  return (
    <div className="page reports">
      <Route
        exact
        path={match.path}
        render={() => (
          <>
            <Breadcrumbs />
            <CategoryList list={subroutes} {...props} title="Reports" />
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

ReportsPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default ReportsPage;
