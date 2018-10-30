import React from 'react';
import PropTypes from 'prop-types';

const HabitsReportGroup = props => {
  const { title, items } = props;

  return (
    <div className="reports-list__group">
      <h2 className="reports-list__title">{title}</h2>
      <ul className="reports-list">
        {items.map(({ displayTime, dateTime, id }) => (
          <li key={id} className="reports-list__item">
            <p>
              <strong>Time:</strong> <time dateTime={dateTime}>{displayTime}</time>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

HabitsReportGroup.propTypes = {
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default HabitsReportGroup;
