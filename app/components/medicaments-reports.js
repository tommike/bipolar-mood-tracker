import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import PrevNextMonth from './prev-next-month';
import HistoryDataMedicaments from './history-data-medicaments';
import { getReportsDates } from '../utils/reports';
import { Breadcrumbs } from './breadcrumbs';
import { handleSyncMedicaments } from '../actions/medicaments';
import { getMedicamentsData } from '../selectors/medicaments';

class MedicamentsReports extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleSyncMedicaments());
  }

  render() {
    const { showDateRange, medicamentData, match } = this.props;

    return (
      <>
        <Helmet>
          <title>Medicaments reports - {showDateRange}</title>
        </Helmet>
        <Breadcrumbs />
        <h1 className="page__title">Medicaments reports - {showDateRange}</h1>

        <PrevNextMonth showDateRange={showDateRange} currentURL={match.url} />
        <HistoryDataMedicaments data={medicamentData} showDateRange={showDateRange} />
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  const searchValues = queryString.parse(props.location.search);
  const { showDateRange } = getReportsDates(searchValues.showDateRange);

  return {
    medicamentData: getMedicamentsData(state, props),
    showDateRange,
  };
};

MedicamentsReports.propTypes = {
  showDateRange: PropTypes.string.isRequired,
  medicamentData: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(MedicamentsReports);
