import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

export default class CustomTooltip extends Component {
  static getContent(data, date, isMoodChart) {
    const dataKey = isMoodChart ? 'moodChart' : data[0].dataKey;

    const month = moment(date, 'M/YYYY').format('M');

    switch (dataKey) {
      case 'apetite': {
        let apetiteValue = null;
        if (data[0].value === 1) {
          apetiteValue = 'Super';
        } else if (data[0].value === 0) {
          apetiteValue = 'Normal';
        } else if (data[0].value === -1) {
          apetiteValue = 'Poor';
        }

        return (
          <>
            <p>
              Day: {data[0].payload.day}/{month}
            </p>
            <p>Apetite: {apetiteValue}</p>
          </>
        );
      }
      case 'weight':
        return (
          <>
            <p>
              Day: {data[0].payload.day}/{month}
            </p>
            <p>
              Weight: {data[0].payload.weight}
              kg
            </p>
          </>
        );

      case 'totalSleep':
        return (
          <>
            <p>
              Day: {data[0].payload.day}/{month}
            </p>
            <p>
              Sleep: {data[0].payload.totalSleep}
              hr
            </p>
          </>
        );

      case 'moodChart':
        return (
          <>
            <p>
              Day: {data[0].value}/{month}
            </p>
            <p>Level: {data[1].value}</p>
            <p>Description: {data[0].payload.label}</p>
          </>
        );

      default:
        return <p>Error</p>;
    }
  }

  render() {
    const { active, date, isMoodChart } = this.props;

    if (active) {
      const { payload } = this.props;

      if (payload.length) {
        return (
          <div className="custom-tooltip">
            {CustomTooltip.getContent(payload, date, isMoodChart)}
          </div>
        );
      }
    }

    return null;
  }
}

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  date: PropTypes.string.isRequired,
  isMoodChart: PropTypes.bool,
  payload: PropTypes.array,
};

CustomTooltip.defaultProps = {
  isMoodChart: false,
};
