import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faChartArea,
  faInfoCircle,
  faSignOutAlt,
  faTheaterMasks,
  faAngleLeft,
  faAngleRight,
  faCheckCircle,
  faUserCog,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import WebFont from 'webfontloader';
import { ThemeContext, theme } from '../theme-context';

import { routes } from './routes-config';

import { handleInitialData } from '../actions/shared';
import { firebase } from '../../firebase/core';
import * as authAPI from '../../firebase/auth-api';

import DefaultLayout from './default-layout';
import Error404Page from './error-404-page';

WebFont.load({
  google: {
    families: ['Lato:400,400i,700,700i', 'sans-serif'],
  },
});

library.add(
  faChartArea,
  faInfoCircle,
  faSignOutAlt,
  faTheaterMasks,
  faAngleLeft,
  faAngleRight,
  faCheckCircle,
  faHome,
  faUserCog
);

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    firebase.auth().onAuthStateChanged(userData => {
      if (userData && userData.emailVerified) {
        dispatch({ type: 'AUTH_USER_SET', authUser: userData });
        dispatch(handleInitialData());
      } else {
        dispatch({ type: 'AUTH_USER_SET', undefined });
      }
    });
  }

  render() {
    const { dataLoading, authUser } = this.props;
    if (dataLoading === true && (authUser || localStorage.getItem('MoodAppFirebase'))) {
      return <h3 className="app-loading">Loading</h3>;
    }

    return (
      <ThemeContext.Provider value={theme}>
        <Router>
          <Switch>
            {routes.map(
              ({ layout: Layout, component: ComponentToRender, path, exact, isPrivate }) => (
                <Route
                  path={path}
                  key={path}
                  exact={exact}
                  render={props =>
                    isPrivate && !authUser && !localStorage.getItem('MoodAppFirebase') ? (
                      <Redirect
                        to={{
                          pathname: '/',
                          state: { from: props.location },
                        }}
                      />
                    ) : (
                      <Layout>
                        <ComponentToRender {...props} />
                      </Layout>
                    )
                  }
                />
              )
            )}

            <Route
              path="/logout"
              render={props => {
                authAPI.doSignOut(() => props.history.push('/'));
                return null;
              }}
            />

            <Route
              render={() => (
                <DefaultLayout>
                  <Error404Page />
                </DefaultLayout>
              )}
            />
          </Switch>
        </Router>
      </ThemeContext.Provider>
    );
  }
}

App.propTypes = {
  dataLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  dataLoading: state.dataLoading,
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(App);
