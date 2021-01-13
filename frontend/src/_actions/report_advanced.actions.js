import { toast } from 'react-toastify';
import { report_advancedConstants } from '../_constants/report_advanced.constants';
import { reportServices } from '../_services/report_advanced.services';

export const report_advancedActions = {
  getReportsList,
  postReport,
  deleteReport,
  getReport,
  putReport,
  clearReport
};

function getReport(id) {
  return dispatch => {
    dispatch(request());

    reportServices.getReport(id).then(
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
    return { type: report_advancedConstants.GET_REPORT_REQUEST };
  }
  function success(results) {
    return { type: report_advancedConstants.GET_REPORT_SUCCESS, results };
  }
  function failure(error) {
    return { type: report_advancedConstants.GET_REPORT_FAILURE, error };
  }
}

function putReport(id, report) {
  return dispatch => {
    dispatch(request());

    reportServices.putReport(id, report).then(
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
    return { type: report_advancedConstants.PUT_REPORT_REQUEST };
  }
  function success(results) {
    return { type: report_advancedConstants.PUT_REPORT_SUCCESS, results };
  }
  function failure(error) {
    return { type: report_advancedConstants.PUT_REPORT_FAILURE, error };
  }
}

function postReport(report) {
  return dispatch => {
    dispatch(request());

    reportServices.postReport(report).then(
      response => {
        toast.success('Fuente creada satisfactoriamente');
        dispatch(success(response.data));
      },
      error => {
        if (error === 'A report with that name already exists.') {
          toast.error('Ya existe otra Fuente con ese nombre de Fuente.');
        } else {
          toast.error('Error creando el Fuente ');
        }
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: report_advancedConstants.POST_REPORT_REQUEST };
  }
  function success(results) {
    return { type: report_advancedConstants.POST_REPORT_SUCCESS, results };
  }
  function failure(error) {
    return { type: report_advancedConstants.POST_REPORT_FAILURE, error };
  }
}

function getReportsList(page, pagination = true) {
  return dispatch => {
    dispatch(request());

    reportServices.getReportsList(page, pagination).then(
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
    return { type: report_advancedConstants.GET_REPORTS_REQUEST };
  }
  function success(results, reportsCounter) {
    return {
      type: report_advancedConstants.GET_REPORTS_SUCCESS,
      results,
      reportsCounter
    };
  }
  function failure(error) {
    return { type: report_advancedConstants.GET_REPORTS_FAILURE, error };
  }
}

function deleteReport(reportId) {
  return dispatch => {
    dispatch(request());

    reportServices.deleteReport(reportId).then(
      response => {
        toast.success('Fuente eliminado satisfactoriamente');
        dispatch(success(reportId));
      },
      error => {
        toast.error('Error al eliminar');
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: report_advancedConstants.DELETE_REPORT_REQUEST };
  }
  function success(id) {
    return { type: report_advancedConstants.DELETE_REPORT_SUCCESS, id };
  }
  function failure(error) {
    return { type: report_advancedConstants.DELETE_REPORT_FAILURE, error };
  }
}

function clearReport() {
  return dispatch => {
    dispatch(request());
  };

  function request() {
    return { type: report_advancedConstants.CLEAR_REPORT };
  }
}
