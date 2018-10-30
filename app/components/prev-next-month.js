import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeContext } from '../theme-context';

const PrevNextMonth = props => {
  const { currentURL, showDateRange } = props;

  const currentMonth = moment().format('M');
  const currentYear = moment().format('YYYY');
  const currentDate = `${currentMonth}/${currentYear}`;

  const showMonth = parseInt(moment(showDateRange, 'M/YYYY').format('M'));
  const showYear = parseInt(moment(showDateRange, 'M/YYYY').format('YYYY'));

  const prevMonth = showMonth === 1 ? 12 : showMonth - 1;
  const nextMonth = showMonth === 12 ? 1 : showMonth + 1;

  const prevYear = showMonth === 1 ? showYear - 1 : showYear;
  const nextYear = showMonth === 12 ? showYear + 1 : showYear;

  const prevURL = `${prevMonth}-${prevYear}`;
  const nextURL = currentDate !== showDateRange ? `${nextMonth}-${nextYear}` : null;

  return (
    <ThemeContext.Consumer>
      {({ iconSize, iconColor }) => (
        <ul className="prev-next-nav">
          {prevURL && (
            <li className="prev-next-nav__item prev-next-nav__item-prev">
              <Link
                to={{
                  pathname: `${currentURL}`,
                  search: `?showDateRange=${prevURL}`,
                }}
                className="prev-next-nav__link"
              >
                <FontAwesomeIcon icon="angle-left" color={iconColor} size={iconSize} /> Previous
                Month
              </Link>
            </li>
          )}
          {nextURL && (
            <li className="prev-next-nav__item prev-next-nav__item-next">
              <Link
                to={{
                  pathname: `${currentURL}`,
                  search: `?showDateRange=${nextURL}`,
                }}
                className="prev-next-nav__link"
              >
                Next Month <FontAwesomeIcon icon="angle-right" color={iconColor} size={iconSize} />
              </Link>
            </li>
          )}
        </ul>
      )}
    </ThemeContext.Consumer>
  );
};

PrevNextMonth.propTypes = {
  currentURL: PropTypes.string.isRequired,
  showDateRange: PropTypes.string.isRequired,
};

export default PrevNextMonth;
