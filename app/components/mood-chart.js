import React from 'react';
import {
  ScatterChart,
  Scatter,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import PropTypes from 'prop-types';
import CustomTooltip from './reports-chart-custom-tooltip';
import { range } from '../utils/shared';

const moodLegend = [
  { color: '#000000', description: 'Hospitalized' },
  { color: '#5B5BFF', description: 'Super mode' },
  { color: '#8282FF', description: 'Time to intervene' },
  { color: '#A8A8FF', description: 'Monitor closely' },
  { color: '#C6C6FF', description: 'Optimistic' },
  { color: '#32DF00', description: 'Normal' },
  { color: '#FFD34F', description: 'Pesimistic' },
  { color: '#FFB5B5', description: 'Monitor closely' },
  { color: '#FF8E8E', description: 'Time to intervene' },
  { color: '#FF5353', description: 'Incapacitated' },
  { color: '#ff0000', description: 'Hospitalized' },
];

const MoodChart = props => {
  const { items, maxDaysInMonth, showDateRange } = props;

  if (!items) {
    return <p id="no-records-found">No records found for {showDateRange}.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart margin={{ top: 5, right: 5, bottom: 40, left: 5 }}>
        <XAxis
          type="number"
          dataKey="day"
          name="Day"
          label={{ value: 'Day', position: 'bottom' }}
          interval={1}
          ticks={range(maxDaysInMonth + 1)}
          tick={{ fontSize: 11 }}
        />
        <YAxis
          type="number"
          dataKey="level"
          name="Level"
          domain={[-5, 5]}
          interval={1}
          ticks={[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]}
          tick={{ fontSize: 11 }}
          label={{ value: 'Mood scale', angle: -90, position: 'insideLeft' }}
        />

        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <Tooltip content={<CustomTooltip date={showDateRange} isMoodChart />} />

        <Scatter data={items} fill="#8884d8" isAnimationActive={false}>
          {items.map((item, index) => {
            const color = Object.prototype.hasOwnProperty.call(item, 'level')
              ? moodLegend[item.level + 5].color
              : '#000';
            return <Cell key={`cell-${index}`} fill={color} />;
          })}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
};

MoodChart.propTypes = {
  items: PropTypes.array,
  maxDaysInMonth: PropTypes.number.isRequired,
  showDateRange: PropTypes.string.isRequired,
};

export default MoodChart;
