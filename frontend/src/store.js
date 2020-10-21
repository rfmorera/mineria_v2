import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './_reducers';

// import { createStore, applyMiddleware, compose } from 'redux'
// import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk';
// import * as History from 'history'
// import rootReducer from './_reducers'

// export const history = History.createBrowserHistory()

const initialState = {};
const enhancers = [];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

export const history = createBrowserHistory();
const middleware = [thunk, routerMiddleware(history)];

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(
  createRootReducer(history), // root reducer with router state
  initialState,
  composedEnhancers
);

export default store;

