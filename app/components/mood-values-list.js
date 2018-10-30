import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleAddMood } from '../actions/mood';
import { moodOptions } from '../tracker-options.config.js';
import { Breadcrumbs } from './breadcrumbs';
import TextOptions from './text-options';

class MoodValuesList extends Component {
  constructor(props) {
    super(props);

    this.state = { optionSelectedID: null };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(optionID, catID) {
    const { dispatch } = this.props;

    return function(event) {
      event.preventDefault();
      dispatch(handleAddMood(catID, optionID));

      this.setState(() => ({
        optionSelectedID: optionID,
      }));
    }.bind(this);
  }

  render() {
    const { optionSelectedID } = this.state;
    const { match } = this.props;
    const { categoryID } = match.params;
    const categoryData = moodOptions.find(({ id }) => id === categoryID);
    const { options: moodSubOptions } = categoryData;

    return (
      <>
        <Breadcrumbs />
        <TextOptions
          list={moodSubOptions}
          {...this.props}
          catID={categoryID}
          selectItem={this.handleSelect}
          optionSelectedID={optionSelectedID}
        />
      </>
    );
  }
}

MoodValuesList.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default connect()(MoodValuesList);
