import React from 'react';
import PropTypes from 'prop-types';

const HistoryDataAches = props => {
  const { data, showDateRange } = props;

  if (data.length) {
    return (
      <ul className="reports-list">
        {data.map(({ displayTime, dateTime, id, label }) => (
          <li key={id} className="reports-list__item">
            <p>
              <time dateTime={dateTime}>{displayTime}</time> - {label}
            </p>
          </li>
        ))}
      </ul>
    );
  }
  return <p id="no-records-found">No records found for {showDateRange}.</p>;
};

HistoryDataAches.propTypes = {
  data: PropTypes.array.isRequired,
  showDateRange: PropTypes.string.isRequired,
};

export default HistoryDataAches;
