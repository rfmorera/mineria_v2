import { sentimentConstants } from '../_constants/sentiment.constants';

const initialState = {
  loadingCounter: false,
  counter: [],
  counterErrorMessage: ''
};

export function sentiment(state = initialState, action) {
  switch (action.type) {
    // GET_COUNTER
    case sentimentConstants.GET_COUNTER_REQUEST:
      return {
        ...state,
        loadingCounter: true,
        counterErrorMessage: ''
      };
    case sentimentConstants.GET_COUNTER_SUCCESS:
      return {
        ...state,
        loadingCounter: false,
        counter: action.results
      };
    case sentimentConstants.GET_COUNTER_FAILURE:
      return {
        ...state,
        loadingCounter: false,
        counterErrorMessage: action.error
      };

    default:
      return state;
  }
}
