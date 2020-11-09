import { toast } from 'react-toastify';
import { report_sentimentConstants } from '../_constants/report_sentiment.constants';
import { report_sentimentServices } from '../_services/report_sentiment.services';

export const report_sentimentActions = {
  getReportSentimentsList,
  postReportSentiment,
  deleteReportSentiment,
  getReportSentiment,
  putReportSentiment,
  clearReportSentiment
};

function getReportSentiment(id) {
  return dispatch => {
    dispatch(request());

    report_sentimentServices.getReportSentiment(id).then(
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
    return { type: report_sentimentConstants.GET_REPORT_SENTIMENT_REQUEST };
  }
  function success(results) {
    return { type: report_sentimentConstants.GET_REPORT_SENTIMENT_SUCCESS, results };
  }
  function failure(error) {
    return { type: report_sentimentConstants.GET_REPORT_SENTIMENT_FAILURE, error };
  }
}

function putReportSentiment(id, report_sentiment) {
  return dispatch => {
    dispatch(request());

    report_sentimentServices.putReportSentiment(id, report_sentiment).then(
      response => {
        toast.success('Fuente editada satisfactoriamente');
        dispatch(success(response.data));
      },
      error => {
        toast.error('Error editando el Fuente ');
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: report_sentimentConstants.PUT_REPORT_SENTIMENT_REQUEST };
  }
  function success(results) {
    return { type: report_sentimentConstants.PUT_REPORT_SENTIMENT_SUCCESS, results };
  }
  function failure(error) {
    return { type: report_sentimentConstants.PUT_REPORT_SENTIMENT_FAILURE, error };
  }
}

function postReportSentiment(report_sentiment) {
  return dispatch => {
    dispatch(request());

    report_sentimentServices.postReportSentiment(report_sentiment).then(
      response => {
        toast.success('Fuente creada satisfactoriamente');
        dispatch(success(response.data));
      },
      error => {
        if (error === 'A report_sentiment with that name already exists.') {
          toast.error('Ya existe otra Fuente con ese nombre de Fuente.');
        } else {
          toast.error('Error creando el Fuente ');
        }
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: report_sentimentConstants.POST_REPORT_SENTIMENT_REQUEST };
  }
  function success(results) {
    return { type: report_sentimentConstants.POST_REPORT_SENTIMENT_SUCCESS, results };
  }
  function failure(error) {
    return { type: report_sentimentConstants.POST_REPORT_SENTIMENT_FAILURE, error };
  }
}

function getReportSentimentsList(page, pagination = true) {
  return dispatch => {
    dispatch(request());

    report_sentimentServices.getReportSentimentsList(page, pagination).then(
      response => {
        if (response && response.status === 200)
          if (pagination === true)
            dispatch(success(response.data.results, response.data.count));
          else dispatch(success(response.data, -1));
      },
      error => dispatch(failure(error))
    );
  };

  function request() {
    return { type: report_sentimentConstants.GET_REPORT_SENTIMENTS_REQUEST };
  }
  function success(results, report_sentimentsCounter) {
    return {
      type: report_sentimentConstants.GET_REPORT_SENTIMENTS_SUCCESS,
      results,
      report_sentimentsCounter
    };
  }
  function failure(error) {
    return { type: report_sentimentConstants.GET_REPORT_SENTIMENTS_FAILURE, error };
  }
}

function deleteReportSentiment(report_sentimentId) {
  return dispatch => {
    dispatch(request());

    report_sentimentServices.deleteReportSentiment(report_sentimentId).then(
      response => {
        toast.success('Fuente eliminado satisfactoriamente');
        dispatch(success(report_sentimentId));
      },
      error => {
        toast.error('Error al eliminar');
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: report_sentimentConstants.DELETE_REPORT_SENTIMENT_REQUEST };
  }
  function success(id) {
    return { type: report_sentimentConstants.DELETE_REPORT_SENTIMENT_SUCCESS, id };
  }
  function failure(error) {
    return { type: report_sentimentConstants.DELETE_REPORT_SENTIMENT_FAILURE, error };
  }
}

function clearReportSentiment() {
  return dispatch => {
    dispatch(request());
  };

  function request() {
    return { type: report_sentimentConstants.CLEAR_REPORT_SENTIMENT };
  }
}
