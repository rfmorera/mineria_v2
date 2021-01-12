import { super_regionConstants } from '../_constants/super_region.constants'


const initialState = {
  loadingSuperRegionsList: false,
  super_regionsList: [],
  super_regionsCounter: 0,
  super_regionsListErrorMessage: '',
  deletingSuperRegion: false,
  deletingSuperRegionErrorMessage: '',
  creatingSuperRegion: false,
  loadingSuperRegion: false,
  super_region: {},
  super_regionErrorMessage: '',
  updatingSuperRegion: false,
  updatingSuperRegionErrorMessage: ''
}

export function super_regions(state = initialState, action) {
  switch (action.type) {
    // GET_SUPER_REGION
    case super_regionConstants.GET_SUPER_REGION_REQUEST:
      return {
        ...state,
        loadingSuperRegion: true,
        super_regionErrorMessage: ''
      }
    case super_regionConstants.GET_SUPER_REGION_SUCCESS:
      return {
        ...state,
        loadingSuperRegion: false,
        super_region: action.results,
      }
    case super_regionConstants.GET_SUPER_REGION_FAILURE:
      return {
        ...state,
        loadingSuperRegion: false,
        super_regionErrorMessage: action.error
      }
    // PUT_SUPER_REGION
    case super_regionConstants.PUT_SUPER_REGION_REQUEST:
      return {
        ...state,
        updatingSuperRegion: true,
        updatingSuperRegionErrorMessage: ''
      }
    case super_regionConstants.PUT_SUPER_REGION_SUCCESS:
      return {
        ...state,
        updatingSuperRegion: false,
        super_region: action.results,
      }
    case super_regionConstants.PUT_SUPER_REGION_FAILURE:
      return {
        ...state,
        updatingSuperRegion: false,
        updatingSuperRegionErrorMessage: action.error
      }

    // GET_SUPER_REGIONS
    case super_regionConstants.GET_SUPER_REGIONS_REQUEST:
      return {
        ...state,
        loadingSuperRegionsList: true
      }
    case super_regionConstants.GET_SUPER_REGIONS_SUCCESS:
      return {
        ...state,
        loadingSuperRegionsList: false,
        super_regionsList: action.results,
        super_regionsCounter: action.super_regionsCounter
      }
    case super_regionConstants.GET_SUPER_REGIONS_FAILURE:
      return {
        ...state,
        loadingSuperRegionsList: false,
        super_regionsListErrorMessage: action.error
      }

    // POST_SUPER_REGION
    case super_regionConstants.POST_SUPER_REGION_REQUEST:
      return {
        ...state,
        creatingSuperRegion: true,
        super_regionErrorMessage: ''
      }
    case super_regionConstants.POST_SUPER_REGION_SUCCESS:
      return {
        ...state,
        creatingSuperRegion: false,
        super_region: action.results,
      }
    case super_regionConstants.POST_SUPER_REGION_FAILURE:
      return {
        ...state,
        creatingSuperRegion: false,
        super_regionErrorMessage: action.error
      }

    // DELETE_SUPER_REGION
    case super_regionConstants.DELETE_SUPER_REGION_REQUEST:
      return {
        ...state,
        deletingSuperRegion: true,
        deletingSuperRegionErrorMessage: ''
      }
    case super_regionConstants.DELETE_SUPER_REGION_SUCCESS:
      let { super_regionsList, super_regionsCounter } = state
      super_regionsCounter -= 1
      super_regionsList = super_regionsList.filter(item => item.id !== action.id)
      return {
        ...state,
        super_regionsCounter: super_regionsCounter,
        super_regionsList: super_regionsList,
        deletingSuperRegion: false
      }
    case super_regionConstants.DELETE_SUPER_REGION_FAILURE:
      return {
        ...state,
        deletingSuperRegion: false,
        deletingSuperRegionErrorMessage: action.error
      }
    case super_regionConstants.CLEAR_SUPER_REGION:
      return {
        ...state,
        ...initialState,
      }

    default:
      return state
  }
}
