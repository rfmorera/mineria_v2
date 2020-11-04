import { toast } from 'react-toastify';
import { sourceConstants } from '../_constants/source.constants';
import { sourceServices } from '../_services/source.services';

export const sourceActions = {
  getSourcesList,
  postSource,
  deleteSource,
  getSource,
  putSource,
  clearSource
};

function getSource(id) {
  return dispatch => {
    dispatch(request());

    sourceServices.getSource(id).then(
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
    return { type: sourceConstants.GET_SOURCE_REQUEST };
  }
  function success(results) {
    return { type: sourceConstants.GET_SOURCE_SUCCESS, results };
  }
  function failure(error) {
    return { type: sourceConstants.GET_SOURCE_FAILURE, error };
  }
}

function putSource(id, source) {
  return dispatch => {
    dispatch(request());

    sourceServices.putSource(id, source).then(
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
    return { type: sourceConstants.PUT_SOURCE_REQUEST };
  }
  function success(results) {
    return { type: sourceConstants.PUT_SOURCE_SUCCESS, results };
  }
  function failure(error) {
    return { type: sourceConstants.PUT_SOURCE_FAILURE, error };
  }
}

function postSource(source) {
  return dispatch => {
    dispatch(request());

    sourceServices.postSource(source).then(
      response => {
        toast.success('Fuente creada satisfactoriamente');
        dispatch(success(response.data));
      },
      error => {
        console.log(error);
        if (error === 'A source with that name already exists.') {
          toast.error('Ya existe otra Fuente con ese nombre de Fuente.');
        } else {
          toast.error('Error creando el Fuente ');
        }
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: sourceConstants.POST_SOURCE_REQUEST };
  }
  function success(results) {
    return { type: sourceConstants.POST_SOURCE_SUCCESS, results };
  }
  function failure(error) {
    return { type: sourceConstants.POST_SOURCE_FAILURE, error };
  }
}

function getSourcesList(page, pagination = true) {
  console.log('getSourcesList');
  return dispatch => {
    dispatch(request());

    sourceServices.getSourcesList(page, pagination).then(
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
    return { type: sourceConstants.GET_SOURCES_REQUEST };
  }
  function success(results, sourcesCounter) {
    return {
      type: sourceConstants.GET_SOURCES_SUCCESS,
      results,
      sourcesCounter
    };
  }
  function failure(error) {
    return { type: sourceConstants.GET_SOURCES_FAILURE, error };
  }
}

function deleteSource(sourceId) {
  return dispatch => {
    dispatch(request());

    sourceServices.deleteSource(sourceId).then(
      response => {
        toast.success('Fuente eliminado satisfactoriamente');
        dispatch(success(sourceId));
      },
      error => {
        toast.error('Error al eliminar');
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: sourceConstants.DELETE_SOURCE_REQUEST };
  }
  function success(id) {
    return { type: sourceConstants.DELETE_SOURCE_SUCCESS, id };
  }
  function failure(error) {
    return { type: sourceConstants.DELETE_SOURCE_FAILURE, error };
  }
}

function clearSource() {
  return dispatch => {
    dispatch(request());
  };

  function request() {
    return { type: sourceConstants.CLEAR_SOURCE };
  }
}
