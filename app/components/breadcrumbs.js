import React from 'react';
import { Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeContext } from '../theme-context';
import { urlToTitle } from '../utils/shared';

export const BreadcrumbsItem = ({ match }) => {
  const title = urlToTitle(match.params.nextpath);

  return (
    <ThemeContext.Consumer>
      {theme => (
        <>
          <li className="breadcrumbs__item">
            {match.isExact ? (
              <span className="breadcrumbs__text">{title}</span>
            ) : (
              <>
                <Link to={match.url} className="breadcrumbs__anchor">
                  {title}
                </Link>{' '}
                <FontAwesomeIcon icon="angle-right" color={theme.iconColor} size={theme.iconSize} />
              </>
            )}
          </li>
          <Route path={`${match.url}/:nextpath`} component={BreadcrumbsItem} />
        </>
      )}
    </ThemeContext.Consumer>
  );
};

export const Breadcrumbs = () => (
  <ThemeContext.Consumer>
    {theme => (
      <ul className="breadcrumbs">
        <li className="breadcrumbs__item">
          <Link to="/" className="breadcrumbs__anchor">
            <FontAwesomeIcon icon="home" color={theme.iconColor} size={theme.iconSize} />
          </Link>
          <FontAwesomeIcon icon="angle-right" />
        </li>
        <Route path="/:nextpath" component={BreadcrumbsItem} />
      </ul>
    )}
  </ThemeContext.Consumer>
);

BreadcrumbsItem.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    url: PropTypes.string.isRequired,
  }),
};
