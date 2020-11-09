import { toast } from 'react-toastify';
import { entryConstants } from '../_constants/entry.constants';
import { entryServices } from '../_services/entry.services';

export const entryActions = {
  getEntriesList,
  postEntry,
  deleteEntry,
  getEntry,
  putEntry,
  clearEntry
};

function getEntry(id) {
  return dispatch => {
    dispatch(request());

    entryServices.getEntry(id).then(
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
    return { type: entryConstants.GET_ENTRY_REQUEST };
  }
  function success(results) {
    return { type: entryConstants.GET_ENTRY_SUCCESS, results };
  }
  function failure(error) {
    return { type: entryConstants.GET_ENTRY_FAILURE, error };
  }
}

function putEntry(id, entry) {
  return dispatch => {
    dispatch(request());

    entryServices.putEntry(id, entry).then(
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
    return { type: entryConstants.PUT_ENTRY_REQUEST };
  }
  function success(results) {
    return { type: entryConstants.PUT_ENTRY_SUCCESS, results };
  }
  function failure(error) {
    return { type: entryConstants.PUT_ENTRY_FAILURE, error };
  }
}

function postEntry(entry) {
  return dispatch => {
    dispatch(request());

    entryServices.postEntry(entry).then(
      response => {
        toast.success('Fuente creada satisfactoriamente');
        dispatch(success(response.data));
      },
      error => {
        if (error === 'A entry with that name already exists.') {
          toast.error('Ya existe otra Fuente con ese nombre de Fuente.');
        } else {
          toast.error('Error creando el Fuente ');
        }
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: entryConstants.POST_ENTRY_REQUEST };
  }
  function success(results) {
    return { type: entryConstants.POST_ENTRY_SUCCESS, results };
  }
  function failure(error) {
    return { type: entryConstants.POST_ENTRY_FAILURE, error };
  }
}

function getEntriesList(page, pagination = true) {
  return dispatch => {
    dispatch(request());
    entryServices.getEntriesList(page, pagination).then(
      response => {
        if (response && response.status === 200)
          if (pagination === true){
            dispatch(success(response.data.results, response.data.count));
          }
          else dispatch(success(response.data, -1));
      },
      error => dispatch(failure(error))
    );
  };

  function request() {
    return { type: entryConstants.GET_ENTRIES_REQUEST };
  }
  function success(results, entriesCounter) {
    return {
      type: entryConstants.GET_ENTRIES_SUCCESS,
      results,
      entriesCounter
    };
  }
  function failure(error) {
    return { type: entryConstants.GET_ENTRIES_FAILURE, error };
  }
}

function deleteEntry(entryId) {
  return dispatch => {
    dispatch(request());

    entryServices.deleteEntry(entryId).then(
      response => {
        toast.success('Fuente eliminado satisfactoriamente');
        dispatch(success(entryId));
      },
      error => {
        toast.error('Error al eliminar');
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: entryConstants.DELETE_ENTRY_REQUEST };
  }
  function success(id) {
    return { type: entryConstants.DELETE_ENTRY_SUCCESS, id };
  }
  function failure(error) {
    return { type: entryConstants.DELETE_ENTRY_FAILURE, error };
  }
}

function clearEntry() {
  return dispatch => {
    dispatch(request());
  };

  function request() {
    return { type: entryConstants.CLEAR_ENTRY };
  }
}
