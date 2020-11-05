import { auth } from './auth.reducers';
import { sources } from './source.reducers';
import { entries } from './entry.reducers';

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    auth,
    sources,
    entries
  });
export default createRootReducer;
