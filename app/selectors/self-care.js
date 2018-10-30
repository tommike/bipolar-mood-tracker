import { createSelector } from 'reselect';
import queryString from 'query-string';
import moment from 'moment';
import { getReportsDates } from '../utils/reports';
import { selfCareOptions } from '../tracker-options.config.js';

const getLocation = (state, props) => props.location;
const getAllSelfCareData = state => state.selfCare;

export const getSelfCareData = createSelector(
  getAllSelfCareData,
  getLocation,
  (selfCare, location) => {
    const searchValues = queryString.parse(location.search);

    const { monthStartUnix, monthEndUnix } = getReportsDates(searchValues.showDateRange);

    const selfCareData = selfCare
      .filter(item => item.timestamp >= monthStartUnix && item.timestamp <= monthEndUnix)
      .sort((a, b) => a.timestamp - b.timestamp)
      .map(({ id, timestamp, optionID, notes }) => {
        const displayTime = moment.unix(timestamp).format('DD/MM/YYYY HH:mm');
        const dateTime = moment.unix(timestamp).format();
        const { label } = selfCareOptions.find(item => item.id === optionID);
        return { displayTime, dateTime, id, notes, label };
      });

    return selfCareData;
  }
);
