import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { Breadcrumbs } from './breadcrumbs';
import { PasswordForgetForm } from './password-forget-page';
import PasswordChangeForm from './password-change';

const AccountPage = ({ authUser }) => (
  <div className="page page-account">
    <Helmet>
      <title>My Account</title>
    </Helmet>

    <Breadcrumbs />
    <h1 className="page__title">Account: {authUser.email}</h1>

    <PasswordForgetForm />
    <PasswordChangeForm />
  </div>
);

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
});

AccountPage.propTypes = {
  authUser: PropTypes.object,
};

export default connect(mapStateToProps)(AccountPage);
