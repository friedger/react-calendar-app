/* eslint react/prefer-stateless-function: "off" */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import cn from 'classnames';
import moment from 'moment';
import _ from 'lodash';
// actions
import {fetchAllEvents, updateEvent} from 'actions/Event';
// components
import TopNav from 'components/Base/TopNav';
import injectTapEventPlugin from './InjectTapEventPlugin';
// other
import * as notifications from 'helpers/Notification';
import styles from './App.css';

require('bootstrap/dist/css/bootstrap.css');
require('styles/global-styles.css');

class App extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    events: PropTypes.array,
    fetchAllEvents: PropTypes.func.isRequired,
    updateEvent: PropTypes.func.isRequired,
  };
  monitorEventsInterval = null;

  componentWillMount() {
    notifications.requestPermission();
    injectTapEventPlugin();

    // fetch events for current day to use them for remainter
    this.props.fetchAllEvents({startDay: moment().format('YYYY-MM-DD')});
    // start events monitoring
    this.monitorEventsInterval = setInterval(this.monitorEvents, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.monitorEventsInterval);
  }

  /**
  * monitors this.props.events and shows browser notification
  */
  monitorEvents = () => {
    _.each(this.props.events, (event) => {
      const startDate = moment(event.start).toDate();
      const endDate = moment(event.end).toDate();
      const nowDate = moment().toDate();

      if (!event.isUserNotified && (startDate <= nowDate) && (nowDate < endDate)) {
        notifications.show('Event reminder', event.title);
        this.props.updateEvent({...event, isUserNotified: true});
      }
    });
  }

  render() {
    return (
      <div>
        <TopNav />
        <div className={cn('container', styles.container)}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

function select(state) {
  return {
    // we are loading only this-day-events in componentWillMount, but the store may contain more events
    // (e.g if the calendar page is opened). So filter events from the store to watch only this day events
    events: _.filter(state.entities.events, {startDay: moment().format('YYYY-MM-DD')}),
  };
}

export default connect(select, {
  fetchAllEvents,
  updateEvent,
})(App);
