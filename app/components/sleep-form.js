import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TimePicker from './time-picker';
import { handleAddSleepTime } from '../actions/sleep';

class SleepForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bedtime: 'dd:mm:yyyy hh:mm',
      wakeup: 'dd:mm:yyyy hh:mm',
      showSuccessMessage: false,
      showDateOrderError: false,
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

    const { wakeup, bedtime } = this.state;
    const { dispatch } = this.props;

    const wakeupUnix = moment(wakeup, 'DD:MM:YYYY HH:mm').unix();
    const bedtimeUnix = moment(bedtime, 'DD:MM:YYYY HH:mm').unix();

    if (wakeupUnix <= bedtimeUnix) {
      this.setState(() => ({
        showDateOrderError: true,
      }));
    } else {
      dispatch(handleAddSleepTime(bedtimeUnix, wakeupUnix, this.afterSubmit));
    }
  }

  afterSubmit() {
    this.setState(() => ({
      wakeup: 'dd:mm:yyyy hh:mm',
      bedtime: 'dd:mm:yyyy hh:mm',
      showSuccessMessage: true,
      showDateOrderError: false,
    }));
  }

  resetForm() {
    this.setState(() => ({
      wakeup: 'dd:mm:yyyy hh:mm',
      bedtime: 'dd:mm:yyyy hh:mm',
      showSuccessMessage: false,
      showDateOrderError: false,
    }));
  }

  isDisabled() {
    const { bedtime, wakeup } = this.state;
    return !!(!bedtime || !wakeup || bedtime.match(/[a-z]/i) || wakeup.match(/[a-z]/i));
  }

  render() {
    const { showSuccessMessage, showDateOrderError, bedtime, wakeup } = this.state;

    return (
      <>
        <h2 className="page__section-title">Sleep</h2>

        {showSuccessMessage && (
          <div className="form-feedback form-feedback--success">
            <p className="form-feedback__text">Your data has been successfully saved.</p>
            <button onClick={this.resetForm} className="form-feedback__button" type="button">
              Add another.
            </button>
          </div>
        )}

        {showDateOrderError && (
          <div className="form-feedback form-feedback--error">
            <p className="form-feedback__text">Wakeup date must be after bedtime date.</p>
          </div>
        )}

        {!showSuccessMessage && (
          <form onSubmit={this.handleSubmit} className="form">
            <TimePicker
              title="Bed time"
              id="bed-time"
              timePropId="bedtime"
              controlFunc={this.handleChange}
              time={bedtime}
            />
            <TimePicker
              title="Wake Up"
              id="wake-up"
              timePropId="wakeup"
              controlFunc={this.handleChange}
              time={wakeup}
            />

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

SleepForm.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(SleepForm);
