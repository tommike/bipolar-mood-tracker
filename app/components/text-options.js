import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const TextOptions = props => {
  const { list, title, catID, optionSelectedID, selectItem } = props;

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <h1 className="page__title">{title}</h1>
      <ul className="category-list">
        {list.map(({ id, label, key }) => {
          const isItemSelected = optionSelectedID === id;
          const savedIconStatus = (
            <span className="category-list__saved">
              <span>saved</span> <FontAwesomeIcon icon="check-circle" color="#333" size="lg" />
            </span>
          );
          return (
            <li
              key={key || id}
              className={`category-list__item ${isItemSelected && 'category-list__item--selected'}`}
            >
              <button
                className="category-list__link"
                onClick={selectItem(`${id}`, `${catID}`)}
                type="button"
              >
                {label} {isItemSelected && savedIconStatus}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

TextOptions.propTypes = {
  list: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  optionSelectedID: PropTypes.string,
  catID: PropTypes.string,
  selectItem: PropTypes.func.isRequired,
};

TextOptions.defaultProps = {
  catID: null,
  optionSelectedID: null,
};

export default TextOptions;
