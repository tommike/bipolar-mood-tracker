import React from 'react';
import PropTypes from 'prop-types';
import HabitsReportGroup from './habits-report-group';

const HistoryDataHabits = props => {
  const { data, showDateRange } = props;

  if (Object.keys(data).length) {
    return Object.keys(data).map(key => {
      const group = data[key];
      const { label: title, items } = group;
      return <HabitsReportGroup items={items} key={key} title={title} />;
    }, this);
  }
  return <p id="no-records-found">No records found for {showDateRange}.</p>;
};

HistoryDataHabits.propTypes = {
  data: PropTypes.object.isRequired,
  showDateRange: PropTypes.string.isRequired,
};

export default HistoryDataHabits;
