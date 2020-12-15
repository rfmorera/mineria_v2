import { toast } from 'react-toastify';
import { sentimentConstants } from '../_constants/sentiment.constants';
import { sentimentServices } from '../_services/sentiment.services';

export const sentimentActions = {
  getCounter
};

function getCounter(id) {
  return dispatch => {
    dispatch(request());

    sentimentServices.getCounter().then(
      response => {
        dispatch(success(response.data));
      },
      error => {
        toast.error(error);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: sentimentConstants.GET_COUNTER_REQUEST };
  }
  function success(results) {
    return { type: sentimentConstants.GET_COUNTER_SUCCESS, results };
  }
  function failure(error) {
    return { type: sentimentConstants.GET_COUNTER_FAILURE, error };
  }
}
