import { createSelector } from 'reselect';
import moment from 'moment';
import queryString from 'query-string';
import { moodOptions } from '../tracker-options.config.js';
import { getReportsDates, getMonthObject } from '../utils/reports';

const getLocation = (state, props) => props.location;
const getAllMoods = state => state.moods;

export const getMoodsGroupedByCat = createSelector(getAllMoods, getLocation, (moods, location) => {
  const searchValues = queryString.parse(location.search);

  const { showDateRange, monthStartUnix, monthEndUnix } = getReportsDates(
    searchValues.showDateRange
  );

  const moodsGroupedByCat = moodOptions
    .filter(cat => cat.id !== 'aches')
    .reduce((catAcc, catItem) => {
      let subCatItems = moods
        .filter(item => item.catID === catItem.id)
        .filter(item => item.timestamp >= monthStartUnix && item.timestamp <= monthEndUnix)
        .sort((a, b) => a.timestamp - b.timestamp);

      if (subCatItems.length) {
        const catDays = getMonthObject(showDateRange);
        const catOptions = catItem.options;

        subCatItems = subCatItems.reduce((subcatAcc, subcatItem) => {
          const { optionID, timestamp } = subcatItem;

          const day = parseInt(moment.unix(timestamp).format('D'));
          const { scale: value, label } = catOptions.find(item => item.id === optionID);

          const dayObj = subcatAcc.find(row => row.day === day);
          if (Object.prototype.hasOwnProperty.call(dayObj, 'level')) {
            // allow for multiple mood records on the same date
            subcatAcc.push({ day, level: value, label });
          } else {
            dayObj.level = value;
            dayObj.label = label;
          }

          return subcatAcc;
        }, catDays);

        catAcc[catItem.id] = subCatItems;
      }

      return catAcc;
    }, {});

  return moodsGroupedByCat;
});

const getAllAchesData = state => state.moods;

export const getAchesData = createSelector(getAllAchesData, getLocation, (moods, location) => {
  const achesOptions = moodOptions.find(cat => cat.id === 'aches').options;
  const searchValues = queryString.parse(location.search);
  const { monthStartUnix, monthEndUnix } = getReportsDates(searchValues.showDateRange);

  const achesData = moods
    .filter(item => item.catID === 'aches')
    .filter(item => item.timestamp >= monthStartUnix && item.timestamp <= monthEndUnix)
    .sort((a, b) => a.timestamp - b.timestamp)
    .map(({ id, timestamp, optionID }) => {
      const displayTime = moment.unix(timestamp).format('DD/MM/YYYY HH:mm');
      const dateTime = moment.unix(timestamp).format();

      const { label } = achesOptions.find(item => item.id === optionID);
      return { displayTime, dateTime, id, label };
    });

  return achesData;
});
