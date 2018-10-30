import React, { Component } from 'react';
import * as authAPI from '../../firebase/auth-api';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
  success: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

    this.onSubmit = this.onSubmit.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const { passwordOne } = this.state;

    authAPI
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState(() => ({
          ...INITIAL_STATE,
          success: {
            message: 'Your password has been successfully changed.',
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
    const { passwordOne, passwordTwo } = this.state;
    return passwordOne !== passwordTwo || passwordOne === '';
  }

  render() {
    const { passwordOne, passwordTwo, error, success } = this.state;

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
            <label htmlFor="new-password" className="form__label">
              New password
            </label>
            <input
              value={passwordOne}
              onChange={this.handleChange('passwordOne')}
              type="password"
              name="new-password"
              id="new-password"
              className="form__input form__text"
            />
          </div>

          <div className="form__field">
            <label htmlFor="new-password-confirm" className="form__label">
              Confirm New Password
            </label>
            <input
              value={passwordTwo}
              onChange={this.handleChange('passwordTwo')}
              type="password"
              name="new-password-confirm"
              id="new-password-confirm"
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

export default PasswordChangeForm;
