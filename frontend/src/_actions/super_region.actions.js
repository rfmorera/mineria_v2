import { toast } from 'react-toastify';
import { super_regionConstants } from '../_constants/super_region.constants';
import { super_regionServices } from '../_services/super_region.services';

export const super_regionActions = {
  getSuperRegionsList,
  postSuperRegion,
  deleteSuperRegion,
  getSuperRegion,
  putSuperRegion,
  clearSuperRegion
};

function getSuperRegion(id) {
  return dispatch => {
    dispatch(request());

    super_regionServices.getSuperRegion(id).then(
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
    return { type: super_regionConstants.GET_SUPER_REGION_REQUEST };
  }
  function success(results) {
    return { type: super_regionConstants.GET_SUPER_REGION_SUCCESS, results };
  }
  function failure(error) {
    return { type: super_regionConstants.GET_SUPER_REGION_FAILURE, error };
  }
}

function putSuperRegion(id, super_region) {
  return dispatch => {
    dispatch(request());

    super_regionServices.putSuperRegion(id, super_region).then(
      response => {
        toast.success('SuperRegion editada satisfactoriamente');
        dispatch(success(response.data));
      },
      error => {
        toast.error('Error editando el SuperRegion ');
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: super_regionConstants.PUT_SUPER_REGION_REQUEST };
  }
  function success(results) {
    return { type: super_regionConstants.PUT_SUPER_REGION_SUCCESS, results };
  }
  function failure(error) {
    return { type: super_regionConstants.PUT_SUPER_REGION_FAILURE, error };
  }
}

function postSuperRegion(super_region) {
  return dispatch => {
    dispatch(request());

    super_regionServices.postSuperRegion(super_region).then(
      response => {
        toast.success('SuperRegion creada satisfactoriamente');
        dispatch(success(response.data));
      },
      error => {
        if (error === 'A super_region with that name already exists.') {
          toast.error('Ya existe otra SuperRegion con ese nombre de SuperRegion.');
        } else {
          toast.error('Error creando el SuperRegion ');
        }
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: super_regionConstants.POST_SUPER_REGION_REQUEST };
  }
  function success(results) {
    return { type: super_regionConstants.POST_SUPER_REGION_SUCCESS, results };
  }
  function failure(error) {
    return { type: super_regionConstants.POST_SUPER_REGION_FAILURE, error };
  }
}

function getSuperRegionsList(page, pagination = true) {
  return dispatch => {
    dispatch(request());

    super_regionServices.getSuperRegionsList(page, pagination).then(
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
    return { type: super_regionConstants.GET_SUPER_REGIONS_REQUEST };
  }
  function success(results, super_regionsCounter) {
    return {
      type: super_regionConstants.GET_SUPER_REGIONS_SUCCESS,
      results,
      super_regionsCounter
    };
  }
  function failure(error) {
    return { type: super_regionConstants.GET_SUPER_REGIONS_FAILURE, error };
  }
}

function deleteSuperRegion(super_regionId) {
  return dispatch => {
    dispatch(request());

    super_regionServices.deleteSuperRegion(super_regionId).then(
      response => {
        toast.success('SuperRegion eliminado satisfactoriamente');
        dispatch(success(super_regionId));
      },
      error => {
        toast.error('Error al eliminar');
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: super_regionConstants.DELETE_SUPER_REGION_REQUEST };
  }
  function success(id) {
    return { type: super_regionConstants.DELETE_SUPER_REGION_SUCCESS, id };
  }
  function failure(error) {
    return { type: super_regionConstants.DELETE_SUPER_REGION_FAILURE, error };
  }
}

function clearSuperRegion() {
  return dispatch => {
    dispatch(request());
  };

  function request() {
    return { type: super_regionConstants.CLEAR_SUPER_REGION };
  }
}
