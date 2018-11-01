import React from 'react';
import moment from 'moment';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import PropTypes from 'prop-types';
import CustomTooltip from './reports-chart-custom-tooltip';
import { getMonthObject } from '../utils/reports';

const loadDataToMonthObject = (monthObject, data) =>
  data.reduce((acc, item) => {
    const { timestamp, value } = item;
    const day = parseInt(moment.unix(timestamp).format('D'));
    acc.find(row => row.day === day).weight = value;
    return acc;
  }, monthObject);

const ChartWeight = props => {
  const { data, showDateRange } = props;

  if (data.length) {
    const monthObject = getMonthObject(showDateRange);

    const chartData = loadDataToMonthObject(monthObject, data);

    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 40, left: 5 }}>
          <XAxis
            dataKey="day"
            label={{ value: 'Day', position: 'bottom' }}
            interval={1}
            tick={{ fontSize: 11 }}
          />
          <YAxis
            domain={['dataMin - 10', 'dataMax + 10']}
            tick={{ fontSize: 11 }}
            label={{ value: 'Weight', angle: -90, position: 'insideLeft' }}
          />
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <Tooltip content={<CustomTooltip date={showDateRange} />} />
          <Line
            type="monotone"
            dataKey="weight"
            fill="#8884d8"
            stroke="#8884d8"
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
  return <p id="no-records-found">No records found for {showDateRange}.</p>;
};

ChartWeight.propTypes = {
  data: PropTypes.array.isRequired,
  showDateRange: PropTypes.string.isRequired,
};

export default ChartWeight;
