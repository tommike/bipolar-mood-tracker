import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Breadcrumbs } from './breadcrumbs';
import SignUpForm from './sign-up-form';

const SignUpPage = () => (
  <div className="page page-sign-UP">
    <Helmet>
      <title>Sign up</title>
    </Helmet>

    <Breadcrumbs />
    <h1 className="page__title">Sign up</h1>
    <SignUpForm />
  </div>
);

export const SignUpLink = () => (
  <p className="sign-up-link">
    <Link to="/sign-up">Don't have an account? Sign Up</Link>
  </p>
);

export default SignUpPage;
