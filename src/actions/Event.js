import moment from 'moment';
import {createRequestTypes, action} from 'helpers/actions';

// TODO: must be actionTypes = {fetch: createRequestTypes('GET_USER')}
export const actionTypes = {
  create: createRequestTypes('EVENT/CREATE'),
  update: createRequestTypes('EVENT/UPDATE'),
  fetchAll: createRequestTypes('EVENT/FETCH_ALL'),
  remove: createRequestTypes('EVENT/REMOVE'),
};
export const CREATE_EVENT = '@EVENT/CREATE';
export const UPDATE_EVENT = '@EVENT/UPDATE';
export const REMOVE_EVENT = '@EVENT/REMOVE';
export const FETCH_ALL_EVENTS = '@EVENTS/FETCH_ALL';

export const actionCreators = {
  create: {
    request: () => action(actionTypes.create.REQUEST, {}),
    success: (id, response) => action(actionTypes.create.SUCCESS, {response}),
    failure: (id, error) => action(actionTypes.create.FAILURE, {error}),
  },
  update: {
    request: (id) => action(actionTypes.update.REQUEST, {id}),
    success: (id, response) => action(actionTypes.update.SUCCESS, {response}),
    failure: (id, error) => action(actionTypes.update.FAILURE, {error}),
  },
  fetchAll: {
    request: () => action(actionTypes.fetchAll.REQUEST, {}),
    success: (id, response) => action(actionTypes.fetchAll.SUCCESS, {response}),
    failure: (id, error) => action(actionTypes.fetchAll.FAILURE, {error}),
  },
  remove: {
    request: (id) => action(actionTypes.remove.REQUEST, {id}),
    success: (id, response) => action(actionTypes.remove.SUCCESS, {response}),
    failure: (id, error) => action(actionTypes.remove.FAILURE, {error}),
  },
};

export const createEvent = (data, redirectToCalendar = true) => {
  return action(CREATE_EVENT, {
    // according to the requirements, we don't have powerful API that will allow to search events by date using
    // the 'start' field (because it's contains both date and time), so we have to store the startDay field
    // that will allow to search events by day
    data: {...data, startDay: moment(data.start).format('YYYY-MM-DD')},
    redirectToCalendar,
  });
};

export const updateEvent = (data) => {
  return action(UPDATE_EVENT, {data});
};

export const fetchAllEvents = (query) => {
  return action(FETCH_ALL_EVENTS, {query});
};

export const removeEvent = (id) => {
  return action(REMOVE_EVENT, {id});
};
