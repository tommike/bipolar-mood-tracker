import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const CategoryList = ({ list, match, title }) => (
  <>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <h1 className="page__title">{title}</h1>
    <ul className="category-list">
      {list.map(({ id, label, search, state, key }) => {
        const toObj = { pathname: `${match.url}/${id}` };

        if (search) {
          toObj.search = search;
        }

        if (state) {
          toObj.state = state;
        }

        return (
          <li key={key || id} className="category-list__item">
            <Link to={toObj} className="category-list__link">
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  </>
);

CategoryList.propTypes = {
  list: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default CategoryList;
