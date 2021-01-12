import { toast } from 'react-toastify';
import { regionConstants } from '../_constants/region.constants';
import { regionServices } from '../_services/region.services';

export const regionActions = {
  getRegionsList,
  postRegion,
  deleteRegion,
  getRegion,
  putRegion,
  clearRegion
};

function getRegion(id) {
  return dispatch => {
    dispatch(request());

    regionServices.getRegion(id).then(
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
    return { type: regionConstants.GET_REGION_REQUEST };
  }
  function success(results) {
    return { type: regionConstants.GET_REGION_SUCCESS, results };
  }
  function failure(error) {
    return { type: regionConstants.GET_REGION_FAILURE, error };
  }
}

function putRegion(id, region) {
  return dispatch => {
    dispatch(request());

    regionServices.putRegion(id, region).then(
      response => {
        toast.success('Region editada satisfactoriamente');
        dispatch(success(response.data));
      },
      error => {
        toast.error('Error editando el Region ');
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: regionConstants.PUT_REGION_REQUEST };
  }
  function success(results) {
    return { type: regionConstants.PUT_REGION_SUCCESS, results };
  }
  function failure(error) {
    return { type: regionConstants.PUT_REGION_FAILURE, error };
  }
}

function postRegion(region) {
  return dispatch => {
    dispatch(request());

    regionServices.postRegion(region).then(
      response => {
        toast.success('Region creada satisfactoriamente');
        dispatch(success(response.data));
      },
      error => {
        if (error === 'A region with that name already exists.') {
          toast.error('Ya existe otra Region con ese nombre de Region.');
        } else {
          toast.error('Error creando el Region ');
        }
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: regionConstants.POST_REGION_REQUEST };
  }
  function success(results) {
    return { type: regionConstants.POST_REGION_SUCCESS, results };
  }
  function failure(error) {
    return { type: regionConstants.POST_REGION_FAILURE, error };
  }
}

function getRegionsList(page, pagination = true) {
  return dispatch => {
    dispatch(request());

    regionServices.getRegionsList(page, pagination).then(
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
    return { type: regionConstants.GET_REGIONS_REQUEST };
  }
  function success(results, regionsCounter) {
    return {
      type: regionConstants.GET_REGIONS_SUCCESS,
      results,
      regionsCounter
    };
  }
  function failure(error) {
    return { type: regionConstants.GET_REGIONS_FAILURE, error };
  }
}

function deleteRegion(regionId) {
  return dispatch => {
    dispatch(request());

    regionServices.deleteRegion(regionId).then(
      response => {
        toast.success('Region eliminado satisfactoriamente');
        dispatch(success(regionId));
      },
      error => {
        toast.error('Error al eliminar');
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: regionConstants.DELETE_REGION_REQUEST };
  }
  function success(id) {
    return { type: regionConstants.DELETE_REGION_SUCCESS, id };
  }
  function failure(error) {
    return { type: regionConstants.DELETE_REGION_FAILURE, error };
  }
}

function clearRegion() {
  return dispatch => {
    dispatch(request());
  };

  function request() {
    return { type: regionConstants.CLEAR_REGION };
  }
}
