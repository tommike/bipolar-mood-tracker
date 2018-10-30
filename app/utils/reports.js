import moment from 'moment';

export function getMonthObject(range) {
  const daysInMonth = parseInt(
    moment(range, 'M/YYYY')
      .endOf('month')
      .format('D')
  );

  const chartDaysInMonth = [...Array(daysInMonth).keys()].reduce((acc, index) => {
    const day = { day: index + 1 };
    return [...acc, day];
  }, []);

  return chartDaysInMonth;
}

export function getReportsDates(showDateRange = null) {
  const currentMonth = moment().format('M');
  const currentYear = moment().format('YYYY');
  const currentRange = `${currentMonth}/${currentYear}`;

  const range = showDateRange ? showDateRange.replace('-', '/') : currentRange;

  const monthStartUnix = moment(range, 'M/YYYY')
    .startOf('month')
    .unix();
  const monthEndUnix = moment(range, 'M/YYYY')
    .endOf('month')
    .unix();

  return { showDateRange: range, monthStartUnix, monthEndUnix };
}
