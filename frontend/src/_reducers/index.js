import { auth } from './auth.reducers';
import { sources } from './source.reducers';
import { report_sentiments } from './report_sentiment.reducers';
import { report_advanced } from './report_advanced.reducers';
import { entries } from './entry.reducers';
import { entities } from './entity.reducers';
import { regions } from './region.reducers';
import { super_regions } from './super_region.reducers';
import { sentiment } from './sentiment.reducers';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    auth,
    sources,
    report_sentiments,
    report_advanced,
    entries,
    entities,
    regions,
    super_regions,
    sentiment
  });
export default createRootReducer;
