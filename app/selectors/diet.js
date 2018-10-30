import { createSelector } from 'reselect';
import queryString from 'query-string';
import moment from 'moment';
import { getReportsDates } from '../utils/reports';
import { dietOptions } from '../tracker-options.config.js';

const getLocation = (state, props) => props.location;
const getAllWeightData = state => state.weight;

export const getWeightData = createSelector(getAllWeightData, getLocation, (weight, location) => {
  const searchValues = queryString.parse(location.search);

  const { monthStartUnix, monthEndUnix } = getReportsDates(searchValues.showDateRange);
  const weightData = weight
    .filter(item => item.timestamp >= monthStartUnix && item.timestamp <= monthEndUnix)
    .sort((a, b) => a.timestamp - b.timestamp);

  return weightData;
});

const getAllEatingData = state => state.eating;

export const getEatingData = createSelector(getAllEatingData, getLocation, (eating, location) => {
  const searchValues = queryString.parse(location.search);
  const { monthStartUnix, monthEndUnix } = getReportsDates(searchValues.showDateRange);

  const eatingData = eating
    .filter(item => item.timestamp >= monthStartUnix && item.timestamp <= monthEndUnix)
    .sort((a, b) => a.timestamp - b.timestamp);

  return eatingData;
});

const getAllHabits = state => state.habits;

export const getHabitsGroupedByCat = createSelector(
  getAllHabits,
  getLocation,
  (habits, location) => {
    const searchValues = queryString.parse(location.search);

    const { monthStartUnix, monthEndUnix } = getReportsDates(searchValues.showDateRange);

    const habitsData = habits
      .filter(item => item.timestamp >= monthStartUnix && item.timestamp <= monthEndUnix)
      .sort((a, b) => a.timestamp - b.timestamp)
      .map(({ id, timestamp, optionID }) => {
        const displayTime = moment.unix(timestamp).format('DD/MM/YYYY HH:mm');
        const dateTime = moment.unix(timestamp).format();
        return { displayTime, dateTime, id, optionID };
      });

    const habitsOptions = dietOptions.find(group => group.id === 'habits').options;

    const habitsGroupedByCat = habitsOptions.reduce((acc, item) => {
      const subCatItems = habitsData.filter(habit => habit.optionID === item.id);

      if (subCatItems.length) {
        acc[item.id] = {};
        acc[item.id].label = item.label;
        acc[item.id].items = subCatItems;
      }

      return acc;
    }, {});

    return habitsGroupedByCat;
  }
);
