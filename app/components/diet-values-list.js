import React, { Component } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { dietOptions } from '../tracker-options.config.js';
import ConnectedWeightForm from './weight-form';
import { Breadcrumbs } from './breadcrumbs';
import TextOptions from './text-options';
import { handleAddEating, handleAddHabit } from '../actions/diet';

class DietValuesList extends Component {
  constructor(props) {
    super(props);

    this.state = { optionSelectedID: null };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(optionID) {
    return function(event) {
      event.preventDefault();
      const { match } = this.props;
      const { dispatch } = this.props;
      const { categoryID } = match.params;

      if (categoryID === 'eating') {
        dispatch(handleAddEating(optionID));
      } else if (categoryID === 'habits') {
        dispatch(handleAddHabit(optionID));
      }

      this.setState(() => ({
        optionSelectedID: optionID,
      }));
    }.bind(this);
  }

  render() {
    const { optionSelectedID } = this.state;
    const { match, location } = this.props;
    const { categoryID } = match.params;
    const categoryData = dietOptions.find(({ id }) => id === categoryID);
    const { options: dietSubOptions } = categoryData;
    const searchValues = queryString.parse(location.search);

    return (
      <>
        <Breadcrumbs />
        <TextOptions
          list={dietSubOptions}
          {...this.props}
          catID={categoryID}
          selectItem={this.handleSelect}
          optionSelectedID={optionSelectedID}
        />
        {searchValues.weight && <ConnectedWeightForm />}
      </>
    );
  }
}

DietValuesList.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default connect()(DietValuesList);
