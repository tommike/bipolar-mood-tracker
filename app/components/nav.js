import React, { Component } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = { collapsed: true };
    this.handleToggleNav = this.handleToggleNav.bind(this);
  }

  handleToggleNav() {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed,
    }));
  }

  render() {
    const { collapsed } = this.state;
    const { authUser } = this.props;

    let username;
    if (authUser) {
      const { displayName, email } = authUser;
      username = displayName || email;
    }

    return (
      <div className={`header-nav ${collapsed ? 'mobile-menu-collapsed' : 'mobile-menu-expanded'}`}>
        <nav aria-label="navigation" className="header-nav__container">
          <button className="toggle-nav" onClick={this.handleToggleNav} type="button">
            <span className="toggle-nav__label">Menu</span>
            <span className="toggle-nav__line" />
            <span className="toggle-nav__line" />
            <span className="toggle-nav__line" />
            <span className="toggle-nav__line" />
          </button>

          <ul className="header-nav__list">
            {authUser && (
              <>
                <li className="header-nav__item">
                  <NavLink
                    className="header-nav__link"
                    activeClassName="header-nav__link--active"
                    to="/dashboard"
                    onClick={this.handleToggleNav}
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="header-nav__item">
                  <NavLink
                    className="header-nav__link"
                    activeClassName="header-nav__link--active"
                    to="/mood-tracker"
                    onClick={this.handleToggleNav}
                  >
                    Mood tracker
                  </NavLink>
                </li>
                <li className="header-nav__item">
                  <NavLink
                    className="header-nav__link"
                    activeClassName="header-nav__link--active"
                    to="/reports"
                    onClick={this.handleToggleNav}
                  >
                    Reports/Charts
                  </NavLink>
                </li>
              </>
            )}
            <li className="header-nav__item">
              <NavLink
                className="header-nav__link"
                activeClassName="header-nav__link--active"
                to="/about"
                onClick={this.handleToggleNav}
              >
                About Application
              </NavLink>
            </li>
            {authUser && (
              <li className="header-nav__item">
                <Link className="header-nav__link" to="/account">
                  My Account
                </Link>
              </li>
            )}
            {authUser && (
              <li className="header-nav__item">
                <Link className="header-nav__link" to="/logout">
                  ({username})<br /> Sign out
                </Link>
              </li>
            )}
            {!authUser && (
              <li className="header-nav__item">
                <NavLink
                  exact
                  className="header-nav__link"
                  activeClassName="header-nav__link--active"
                  to="/"
                  onClick={this.handleToggleNav}
                >
                  Sign in
                </NavLink>
              </li>
            )}
            {!authUser && (
              <li className="header-nav__item">
                <NavLink
                  exact
                  className="header-nav__link"
                  activeClassName="header-nav__link--active"
                  to="/sign-up"
                  onClick={this.handleToggleNav}
                >
                  Sign up
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    );
  }
}

Nav.propTypes = {
  authUser: PropTypes.object,
};

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
});
export default connect(mapStateToProps)(withRouter(Nav));
