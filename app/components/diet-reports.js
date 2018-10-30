import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';
import PrevNextMonth from './prev-next-month';
import ChartEating from './chart-eating';
import ChartWeight from './chart-weight';
import HistoryDataHabits from './history-data-habits';
import { getReportsDates } from '../utils/reports';
import { Breadcrumbs } from './breadcrumbs';
import { getHabitsGroupedByCat, getWeightData, getEatingData } from '../selectors/diet';
import { handleSyncHabit, handleSyncEating, handleSyncWeight } from '../actions/diet';

class DietReports extends Component {
  constructor(props) {
    super(props);

    this.state = { activeTab: 0 };
    this.tabHandler = this.tabHandler.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    const allButtons = document.querySelectorAll('.tabs__button');
    allButtons.forEach(button => button.addEventListener('click', this.tabHandler));

    dispatch(handleSyncHabit());
    dispatch(handleSyncEating());
    dispatch(handleSyncWeight());
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

    const { eatingData, weightData, showDateRange, habitsGroupedByCat, match } = this.props;

    return (
      <>
        <Helmet>
          <title>Diet reports - {showDateRange}</title>
        </Helmet>
        <Breadcrumbs />
        <h1 className="page__title">Diet reports - {showDateRange}</h1>

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
                Eating
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
                Weight
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
                Habits
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
              <h2 className="page__section-title">Apetite</h2>
              <ChartEating data={eatingData} showDateRange={showDateRange} />
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
              <h2 className="page__section-title">Weight</h2>
              <ChartWeight data={weightData} showDateRange={showDateRange} />
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
              <h2 className="page__section-title">Habits</h2>

              <HistoryDataHabits data={habitsGroupedByCat} showDateRange={showDateRange} />
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
    weightData: getWeightData(state, props),
    habitsGroupedByCat: getHabitsGroupedByCat(state, props),
    eatingData: getEatingData(state, props),
    showDateRange,
  };
};

DietReports.propTypes = {
  eatingData: PropTypes.array.isRequired,
  weightData: PropTypes.array.isRequired,
  habitsGroupedByCat: PropTypes.object.isRequired,
  showDateRange: PropTypes.string.isRequired,

  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(DietReports);
