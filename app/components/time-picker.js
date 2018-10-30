import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { range } from '../utils/shared';

class TimePicker extends Component {
  render() {
    const { id, title, time, timePropId, controlFunc } = this.props;

    const timeData = time.split(/:| /);

    let initDay = timeData[0];
    let initMonth = timeData[1];
    let initYear = timeData[2];

    let initHours = timeData[3];
    let initMinutes = timeData[4];

    if (initDay !== 'dd') {
      initDay = parseInt(initDay);
    }

    if (initMonth !== 'mm') {
      initMonth = parseInt(initMonth);
    }

    if (initYear !== 'yyyy') {
      initYear = parseInt(initYear);
    }

    if (initHours !== 'hh') {
      initHours = parseInt(initHours);
    }

    if (initMinutes !== 'mm') {
      initMinutes = parseInt(initMinutes);
    }

    const initDayTwoDigit = initDay < 10 ? `0${initDay}` : initDay;
    const initMonthTwoDigit = initMonth < 10 ? `0${initMonth}` : initMonth;
    const initYearTwoDigit = initYear < 10 ? `0${initYear}` : initYear;
    const initHoursTwoDigit = initHours < 10 ? `0${initHours}` : initHours;
    const initMinutesTwoDigit = initMinutes < 10 ? `0${initMinutes}` : initMinutes;

    const minutesRange = ['mm', ...range(60)];
    const hoursRange = ['hh', ...range(24)];
    const dayRange = ['dd', ...range(31)];
    const monthRange = ['mm', ...range(12)];
    const yearRange = ['yyyy', moment().format('YYYY'), moment().format('YYYY') - 1];

    return (
      <>
        <div className="form__row form__row--has-timepicker">
          <label htmlFor={`${id}-day`} className="form__label">
            {title}
          </label>

          <div className="form__field">
            <label htmlFor={`${id}-day`} className="form__label">
              {title} day
            </label>
            <select
              id={`${id}-day`}
              name={`${id}-day`}
              onChange={controlFunc(timePropId, 'day')}
              value={initDayTwoDigit}
              className="form__input form__select"
            >
              {dayRange.map(day => {
                let dayValue = day;
                if (dayValue !== 'dd') {
                  dayValue += 1;
                }
                const dayTwoDigit = dayValue < 10 ? `0${dayValue}` : dayValue;
                return (
                  <option value={dayTwoDigit} key={dayValue}>
                    {dayTwoDigit}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form__field">
            <label htmlFor={`${id}-month`} className="form__label">
              {title} month
            </label>
            <select
              id={`${id}-month`}
              name={`${id}-month`}
              onChange={controlFunc(timePropId, 'month')}
              value={initMonthTwoDigit}
              className="form__input form__select"
            >
              {monthRange.map(month => {
                let monthValue = month;
                if (monthValue !== 'mm') {
                  monthValue += 1;
                }
                const monthTwoDigit = monthValue < 10 ? `0${monthValue}` : monthValue;
                return (
                  <option value={monthTwoDigit} key={monthValue}>
                    {monthTwoDigit}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form__field">
            <label htmlFor={`${id}-year`} className="form__label">
              {title} year
            </label>
            <select
              id={`${id}-year`}
              name={`${id}-year`}
              onChange={controlFunc(timePropId, 'year')}
              value={initYearTwoDigit}
              className="form__input form__select"
            >
              {yearRange.map(year => {
                let yearValue = year;
                if (yearValue !== 'yyyy') {
                  yearValue = parseInt(yearValue);
                }
                const yearTwoDigit = yearValue < 10 ? `0${yearValue}` : yearValue;
                return (
                  <option value={yearTwoDigit} key={yearValue}>
                    {yearTwoDigit}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form__field">
            <label htmlFor={`${id}-hours`} className="form__label">
              {title} hours
            </label>
            <select
              id={`${id}-hours`}
              name={`${id}-hours`}
              onChange={controlFunc(timePropId, 'hours')}
              value={initHoursTwoDigit}
              className="form__input form__select"
            >
              {hoursRange.map(hour => {
                const hourTwoDigit = hour < 10 ? `0${hour}` : hour;
                return (
                  <option value={hourTwoDigit} key={hour}>
                    {hourTwoDigit}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form__field">
            <label htmlFor={`${id}-minutes`} className="form__label">
              {title} minutes
            </label>
            <select
              id={`${id}-minutes`}
              name={`${id}-minutes`}
              onChange={controlFunc(timePropId, 'minutes')}
              value={initMinutesTwoDigit}
              className="form__input form__select"
            >
              {minutesRange.map(minutes => {
                const minutesTwoDigit = minutes < 10 ? `0${minutes}` : minutes;
                return (
                  <option value={minutesTwoDigit} key={minutes}>
                    {minutesTwoDigit}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </>
    );
  }
}

TimePicker.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  timePropId: PropTypes.string.isRequired,
  controlFunc: PropTypes.func.isRequired,
};

export default TimePicker;
