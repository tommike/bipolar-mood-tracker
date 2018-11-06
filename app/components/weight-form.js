/* eslint prefer-destructuring: 0 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddWeight } from '../actions/diet';

class WeightForm extends Component {
  constructor(props) {
    super(props);

    this.state = { weight: '', showSuccessMessage: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.afterSubmit = this.afterSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
  }

  handleChange(event) {
    const value = parseFloat(event.target.value);
    this.setState(() => ({ weight: value }));
  }

  handleSubmit(event) {
    event.preventDefault();
    const { weight } = this.state;
    const { dispatchHandleSubmit } = this.props;
    dispatchHandleSubmit(weight, this.afterSubmit);
  }

  afterSubmit() {
    this.setState(() => ({
      weight: '',
      showSuccessMessage: true,
    }));
  }

  resetForm() {
    this.setState(() => ({
      weight: '',
      showSuccessMessage: false,
    }));
  }

  isDisabled() {
    const { weight } = this.state;
    return !weight;
  }

  render() {
    const { showSuccessMessage, weight } = this.state;

    return (
      <>
        <h2 className="page__section-title">Enter weight</h2>

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
              <label htmlFor="weight-form" className="form__label">
                Weight in kg
              </label>
              <input
                type="number"
                step="0.00000001"
                min="0"
                max="200"
                name="weight-form"
                id="weight-form"
                onChange={this.handleChange}
                value={weight}
                className="form__input form__text"
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

const mapDispatchToProps = dispatch => ({
  dispatchHandleSubmit: (weight, callback) => dispatch(handleAddWeight(weight, callback)),
});

WeightForm.propTypes = {
  dispatchHandleSubmit: PropTypes.func,
};

export default connect(
  null,
  mapDispatchToProps
)(WeightForm);
