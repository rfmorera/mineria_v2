import { toast } from 'react-toastify';
import { entityConstants } from '../_constants/entity.constants';
import { entityServices } from '../_services/entity.services';

export const entityActions = {
  getEntitiesList,
  postEntity,
  deleteEntity,
  getEntity,
  patchEntity,
  clearEntity
};

function getEntity(id) {
  return dispatch => {
    dispatch(request());

    entityServices.getEntity(id).then(
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
    return { type: entityConstants.GET_ENTITY_REQUEST };
  }
  function success(results) {
    return { type: entityConstants.GET_ENTITY_SUCCESS, results };
  }
  function failure(error) {
    return { type: entityConstants.GET_ENTITY_FAILURE, error };
  }
}

function patchEntity(id, entity) {
  return dispatch => {
    dispatch(request());

    entityServices.patchEntity(id, entity).then(
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
    return { type: entityConstants.PUT_ENTITY_REQUEST };
  }
  function success(results) {
    return { type: entityConstants.PUT_ENTITY_SUCCESS, results };
  }
  function failure(error) {
    return { type: entityConstants.PUT_ENTITY_FAILURE, error };
  }
}

function postEntity(entity) {
  return dispatch => {
    dispatch(request());

    entityServices.postEntity(entity).then(
      response => {
        toast.success('Fuente creada satisfactoriamente');
        dispatch(success(response.data));
      },
      error => {
        if (error === 'A entity with that name already exists.') {
          toast.error('Ya existe otra Fuente con ese nombre de Fuente.');
        } else {
          toast.error('Error creando el Fuente ');
        }
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: entityConstants.POST_ENTITY_REQUEST };
  }
  function success(results) {
    return { type: entityConstants.POST_ENTITY_SUCCESS, results };
  }
  function failure(error) {
    return { type: entityConstants.POST_ENTITY_FAILURE, error };
  }
}

function getEntitiesList(page, pagination = true) {
  return dispatch => {
    dispatch(request());
    entityServices.getEntitiesList(page, pagination).then(
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
    return { type: entityConstants.GET_ENTITIES_REQUEST };
  }
  function success(results, entitiesCounter) {
    return {
      type: entityConstants.GET_ENTITIES_SUCCESS,
      results,
      entitiesCounter
    };
  }
  function failure(error) {
    return { type: entityConstants.GET_ENTITIES_FAILURE, error };
  }
}

function deleteEntity(entityId) {
  return dispatch => {
    dispatch(request());

    entityServices.deleteEntity(entityId).then(
      response => {
        toast.success('Fuente eliminado satisfactoriamente');
        dispatch(success(entityId));
      },
      error => {
        toast.error('Error al eliminar');
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: entityConstants.DELETE_ENTITY_REQUEST };
  }
  function success(id) {
    return { type: entityConstants.DELETE_ENTITY_SUCCESS, id };
  }
  function failure(error) {
    return { type: entityConstants.DELETE_ENTITY_FAILURE, error };
  }
}

function clearEntity() {
  return dispatch => {
    dispatch(request());
  };

  function request() {
    return { type: entityConstants.CLEAR_ENTITY };
  }
}
