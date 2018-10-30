import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Helmet } from 'react-helmet';
import { ThemeContext } from '../theme-context';
import CurrentTime from './current-time';

const Dashboard = () => (
  <ThemeContext.Consumer>
    {({ iconColor, iconSize }) => (
      <div className="page dashboard">
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
        <h1 className="page__title">Dashboard</h1>
        <CurrentTime />

        <ul className="menu">
          <li className="menu__item menu__item--icon">
            <Link to="/mood-tracker" className="menu__link">
              <FontAwesomeIcon icon="theater-masks" color={iconColor} size={iconSize} /> Mood
              tracker
            </Link>
          </li>
          <li className="menu__item menu__item--icon">
            <Link to="/reports" className="menu__link">
              <FontAwesomeIcon icon="chart-area" color={iconColor} size={iconSize} /> Reports/Charts
            </Link>
          </li>
          <li className="menu__item menu__item--icon">
            <Link to="/about" className="menu__link">
              <FontAwesomeIcon icon="info-circle" color={iconColor} size={iconSize} /> About
              Application
            </Link>
          </li>
          <li className="menu__item menu__item--icon">
            <Link to="/account" className="menu__link">
              <FontAwesomeIcon icon="user-cog" color={iconColor} size={iconSize} /> Account
            </Link>
          </li>
          <li className="menu__item menu__item--icon">
            <Link to="/logout" className="menu__link">
              <FontAwesomeIcon icon="sign-out-alt" color={iconColor} size={iconSize} /> Sign out
            </Link>
          </li>
        </ul>
      </div>
    )}
  </ThemeContext.Consumer>
);

export default Dashboard;
