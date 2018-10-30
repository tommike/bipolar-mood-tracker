import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Breadcrumbs } from './breadcrumbs';
import { validateEmail } from '../utils/shared';

import * as authAPI from '../../firebase/auth-api';

const PasswordForgetPage = () => (
  <div className="page page-password-forget">
    <Helmet>
      <title>Password Forget</title>
    </Helmet>

    <Breadcrumbs />
    <h1 className="page__title">Password Forget</h1>

    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
  success: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

    this.onSubmit = this.onSubmit.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const { email } = this.state;

    authAPI
      .doPasswordReset(email)

      .then(() => {
        this.setState(() => ({
          ...INITIAL_STATE,
          success: {
            message: 'An email has been sent to provided email address with further instructions.',
          },
        }));
      })
      .catch(error => {
        this.setState(() => ({ error }));
      });
  }

  handleChange(key) {
    return function(event) {
      const fieldValue = event.target.value;

      this.setState(() => ({
        [key]: fieldValue,
      }));
    }.bind(this);
  }

  isDisabled() {
    const { email } = this.state;
    return email === '' || !validateEmail(email);
  }

  render() {
    const { email, error, success } = this.state;

    return (
      <>
        {error && (
          <div className="form-feedback form-feedback--error">
            <p className="form-feedback__text">{error.message}.</p>
          </div>
        )}

        {success && (
          <div className="form-feedback form-feedback--success">
            <p className="form-feedback__text">{success.message}</p>
          </div>
        )}

        <form onSubmit={this.onSubmit} className="form">
          <div className="form__field">
            <label htmlFor="password-forget-email" className="form__label">
              Email
            </label>
            <input
              value={email}
              onChange={this.handleChange('email')}
              type="text"
              name="password-forget-email"
              id="password-forget-email"
              className="form__input form__text"
            />
          </div>

          <div className="form__field">
            <button disabled={this.isDisabled()} type="submit" className="form__input form__submit">
              Reset My Password
            </button>
          </div>
        </form>
      </>
    );
  }
}

const PasswordForgetLink = () => (
  <p className="password-forget-link">
    <Link to="/password-forget">Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink };
