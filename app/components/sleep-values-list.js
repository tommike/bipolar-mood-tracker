import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sleepOptions } from '../tracker-options.config.js';
import ConnectedSleepForm from './sleep-form';
import { Breadcrumbs } from './breadcrumbs';
import TextOptions from './text-options';
import { handleAddSleep } from '../actions/sleep';

class SleepValuesList extends Component {
  constructor(props) {
    super(props);
    this.state = { optionSelectedID: null };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(optionID) {
    return function(event) {
      event.preventDefault();

      const { dispatch } = this.props;
      dispatch(handleAddSleep(optionID));

      this.setState(() => ({
        optionSelectedID: optionID,
      }));
    }.bind(this);
  }

  render() {
    const { optionSelectedID } = this.state;

    return (
      <>
        <Breadcrumbs />
        <TextOptions
          list={sleepOptions}
          {...this.props}
          selectItem={this.handleSelect}
          optionSelectedID={optionSelectedID}
        />
        <ConnectedSleepForm />
      </>
    );
  }
}

SleepValuesList.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default connect()(SleepValuesList);
