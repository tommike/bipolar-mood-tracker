import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleSyncMood } from '../actions/mood';
import { getTimeToInterveneStatus } from '../selectors/time-to-intervene-warning';

class TimeToInterveneWarning extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleSyncMood());
  }

  render() {
    const { showWarning } = this.props;

    return (
      <>
        {showWarning && (
          <p className="time-to-intervene">
            Your latest mood records show that it's time to intervene. Consult your psychiatrist or
            psychologist.
          </p>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({ showWarning: getTimeToInterveneStatus(state) });

TimeToInterveneWarning.propTypes = {
  showWarning: PropTypes.bool.isRequired,
  dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(TimeToInterveneWarning);
