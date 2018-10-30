/* eslint prefer-destructuring: 0 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { selfCareOptions } from '../tracker-options.config.js';
import { Breadcrumbs } from './breadcrumbs';
import { handleAddSelfCare } from '../actions/self-care';

class selfCareNote extends Component {
  constructor(props) {
    super(props);

    this.state = { notes: '', showSuccessMessage: false, toOptionsList: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.afterSubmit = this.afterSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;

    this.setState(() => ({
      notes: value,
    }));
  }

  handleSubmit(event) {
    event.preventDefault();

    const { notes } = this.state;
    const {
      match: {
        params: { optionID },
      },
    } = this.props;
    const { dispatch } = this.props;

    dispatch(handleAddSelfCare(optionID, notes, this.afterSubmit));
  }

  afterSubmit() {
    this.setState(() => ({
      notes: '',
      showSuccessMessage: true,
    }));
  }

  resetForm() {
    this.setState(() => ({
      notes: '',
      showSuccessMessage: false,
      toOptionsList: true,
    }));
  }

  isDisabled() {
    const { notes } = this.state;
    return !notes;
  }

  render() {
    const { showSuccessMessage, toOptionsList, notes } = this.state;
    const { match } = this.props;

    const {
      match: {
        params: { optionID },
      },
    } = this.props;

    const optionData = selfCareOptions.find(({ id }) => optionID === id);
    const { label: title } = optionData;

    const parentURL = match.url.replace(`/${optionID}`, '');

    if (toOptionsList) {
      return <Redirect to={parentURL} />;
    }

    return (
      <>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Breadcrumbs />
        <h1 className="page__title">{title}</h1>

        {showSuccessMessage && (
          <div className="form-feedback form-feedback--success">
            <p className="form-feedback__text">Your data has been successfully saved.</p>
            <button onClick={this.resetForm} className="form-feedback__button" type="button">
              Add another.
            </button>
          </div>
        )}

        {!showSuccessMessage && (
          <form onSubmit={this.handleSubmit} className="form">
            <div className="form__field">
              <label htmlFor={`${optionID}`} className="form__label">
                Notes
              </label>
              <textarea
                rows="3"
                cols="30"
                name={`${optionID}`}
                id={`${optionID}`}
                onChange={this.handleChange}
                className="form__input form__textarea"
                value={notes}
              />
            </div>

            <div className="form__field">
              <button
                className="form__input form__submit"
                type="submit"
                disabled={this.isDisabled()}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </>
    );
  }
}

selfCareNote.propTypes = {
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
};

export default connect()(selfCareNote);
