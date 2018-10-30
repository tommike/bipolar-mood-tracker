import React, { Component } from 'react';

import * as authAPI from '../../firebase/auth-api';
import { validateEmail } from '../utils/shared';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
  success: null,
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

    this.onSubmit = this.onSubmit.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const { email, passwordOne } = this.state;

    authAPI
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(() => {
        authAPI.doSignOut(); // user is by default logged in after registration; log user out until he verifies email

        this.setState(() => ({
          ...INITIAL_STATE,
          success: {
            message:
              'Before you can login, you must active your account with the code sent to your email address. If you did not receive this email, please check your junk/spam folder.',
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
    const { username, email, passwordOne, passwordTwo } = this.state;
    return (
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      username === '' ||
      email === '' ||
      !validateEmail(email)
    );
  }

  render() {
    const { username, email, passwordOne, passwordTwo, error, success } = this.state;

    return (
      <>
        {error && (
          <div className="form-feedback form-feedback--error">
            <p className="form-feedback__text">{error.message}</p>
          </div>
        )}

        {success && (
          <div className="form-feedback form-feedback--success">
            <p className="form-feedback__text">{success.message}</p>
          </div>
        )}

        <form onSubmit={this.onSubmit} className="form">
          <div className="form__field">
            <label htmlFor="sign-up-name" className="form__label">
              Full name
            </label>
            <input
              value={username}
              onChange={this.handleChange('username')}
              type="text"
              name="sign-up-name"
              id="sign-up-name"
              className="form__input form__text"
            />
          </div>

          <div className="form__field">
            <label htmlFor="sign-in-email" className="form__label">
              E-mail
            </label>
            <input
              value={email}
              onChange={this.handleChange('email')}
              type="text"
              name="sign-up-email"
              id="sign-up-email"
              className="form__input form__text"
            />
          </div>

          <div className="form__field">
            <label htmlFor="sign-in-password-one" className="form__label">
              Password
            </label>
            <input
              value={passwordOne}
              onChange={this.handleChange('passwordOne')}
              type="password"
              name="sign-up-password"
              id="sign-up-password"
              className="form__input form__text"
            />
          </div>

          <div className="form__field">
            <label htmlFor="sign-in-password-confirm" className="form__label">
              Confirm password
            </label>
            <input
              value={passwordTwo}
              onChange={this.handleChange('passwordTwo')}
              type="password"
              name="sign-up-password-confirm"
              id="sign-up-password-confirm"
              className="form__input form__text"
            />
          </div>

          <div className="form__field">
            <button disabled={this.isDisabled()} type="submit" className="form__input form__submit">
              Sign Up
            </button>
          </div>
        </form>
      </>
    );
  }
}

export default SignUpForm;
