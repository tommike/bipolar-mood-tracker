import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { getReportsDates } from '../utils/reports';
import PrevNextMonth from './prev-next-month';
import HistoryDataSleep from './history-data-sleep';
import ChartSleepTime from './chart-sleep-time';
import { Breadcrumbs } from './breadcrumbs';
import { handleSyncSleepTime, handleSyncSleep } from '../actions/sleep';
import { getSleepData, getSleepTimeData } from '../selectors/sleep';

class SleepReports extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: 0 };
    this.tabHandler = this.tabHandler.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const allButtons = document.querySelectorAll('.tabs__button');
    allButtons.forEach(button => button.addEventListener('click', this.tabHandler));
    dispatch(handleSyncSleep());
    dispatch(handleSyncSleepTime());
  }

  componentWillUnmount() {
    const allButtons = document.querySelectorAll('.tabs__button');
    allButtons.forEach(button => button.removeEventListener('click', this.tabHandler));
  }

  tabHandler(event) {
    const parentTab = event.currentTarget.parentNode;
    if (parentTab.classList.contains('tabs__tab--active')) return;

    const listItems = document.querySelectorAll('.tabs__tab');
    const tabIndex = Array.from(listItems).indexOf(parentTab);

    this.setState(() => ({
      activeTab: tabIndex,
    }));
  }

  render() {
    const { activeTab } = this.state;
    const { match, sleepTimeData, sleepData, showDateRange } = this.props;

    return (
      <>
        <Helmet>
          <title>Sleep reports - {showDateRange}</title>
        </Helmet>
        <Breadcrumbs />
        <h1 className="page__title">Sleep reports - {showDateRange}</h1>

        <PrevNextMonth showDateRange={showDateRange} currentURL={match.url} />

        <div className="tabs">
          <ul className="tabs__nav" role="tablist">
            <li className={`tabs__tab ${activeTab === 0 ? 'tabs__tab--active' : ''}`}>
              <button
                className="tabs__button"
                role="tab"
                aria-controls="panel-1"
                aria-selected={activeTab === 0}
                type="button"
              >
                Graph
              </button>
            </li>
            <li className={`tabs__tab ${activeTab === 1 ? 'tabs__tab--active' : ''}`}>
              <button
                className="tabs__button"
                role="tab"
                aria-controls="panel-2"
                aria-selected={activeTab === 1}
                type="button"
              >
                Characteristics
              </button>
            </li>
          </ul>

          <div className="tabs_content">
            <section
              className={`tabs_content__section ${
                activeTab === 0 ? 'tabs_content__section--active' : ''
              }`}
              role="tabpanel"
              id="panel-1"
              aria-hidden={activeTab === 0}
              aria-labelledby="tab-1"
            >
              <h2 className="page__section-title">Sleep chart</h2>

              <ChartSleepTime data={sleepTimeData} showDateRange={showDateRange} />
            </section>

            <section
              className={`tabs_content__section ${
                activeTab === 1 ? 'tabs_content__section--active' : ''
              }`}
              role="tabpanel"
              id="panel-2"
              aria-hidden={activeTab === 1}
              aria-labelledby="tab-2"
            >
              <h2 className="page__section-title">Sleep characteristics</h2>

              <HistoryDataSleep data={sleepData} showDateRange={showDateRange} />
            </section>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  const searchValues = queryString.parse(props.location.search);
  const { showDateRange } = getReportsDates(searchValues.showDateRange);

  return {
    sleepData: getSleepData(state, props),
    sleepTimeData: getSleepTimeData(state, props),
    showDateRange,
  };
};

SleepReports.propTypes = {
  sleepTimeData: PropTypes.array.isRequired,
  sleepData: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  showDateRange: PropTypes.string.isRequired,
  dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(SleepReports);
