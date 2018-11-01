import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';
import moment from 'moment';
import CustomTooltip from './reports-chart-custom-tooltip';
import { getMonthObject } from '../utils/reports';

const loadDataToMonthObject = (monthObject, data) =>
  data.reduce((acc, item) => {
    const { bedtime, wakeup } = item;
    const day = parseInt(moment.unix(bedtime).format('D'));
    const totalSleep = (wakeup - bedtime) / 60 / 60;

    const dayProperty = acc.find(row => row.day === day);
    if (Object.prototype.hasOwnProperty.call(dayProperty, 'totalSleep')) {
      // add sleep time to existing sleep time
      dayProperty.totalSleep += totalSleep;
    } else {
      dayProperty.totalSleep = totalSleep;
    }

    return acc;
  }, monthObject);

const ChartSleepTime = props => {
  const { data, showDateRange } = props;

  if (data.length) {
    const monthObject = getMonthObject(showDateRange);
    const chartData = loadDataToMonthObject(monthObject, data);

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 40, left: 5 }}>
          <XAxis
            dataKey="day"
            label={{ value: 'Day', position: 'bottom' }}
            interval={1}
            tick={{ fontSize: 11 }}
          />
          <YAxis
            domain={[0, 24]}
            tick={{ fontSize: 11 }}
            label={{ value: 'Sleep time', angle: -90, position: 'insideLeft' }}
          />
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <Tooltip content={<CustomTooltip date={showDateRange} />} />
          <Bar dataKey="totalSleep" fill="#8884d8" isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
  return <p id="no-records-found">No records found for {showDateRange}.</p>;
};

ChartSleepTime.propTypes = {
  data: PropTypes.array.isRequired,
  showDateRange: PropTypes.string.isRequired,
};

export default ChartSleepTime;
