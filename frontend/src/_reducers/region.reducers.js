import { regionConstants } from '../_constants/region.constants'


const initialState = {
  loadingRegionsList: false,
  regionsList: [],
  regionsCounter: 0,
  regionsListErrorMessage: '',
  deletingRegion: false,
  deletingRegionErrorMessage: '',
  creatingRegion: false,
  loadingRegion: false,
  region: {},
  regionErrorMessage: '',
  updatingRegion: false,
  updatingRegionErrorMessage: ''
}

export function regions(state = initialState, action) {
  switch (action.type) {
    // GET_REGION
    case regionConstants.GET_REGION_REQUEST:
      return {
        ...state,
        loadingRegion: true,
        regionErrorMessage: ''
      }
    case regionConstants.GET_REGION_SUCCESS:
      return {
        ...state,
        loadingRegion: false,
        region: action.results,
      }
    case regionConstants.GET_REGION_FAILURE:
      return {
        ...state,
        loadingRegion: false,
        regionErrorMessage: action.error
      }
    // PUT_REGION
    case regionConstants.PUT_REGION_REQUEST:
      return {
        ...state,
        updatingRegion: true,
        updatingRegionErrorMessage: ''
      }
    case regionConstants.PUT_REGION_SUCCESS:
      return {
        ...state,
        updatingRegion: false,
        region: action.results,
      }
    case regionConstants.PUT_REGION_FAILURE:
      return {
        ...state,
        updatingRegion: false,
        updatingRegionErrorMessage: action.error
      }

    // GET_REGIONS
    case regionConstants.GET_REGIONS_REQUEST:
      return {
        ...state,
        loadingRegionsList: true
      }
    case regionConstants.GET_REGIONS_SUCCESS:
      return {
        ...state,
        loadingRegionsList: false,
        regionsList: action.results,
        regionsCounter: action.regionsCounter
      }
    case regionConstants.GET_REGIONS_FAILURE:
      return {
        ...state,
        loadingRegionsList: false,
        regionsListErrorMessage: action.error
      }

    // POST_REGION
    case regionConstants.POST_REGION_REQUEST:
      return {
        ...state,
        creatingRegion: true,
        regionErrorMessage: ''
      }
    case regionConstants.POST_REGION_SUCCESS:
      return {
        ...state,
        creatingRegion: false,
        region: action.results,
      }
    case regionConstants.POST_REGION_FAILURE:
      return {
        ...state,
        creatingRegion: false,
        regionErrorMessage: action.error
      }

    // DELETE_REGION
    case regionConstants.DELETE_REGION_REQUEST:
      return {
        ...state,
        deletingRegion: true,
        deletingRegionErrorMessage: ''
      }
    case regionConstants.DELETE_REGION_SUCCESS:
      let { regionsList, regionsCounter } = state
      regionsCounter -= 1
      regionsList = regionsList.filter(item => item.id !== action.id)
      return {
        ...state,
        regionsCounter: regionsCounter,
        regionsList: regionsList,
        deletingRegion: false
      }
    case regionConstants.DELETE_REGION_FAILURE:
      return {
        ...state,
        deletingRegion: false,
        deletingRegionErrorMessage: action.error
      }
    case regionConstants.CLEAR_REGION:
      return {
        ...state,
        ...initialState,
      }

    default:
      return state
  }
}
