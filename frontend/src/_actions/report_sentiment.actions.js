import { toast } from 'react-toastify';
import { report_sentimentConstants } from '../_constants/report_sentiment.constants';
import { report_sentimentServices } from '../_services/report_sentiment.services';

export const report_sentimentActions = {
  getReportSentimentsList,
  postReportSentiment,
  deleteReportSentiment,
  getReportSentiment,
  putReportSentiment,
  clearReportSentiment,
  getReportSentimentData,
  patchReportSentiment
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
    return {
      type: report_sentimentConstants.GET_REPORT_SENTIMENT_SUCCESS,
      results
    };
  }
  function failure(error) {
    return {
      type: report_sentimentConstants.GET_REPORT_SENTIMENT_FAILURE,
      error
    };
  }
}

function putReportSentiment(id, report_sentiment) {
  return dispatch => {
    dispatch(request());

    report_sentimentServices.putReportSentiment(id, report_sentiment).then(
      response => {
        toast.success('Reporte editado satisfactoriamente');
        dispatch(success(response.data));
      },
      error => {
        toast.error('Error editando el Reporte ');
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: report_sentimentConstants.PUT_REPORT_SENTIMENT_REQUEST };
  }
  function success(results) {
    return {
      type: report_sentimentConstants.PUT_REPORT_SENTIMENT_SUCCESS,
      results
    };
  }
  function failure(error) {
    return {
      type: report_sentimentConstants.PUT_REPORT_SENTIMENT_FAILURE,
      error
    };
  }
}

function patchReportSentiment(id, report_sentiment) {
  return dispatch => {
    dispatch(request());

    report_sentimentServices.patchReportSentiment(id, report_sentiment).then(
      response => {
        toast.success('Reporte editado satisfactoriamente');
        dispatch(success(response.data));
      },
      error => {
        toast.error('Error editando el Reporte ');
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: report_sentimentConstants.PATCH_REPORT_SENTIMENT_REQUEST };
  }
  function success(results) {
    return {
      type: report_sentimentConstants.PATCH_REPORT_SENTIMENT_SUCCESS,
      results
    };
  }
  function failure(error) {
    return {
      type: report_sentimentConstants.PATCH_REPORT_SENTIMENT_FAILURE,
      error
    };
  }
}

function postReportSentiment(report_sentiment) {
  return dispatch => {
    dispatch(request());

    report_sentimentServices.postReportSentiment(report_sentiment).then(
      response => {
        toast.success('Reporte creado satisfactoriamente');
        dispatch(success(response.data));
      },
      error => {
        toast.error('Error creando el Reporte ');
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: report_sentimentConstants.POST_REPORT_SENTIMENT_REQUEST };
  }
  function success(results) {
    return {
      type: report_sentimentConstants.POST_REPORT_SENTIMENT_SUCCESS,
      results
    };
  }
  function failure(error) {
    return {
      type: report_sentimentConstants.POST_REPORT_SENTIMENT_FAILURE,
      error
    };
  }
}

function getReportSentimentsList(
  page,
  pagination = true,
  inverse_order = false,
  favorite = null
) {
  return dispatch => {
    dispatch(request());

    report_sentimentServices
      .getReportSentimentsList(page, pagination, inverse_order, favorite)
      .then(
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
    return {
      type: report_sentimentConstants.GET_REPORT_SENTIMENTS_FAILURE,
      error
    };
  }
}

function deleteReportSentiment(report_sentimentId) {
  return dispatch => {
    dispatch(request());

    report_sentimentServices.deleteReportSentiment(report_sentimentId).then(
      response => {
        toast.success('Reporte eliminado satisfactoriamente');
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
    return {
      type: report_sentimentConstants.DELETE_REPORT_SENTIMENT_SUCCESS,
      id
    };
  }
  function failure(error) {
    return {
      type: report_sentimentConstants.DELETE_REPORT_SENTIMENT_FAILURE,
      error
    };
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

function getReportSentimentData(ids) {
  return dispatch => {
    dispatch(request());
    report_sentimentServices.getReportSentimentData(ids).then(
      response => {
        dispatch(success(response));
      },
      error => dispatch(failure(error))
    );
  };

  function request() {
    return {
      type: report_sentimentConstants.GET_REPORT_SENTIMENTS_DATA_REQUEST
    };
  }
  function success(results) {
    return {
      type: report_sentimentConstants.GET_REPORT_SENTIMENTS_DATA_SUCCESS,
      results
    };
  }
  function failure(error) {
    return {
      type: report_sentimentConstants.GET_REPORT_SENTIMENTS_DATA_FAILURE,
      error
    };
  }
}
