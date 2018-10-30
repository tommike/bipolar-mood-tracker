import React, { Component } from 'react';
import moment from 'moment';

export default class CurrentTime extends Component {
  static getVisibilityCSSProp() {
    let visibilityChange;
    if (typeof document.hidden !== 'undefined') {
      visibilityChange = 'visibilitychange';
    } else if (typeof document.mozHidden !== 'undefined') {
      visibilityChange = 'mozvisibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
      visibilityChange = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
      visibilityChange = 'webkitvisibilitychange';
    } else {
      visibilityChange = 'visibilitychange';
    }

    return visibilityChange;
  }

  static getHiddenCSSProp() {
    let hidden;
    if (typeof document.hidden !== 'undefined') {
      hidden = 'hidden';
    } else if (typeof document.mozHidden !== 'undefined') {
      hidden = 'mozHidden';
    } else if (typeof document.msHidden !== 'undefined') {
      hidden = 'msHidden';
    } else if (typeof document.webkitHidden !== 'undefined') {
      hidden = 'webkitHidden';
    } else {
      hidden = 'hidden';
    }

    return hidden;
  }

  constructor(props) {
    super(props);

    this.state = {
      dateTime: moment().format(),
      displayTime: moment().format('MMM Do YYYY'),
      visibilityProp: CurrentTime.getVisibilityCSSProp(),
      visibilityHiddenProp: CurrentTime.getHiddenCSSProp(),
    };

    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
  }

  componentDidMount() {
    const { visibilityProp } = this.state;
    document.addEventListener(visibilityProp, this.handleVisibilityChange, false);
    this.handleVisibilityChange();
  }

  componentWillUnmount() {
    const { visibilityProp } = this.state;
    document.removeEventListener(visibilityProp, this.handleVisibilityChange);
  }

  handleVisibilityChange() {
    const { visibilityHiddenProp } = this.state;

    if (!document[visibilityHiddenProp]) {
      this.setState(() => ({
        dateTime: moment().format(),
        displayTime: moment().format('MMM Do YYYY'),
      }));
    }
  }

  render() {
    const { dateTime, displayTime } = this.state;
    return (
      <p className="date">
        <time dateTime={dateTime} className="date__datetime">
          {displayTime}
        </time>
      </p>
    );
  }
}
