import React from 'react';
import PropTypes from 'prop-types';

const HistoryDataSelfCare = props => {
  const { data, showDateRange } = props;

  if (data.length) {
    return (
      <ul className="reports-list">
        {data.map(({ displayTime, dateTime, id, notes, label }) => (
          <li key={id} className="reports-list__item reports-list__item--margin">
            <h2 className="reports-list__title">{label}</h2>
            <p>
              <strong>Time:</strong> <time dateTime={dateTime}>{displayTime}</time>
            </p>
            <p>
              <strong>Notes:</strong> {notes}
            </p>
          </li>
        ))}
      </ul>
    );
  }
  return <p id="no-records-found">No records found for {showDateRange}.</p>;
};

HistoryDataSelfCare.propTypes = {
  data: PropTypes.array.isRequired,
  showDateRange: PropTypes.string.isRequired,
};

export default HistoryDataSelfCare;
