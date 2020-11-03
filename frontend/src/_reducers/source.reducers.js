import { sourceConstants } from '../_constants/source.constants'


const initialState = {
  loadingSourcesList: false,
  sourcesList: [],
  sourcesCounter: 0,
  sourcesListErrorMessage: '',
  deletingSource: false,
  deletingSourceErrorMessage: '',
  creatingSource: false,
  loadingSource: false,
  source: {},
  sourceErrorMessage: '',
  updatingSource: false,
  updatingSourceErrorMessage: ''
}

export function sources(state = initialState, action) {
  switch (action.type) {
    // GET_SOURCE
    case sourceConstants.GET_SOURCE_REQUEST:
      return {
        ...state,
        loadingSource: true,
        sourceErrorMessage: ''
      }
    case sourceConstants.GET_SOURCE_SUCCESS:
      return {
        ...state,
        loadingSource: false,
        source: action.results,
      }
    case sourceConstants.GET_SOURCE_FAILURE:
      return {
        ...state,
        loadingSource: false,
        sourceErrorMessage: action.error
      }
    // PUT_SOURCE
    case sourceConstants.PUT_SOURCE_REQUEST:
      return {
        ...state,
        updatingSource: true,
        updatingSourceErrorMessage: ''
      }
    case sourceConstants.PUT_SOURCE_SUCCESS:
      return {
        ...state,
        updatingSource: false,
        source: action.results,
      }
    case sourceConstants.PUT_SOURCE_FAILURE:
      return {
        ...state,
        updatingSource: false,
        updatingSourceErrorMessage: action.error
      }

    // GET_SOURCES
    case sourceConstants.GET_SOURCES_REQUEST:
      return {
        ...state,
        loadingSourcesList: true
      }
    case sourceConstants.GET_SOURCES_SUCCESS:
      console.log("reducer")
      console.log(action.results)
      return {
        ...state,
        loadingSourcesList: false,
        sourcesList: action.results,
        sourcesCounter: action.sourcesCounter
      }
    case sourceConstants.GET_SOURCES_FAILURE:
      return {
        ...state,
        loadingSourcesList: false,
        sourcesListErrorMessage: action.error
      }

    // POST_SOURCE
    case sourceConstants.POST_SOURCE_REQUEST:
      return {
        ...state,
        creatingSource: true,
        sourceErrorMessage: ''
      }
    case sourceConstants.POST_SOURCE_SUCCESS:
      return {
        ...state,
        creatingSource: false,
        source: action.results,
      }
    case sourceConstants.POST_SOURCE_FAILURE:
      return {
        ...state,
        creatingSource: false,
        sourceErrorMessage: action.error
      }

    // DELETE_SOURCE
    case sourceConstants.DELETE_SOURCE_REQUEST:
      return {
        ...state,
        deletingSource: true,
        deletingSourceErrorMessage: ''
      }
    case sourceConstants.DELETE_SOURCE_SUCCESS:
      let { sourcesList, sourcesCounter } = state
      sourcesCounter -= 1
      sourcesList = sourcesList.filter(item => item.id !== action.id)
      return {
        ...state,
        sourcesCounter: sourcesCounter,
        sourcesList: sourcesList,
        deletingSource: false
      }
    case sourceConstants.DELETE_SOURCE_FAILURE:
      return {
        ...state,
        deletingSource: false,
        deletingSourceErrorMessage: action.error
      }
    case sourceConstants.CLEAR_SOURCE:
      return {
        ...state,
        ...initialState,
      }

    default:
      return state
  }
}
