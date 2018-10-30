import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import PrevNextMonth from './prev-next-month';
import HistoryDataSelfCare from './history-data-self-care';
import { getReportsDates } from '../utils/reports';
import { Breadcrumbs } from './breadcrumbs';
import { handleSyncSelfCare } from '../actions/self-care';
import { getSelfCareData } from '../selectors/self-care';

class SelfCareReports extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleSyncSelfCare());
  }

  render() {
    const { showDateRange, match, selfCareData } = this.props;

    return (
      <>
        <Helmet>
          <title>Self Care reports - {showDateRange}</title>
        </Helmet>
        <Breadcrumbs />
        <h1 className="page__title">Self Care reports - {showDateRange}</h1>

        <PrevNextMonth showDateRange={showDateRange} currentURL={match.url} />

        <HistoryDataSelfCare data={selfCareData} showDateRange={showDateRange} />
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  const searchValues = queryString.parse(props.location.search);
  const { showDateRange } = getReportsDates(searchValues.showDateRange);

  return {
    selfCareData: getSelfCareData(state, props),
    showDateRange,
  };
};

SelfCareReports.propTypes = {
  selfCareData: PropTypes.array.isRequired,
  showDateRange: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(SelfCareReports);
