import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as authAPI from '../../firebase/auth-api';
import { validateEmail } from '../utils/shared';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.onSubmit = this.onSubmit.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onSubmit(event) {
    const { email, password } = this.state;
    const { history } = this.props;

    authAPI
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));

        history.push('/dashboard');
      })
      .catch(error => {
        this.setState(() => ({
          error,
        }));
      });

    event.preventDefault();
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
    const { email, password } = this.state;
    return password === '' || email === '' || !validateEmail(email);
  }

  render() {
    const { email, password, error } = this.state;

    return (
      <>
        {error && (
          <div className="form-feedback form-feedback--error">
            <p className="form-feedback__text">{error.message}</p>
          </div>
        )}

        <form onSubmit={this.onSubmit} className="form">
          <div className="form__field">
            <label htmlFor="sign-in-email" className="form__label">
              E-mail
            </label>
            <input
              value={email}
              onChange={this.handleChange('email')}
              type="text"
              name="sign-in-email"
              id="sign-in-email"
              className="form__input form__text"
            />
          </div>
          <div className="form__field">
            <label htmlFor="sign-in-password" className="form__label">
              Password
            </label>
            <input
              name="sign-in-password"
              id="sign-in-password"
              value={password}
              onChange={this.handleChange('password')}
              type="password"
              className="form__input form__text"
            />
          </div>
          <div className="form__field">
            <button disabled={this.isDisabled()} type="submit" className="form__input form__submit">
              Sign In
            </button>
          </div>
        </form>
      </>
    );
  }
}

SignInForm.propTypes = {
  history: PropTypes.object,
};

export default SignInForm;
