/* eslint react/destructuring-assignment : 0 */
import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SignUpLink } from './sign-up-page';
import { PasswordForgetLink } from './password-forget-page';
import SignInForm from './sign-in-form';

class LoginPage extends React.Component {
  render() {
    const { from } = this.props.location.state || {
      from: { pathname: '/dashboard' },
    };

    const { authUser, history } = this.props;

    if (authUser) {
      return <Redirect to={from} />;
    }

    return (
      <div className="page page-login">
        <Helmet>
          <title>Bipolar Mood Tracker</title>
        </Helmet>
        <h1 className="page__title">Welcome to Bipolar Mood Tracker</h1>
        <p>
          Track your daily mood, sleep patterns, medications, self-care and diet related to Bipolar
          1 and 2 plus Depression and anxiety.
        </p>
        <SignInForm history={history} />
        <PasswordForgetLink />
        <SignUpLink />
      </div>
    );
  }
}

LoginPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object,
  }),
  authUser: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(withRouter(LoginPage));
