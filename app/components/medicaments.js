import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import TimePicker from './time-picker';
import { Breadcrumbs } from './breadcrumbs';
import { handleAddMedicament } from '../actions/medicaments';

class Medicaments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: '',
      dose: '',
      notes: '',
      time: 'dd:mm:yyyy hh:mm',
      showSuccessMessage: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.afterSubmit = this.afterSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
  }

  handleChange(key, subkey) {
    return function(event) {
      let fieldValue = event.target.value;

      if (subkey) {
        const { [key]: currentValue } = this.state;

        const currentValueArray = currentValue.split(/:| /);

        if (subkey === 'day') {
          currentValueArray[0] = fieldValue;
        } else if (subkey === 'month') {
          currentValueArray[1] = fieldValue;
        } else if (subkey === 'year') {
          currentValueArray[2] = fieldValue;
        } else if (subkey === 'hours') {
          currentValueArray[3] = fieldValue;
        } else if (subkey === 'minutes') {
          currentValueArray[4] = fieldValue;
        }

        fieldValue = `${currentValueArray[0]}:${currentValueArray[1]}:${currentValueArray[2]} ${
          currentValueArray[3]
        }:${currentValueArray[4]}`;
      }

      this.setState(() => ({
        [key]: fieldValue,
      }));
    }.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const { time, type, dose, notes } = this.state;
    const { dispatch } = this.props;
    const timeUnix = moment(time, 'DD:MM:YYYY HH:mm').unix();

    dispatch(handleAddMedicament(timeUnix, type, dose, notes, this.afterSubmit));
  }

  afterSubmit() {
    this.setState(() => ({
      type: '',
      dose: '',
      notes: '',
      time: 'dd:mm:yyyy hh:mm',
      showSuccessMessage: true,
    }));
  }

  resetForm() {
    this.setState(() => ({
      type: '',
      dose: '',
      notes: '',
      time: 'dd:mm:yyyy hh:mm',
      showSuccessMessage: false,
    }));
  }

  isDisabled() {
    const { type, dose, time } = this.state;
    return !type || !dose || time.match(/[a-z]/i);
  }

  render() {
    const { type, dose, time, notes, showSuccessMessage } = this.state;

    return (
      <>
        <Helmet>
          <title>Medication</title>
        </Helmet>
        <Breadcrumbs />
        <h1 className="page__title">Medication</h1>

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
            <TimePicker
              title="Medication Time"
              id="med-time"
              timePropId="time"
              controlFunc={this.handleChange}
              time={time}
            />

            <div className="form__field">
              <label htmlFor="medication-type" className="form__label">
                Type
              </label>
              <input
                type="text"
                id="medication-type"
                name="medication-type"
                onChange={this.handleChange('type')}
                value={type}
                className="form__input form__text"
              />
            </div>

            <div className="form__field">
              <label htmlFor="medication-dose" className="form__label">
                Dose
              </label>
              <input
                type="text"
                id="medication-dose"
                name="medication-dose"
                onChange={this.handleChange('dose')}
                value={dose}
                className="form__input form__text"
              />
            </div>

            <div className="form__field">
              <label htmlFor="medication-notes" className="form__label">
                Notes
              </label>
              <textarea
                id="medication-notes"
                name="medication-notes"
                onChange={this.handleChange('notes')}
                value={notes}
                className="form__input form__textarea"
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

Medicaments.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Medicaments);
