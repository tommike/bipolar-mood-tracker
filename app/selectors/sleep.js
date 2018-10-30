import { createSelector } from 'reselect';
import queryString from 'query-string';
import moment from 'moment';
import { sleepOptions } from '../tracker-options.config.js';
import { getReportsDates } from '../utils/reports';

const getLocation = (state, props) => props.location;
const getAllSleepTimeData = state => state.sleepTime;

export const getSleepTimeData = createSelector(
  getAllSleepTimeData,
  getLocation,
  (sleepTime, location) => {
    const searchValues = queryString.parse(location.search);
    const { monthStartUnix, monthEndUnix } = getReportsDates(searchValues.showDateRange);

    const sleepTimeData = sleepTime
      .filter(item => item.bedtime >= monthStartUnix && item.bedtime <= monthEndUnix)
      .sort((a, b) => a.bedtime - b.bedtime);

    return sleepTimeData;
  }
);

const getAllSleepData = state => state.sleep;

export const getSleepData = createSelector(getAllSleepData, getLocation, (sleep, location) => {
  const searchValues = queryString.parse(location.search);

  const { monthStartUnix, monthEndUnix } = getReportsDates(searchValues.showDateRange);

  const sleepData = sleep
    .filter(item => item.timestamp >= monthStartUnix && item.timestamp <= monthEndUnix)
    .sort((a, b) => a.timestamp - b.timestamp)
    .map(({ id, timestamp, optionID }) => {
      const displayTime = moment.unix(timestamp).format('DD/MM/YYYY HH:mm');
      const dateTime = moment.unix(timestamp).format();

      const { label } = sleepOptions.find(item => item.id === optionID);
      return { displayTime, dateTime, id, label };
    });

  return sleepData;
});
