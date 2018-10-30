import { createSelector } from 'reselect';
import queryString from 'query-string';
import moment from 'moment';
import { getReportsDates } from '../utils/reports';

const getLocation = (state, props) => props.location;
const getAllMedicamentsData = state => state.medicaments;

export const getMedicamentsData = createSelector(
  getAllMedicamentsData,
  getLocation,
  (medicaments, location) => {
    const searchValues = queryString.parse(location.search);

    const { monthStartUnix, monthEndUnix } = getReportsDates(searchValues.showDateRange);

    const medicamentData = medicaments
      .filter(item => item.medicationTime >= monthStartUnix && item.medicationTime <= monthEndUnix)
      .sort((a, b) => a.medicationTime - b.medicationTime)
      .map(({ medicationTime, type, dose, notes, id }) => {
        const displayTime = moment.unix(medicationTime).format('DD/MM/YYYY HH:mm');
        const dateTime = moment.unix(medicationTime).format();
        return { displayTime, dateTime, dose, notes, type, id };
      });

    return medicamentData;
  }
);
