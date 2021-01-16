import { toast } from 'react-toastify';
import { groupConstants } from '../_constants/group.constants';
import { groupServices } from '../_services/group.services';

export const groupActions = {
  getGroupsList,
  postGroup,
  deleteGroup,
  getGroup,
  putGroup,
  patchGroup,
  clearGroup
};

function getGroup(id) {
  return dispatch => {
    dispatch(request());

    groupServices.getGroup(id).then(
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
    return { type: groupConstants.GET_GROUP_REQUEST };
  }
  function success(results) {
    return { type: groupConstants.GET_GROUP_SUCCESS, results };
  }
  function failure(error) {
    return { type: groupConstants.GET_GROUP_FAILURE, error };
  }
}

function putGroup(id, group) {
  return dispatch => {
    dispatch(request());

    groupServices.putGroup(id, group).then(
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
    return { type: groupConstants.PUT_GROUP_REQUEST };
  }
  function success(results) {
    return { type: groupConstants.PUT_GROUP_SUCCESS, results };
  }
  function failure(error) {
    return { type: groupConstants.PUT_GROUP_FAILURE, error };
  }
}

function patchGroup(id, group) {
  return dispatch => {
    dispatch(request());

    groupServices.patchGroup(id, group).then(
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
    return { type: groupConstants.PUT_GROUP_REQUEST };
  }
  function success(results) {
    return { type: groupConstants.PUT_GROUP_SUCCESS, results };
  }
  function failure(error) {
    return { type: groupConstants.PUT_GROUP_FAILURE, error };
  }
}

function postGroup(group) {
  return dispatch => {
    dispatch(request());

    groupServices.postGroup(group).then(
      response => {
        toast.success('Fuente creada satisfactoriamente');
        dispatch(success(response.data));
      },
      error => {
        if (error === 'A group with that name already exists.') {
          toast.error('Ya existe otra Fuente con ese nombre de Fuente.');
        } else {
          toast.error('Error creando el Fuente ');
        }
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: groupConstants.POST_GROUP_REQUEST };
  }
  function success(results) {
    return { type: groupConstants.POST_GROUP_SUCCESS, results };
  }
  function failure(error) {
    return { type: groupConstants.POST_GROUP_FAILURE, error };
  }
}

function getGroupsList(page, pagination = true) {
  return dispatch => {
    dispatch(request());

    groupServices.getGroupsList(page, pagination).then(
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
    return { type: groupConstants.GET_GROUPS_REQUEST };
  }
  function success(results, groupsCounter) {
    return {
      type: groupConstants.GET_GROUPS_SUCCESS,
      results,
      groupsCounter
    };
  }
  function failure(error) {
    return { type: groupConstants.GET_GROUPS_FAILURE, error };
  }
}

function deleteGroup(groupId) {
  return dispatch => {
    dispatch(request());

    groupServices.deleteGroup(groupId).then(
      response => {
        toast.success('Fuente eliminado satisfactoriamente');
        dispatch(success(groupId));
      },
      error => {
        toast.error('Error al eliminar');
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: groupConstants.DELETE_GROUP_REQUEST };
  }
  function success(id) {
    return { type: groupConstants.DELETE_GROUP_SUCCESS, id };
  }
  function failure(error) {
    return { type: groupConstants.DELETE_GROUP_FAILURE, error };
  }
}

function clearGroup() {
  return dispatch => {
    dispatch(request());
  };

  function request() {
    return { type: groupConstants.CLEAR_GROUP };
  }
}
