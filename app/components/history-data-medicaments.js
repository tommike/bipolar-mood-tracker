import React from 'react';
import PropTypes from 'prop-types';

const HistoryDataMedicaments = props => {
  const { data, showDateRange } = props;

  if (data.length) {
    return (
      <ul className="reports-list">
        {data.map(({ displayTime, dateTime, dose, notes, type, id }) => (
          <li key={id} className="reports-list__item reports-list__item--margin">
            <h2 className="reports-list__title">
              <time dateTime={dateTime}>{displayTime}</time>
            </h2>
            <p>
              <strong>Type:</strong> {type}
            </p>
            <p>
              <strong>Dose:</strong> {dose}
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

HistoryDataMedicaments.propTypes = {
  data: PropTypes.array.isRequired,
  showDateRange: PropTypes.string.isRequired,
};

export default HistoryDataMedicaments;
