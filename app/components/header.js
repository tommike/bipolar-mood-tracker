import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import metaData from '../meta-data.config.js';
import Nav from './nav';
import TimeToInterveneWarningConnected from './time-to-intervene-warning';

class Header extends Component {
  render() {
    const { authUser } = this.props;
    const headerURL = authUser ? '/dashboard' : '/';

    return (
      <>
        <header className="header">
          <div className="header__logo">
            <Link to={headerURL} title={metaData.title} rel="home" className="header__title">
              {metaData.title}
            </Link>
          </div>
          <Nav />
        </header>
        {authUser && <TimeToInterveneWarningConnected />}
      </>
    );
  }
}

Header.propTypes = {
  authUser: PropTypes.object,
};

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
});
export default connect(mapStateToProps)(Header);
