/* eslint no-else-return: 0 */

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import PropTypes from 'prop-types';
import moment from 'moment';
import CustomTooltip from './reports-chart-custom-tooltip';
import { getMonthObject } from '../utils/reports';
import { dietOptions } from '../tracker-options.config.js';

const eatingOptions = dietOptions.find(group => group.id === 'eating').options;

const gradientOffset = data => {
  const dataMax = Math.max(
    ...data.map(item => eatingOptions.find(option => option.id === item.optionID).scale)
  );
  const dataMin = Math.min(
    ...data.map(item => eatingOptions.find(option => option.id === item.optionID).scale)
  );

  return dataMax / (dataMax - dataMin);
};

const ChartEating = props => {
  const { data, showDateRange } = props;

  const daysWithEatingData = data.reduce(
    (acc, item) => [...acc, moment.unix(item.timestamp).format('DD/MM/YYYY')],
    []
  );

  const uniqueDaysWithEatingData = daysWithEatingData.filter(
    (elem, pos, arr) => arr.indexOf(elem) === pos
  );
  if (uniqueDaysWithEatingData.length > 4) {
    const off = gradientOffset(data);

    const eatingDays = getMonthObject(showDateRange);

    const chartData = data.reduce((acc, item) => {
      const { timestamp, optionID } = item;

      const day = parseInt(moment.unix(timestamp).format('D'));
      const value = eatingOptions.find(option => option.id === optionID).scale;
      acc.find(row => row.day === day).apetite = value;
      return acc;
    }, eatingDays);

    return (
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData} margin={{ top: 5, right: 5, bottom: 40, left: 5 }}>
          <XAxis
            dataKey="day"
            label={{ value: 'Day', position: 'bottom' }}
            interval={1}
            tick={{ fontSize: 11 }}
          />
          <YAxis
            domain={[-1, 0, 1]}
            tick={{ fontSize: 11 }}
            label={{ value: 'Apetite', angle: -90, position: 'insideLeft' }}
            interval={1}
          />
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <Tooltip content={<CustomTooltip date={showDateRange} />} />

          <ReferenceLine
            y={1}
            label={{
              position: 'bottom',
              value: 'Super',
              fill: '#333',
              fontSize: 14,
            }}
            stroke="red"
            strokeDasharray="3 13"
          />
          <ReferenceLine
            y={0}
            label={{
              position: 'top',
              value: 'Good',
              fill: '#333',
              fontSize: 14,
            }}
            stroke="red"
            strokeDasharray="3 13"
          />
          <ReferenceLine
            y={-1}
            label={{
              position: 'top',
              value: 'Poor',
              fill: '#333',
              fontSize: 14,
            }}
            stroke="red"
            strokeDasharray="3 13"
          />

          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor="green" stopOpacity={1} />
              <stop offset={off} stopColor="red" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="apetite"
            stroke="#000"
            fill="url(#splitColor)"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  } else if (uniqueDaysWithEatingData.length > 0) {
    return <p id="no-records-found">Insufficient data to make a chart for {showDateRange}.</p>;
  } else {
    return <p id="no-records-found">No records found for {showDateRange}.</p>;
  }
};

ChartEating.propTypes = {
  data: PropTypes.array.isRequired,
  showDateRange: PropTypes.string.isRequired,
};

export default ChartEating;
