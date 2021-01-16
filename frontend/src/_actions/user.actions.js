import { toast } from 'react-toastify';
import { userConstants } from '../_constants/user.constants';
import { userServices } from '../_services/user.services';

export const userActions = {
  getUsersList,
  postUser,
  deleteUser,
  getUser,
  putUser,
  patchUser,
  clearUser
};

function getUser(id) {
  return dispatch => {
    dispatch(request());

    userServices.getUser(id).then(
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
    return { type: userConstants.GET_USER_REQUEST };
  }
  function success(results) {
    return { type: userConstants.GET_USER_SUCCESS, results };
  }
  function failure(error) {
    return { type: userConstants.GET_USER_FAILURE, error };
  }
}

function putUser(id, user) {
  return dispatch => {
    dispatch(request());

    userServices.putUser(id, user).then(
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
    return { type: userConstants.PUT_USER_REQUEST };
  }
  function success(results) {
    return { type: userConstants.PUT_USER_SUCCESS, results };
  }
  function failure(error) {
    return { type: userConstants.PUT_USER_FAILURE, error };
  }
}

function patchUser(id, user) {
  return dispatch => {
    dispatch(request());

    userServices.patchUser(id, user).then(
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
    return { type: userConstants.PUT_USER_REQUEST };
  }
  function success(results) {
    return { type: userConstants.PUT_USER_SUCCESS, results };
  }
  function failure(error) {
    return { type: userConstants.PUT_USER_FAILURE, error };
  }
}

function postUser(user) {
  return dispatch => {
    dispatch(request());

    userServices.postUser(user).then(
      response => {
        toast.success('Fuente creada satisfactoriamente');
        dispatch(success(response.data));
      },
      error => {
        if (error === 'A user with that name already exists.') {
          toast.error('Ya existe otra Fuente con ese nombre de Fuente.');
        } else {
          toast.error('Error creando el Fuente ');
        }
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: userConstants.POST_USER_REQUEST };
  }
  function success(results) {
    return { type: userConstants.POST_USER_SUCCESS, results };
  }
  function failure(error) {
    return { type: userConstants.POST_USER_FAILURE, error };
  }
}

function getUsersList(page, pagination = true) {
  return dispatch => {
    dispatch(request());

    userServices.getUsersList(page, pagination).then(
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
    return { type: userConstants.GET_USERS_REQUEST };
  }
  function success(results, usersCounter) {
    return {
      type: userConstants.GET_USERS_SUCCESS,
      results,
      usersCounter
    };
  }
  function failure(error) {
    return { type: userConstants.GET_USERS_FAILURE, error };
  }
}

function deleteUser(userId) {
  return dispatch => {
    dispatch(request());

    userServices.deleteUser(userId).then(
      response => {
        toast.success('Fuente eliminado satisfactoriamente');
        dispatch(success(userId));
      },
      error => {
        toast.error('Error al eliminar');
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: userConstants.DELETE_USER_REQUEST };
  }
  function success(id) {
    return { type: userConstants.DELETE_USER_SUCCESS, id };
  }
  function failure(error) {
    return { type: userConstants.DELETE_USER_FAILURE, error };
  }
}

function clearUser() {
  return dispatch => {
    dispatch(request());
  };

  function request() {
    return { type: userConstants.CLEAR_USER };
  }
}
