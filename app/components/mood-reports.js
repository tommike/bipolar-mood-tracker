import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import MoodChart from './mood-chart';
import PrevNextMonth from './prev-next-month';
import HistoryDataAches from './history-data-aches';
import { Breadcrumbs } from './breadcrumbs';
import { handleSyncMood } from '../actions/mood';
import { getMoodsGroupedByCat, getAchesData } from '../selectors/mood';
import { getReportsDates } from '../utils/reports';

class MoodReports extends Component {
  constructor(props) {
    super(props);

    this.state = { activeTab: 0 };
    this.tabHandler = this.tabHandler.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const allButtons = document.querySelectorAll('.tabs__button');
    allButtons.forEach(button => button.addEventListener('click', this.tabHandler));

    dispatch(handleSyncMood());
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

    const { showDateRange, match, moodsGroupedByCat, maxDaysInMonth, achesData } = this.props;

    return (
      <>
        <Helmet>
          <title>Mood reports - {showDateRange}</title>
        </Helmet>
        <Breadcrumbs />
        <h1 className="page__title">Mood reports - {showDateRange}</h1>

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
                Feelings
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
                Activity/Energy
              </button>
            </li>
            <li className={`tabs__tab ${activeTab === 2 ? 'tabs__tab--active' : ''}`}>
              <button
                className="tabs__button"
                role="tab"
                aria-controls="panel-3"
                aria-selected={activeTab === 2}
                type="button"
              >
                Thinking
              </button>
            </li>
            <li className={`tabs__tab ${activeTab === 3 ? 'tabs__tab--active' : ''}`}>
              <button
                className="tabs__button"
                role="tab"
                aria-controls="panel-4"
                aria-selected={activeTab === 3}
                type="button"
              >
                Aches
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
              <h2 className="page__section-title">Feelings</h2>
              <MoodChart
                items={moodsGroupedByCat.feelings}
                maxDaysInMonth={maxDaysInMonth}
                showDateRange={showDateRange}
              />
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
              <h2 className="page__section-title">Activity/Energy</h2>
              <MoodChart
                items={moodsGroupedByCat.activity}
                maxDaysInMonth={maxDaysInMonth}
                showDateRange={showDateRange}
              />
            </section>

            <section
              className={`tabs_content__section ${
                activeTab === 2 ? 'tabs_content__section--active' : ''
              }`}
              role="tabpanel"
              id="panel-3"
              aria-hidden={activeTab === 2}
              aria-labelledby="tab-3"
            >
              <h2 className="page__section-title">Thinking</h2>
              <MoodChart
                items={moodsGroupedByCat.thinking}
                maxDaysInMonth={maxDaysInMonth}
                showDateRange={showDateRange}
              />
            </section>

            <section
              className={`tabs_content__section ${
                activeTab === 3 ? 'tabs_content__section--active' : ''
              }`}
              role="tabpanel"
              id="panel-4"
              aria-hidden={activeTab === 3}
              aria-labelledby="tab-4"
            >
              <h2 className="page__section-title">Aches</h2>
              <HistoryDataAches data={achesData} showDateRange={showDateRange} />
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

  const maxDaysInMonth = parseInt(
    moment(showDateRange, 'M/YYYY')
      .endOf('month')
      .format('D')
  );

  return {
    moodsGroupedByCat: getMoodsGroupedByCat(state, props),
    achesData: getAchesData(state, props),
    showDateRange,
    maxDaysInMonth,
  };
};

MoodReports.propTypes = {
  moodsGroupedByCat: PropTypes.object.isRequired,
  achesData: PropTypes.array.isRequired,
  showDateRange: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  maxDaysInMonth: PropTypes.number.isRequired,
  dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(MoodReports);
