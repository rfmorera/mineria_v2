import { entryConstants } from '../_constants/entry.constants'


const initialState = {
  loadingEntrysList: false,
  entriesList: [],
  entriesCounter: 0,
  entriesListErrorMessage: '',
  deletingEntry: false,
  deletingEntryErrorMessage: '',
  creatingEntry: false,
  loadingEntry: false,
  entry: {},
  entryErrorMessage: '',
  updatingEntry: false,
  updatingEntryErrorMessage: ''
}

export function entries(state = initialState, action) {
  switch (action.type) {
    // GET_ENTRY
    case entryConstants.GET_ENTRY_REQUEST:
      return {
        ...state,
        loadingEntry: true,
        entryErrorMessage: ''
      }
    case entryConstants.GET_ENTRY_SUCCESS:
      return {
        ...state,
        loadingEntry: false,
        entry: action.results,
      }
    case entryConstants.GET_ENTRY_FAILURE:
      return {
        ...state,
        loadingEntry: false,
        entryErrorMessage: action.error
      }
    // PUT_ENTRY
    case entryConstants.PUT_ENTRY_REQUEST:
      return {
        ...state,
        updatingEntry: true,
        updatingEntryErrorMessage: ''
      }
    case entryConstants.PUT_ENTRY_SUCCESS:
      return {
        ...state,
        updatingEntry: false,
        entry: action.results,
      }
    case entryConstants.PUT_ENTRY_FAILURE:
      return {
        ...state,
        updatingEntry: false,
        updatingEntryErrorMessage: action.error
      }

    // GET_ENTRIES
    case entryConstants.GET_ENTRIES_REQUEST:
      return {
        ...state,
        loadingEntrysList: true
      }
    case entryConstants.GET_ENTRIES_SUCCESS:
      return {
        ...state,
        loadingEntrysList: false,
        entriesList: action.results,
        entriesCounter: action.entriesCounter
      }
    case entryConstants.GET_ENTRIES_FAILURE:
      return {
        ...state,
        loadingEntrysList: false,
        entriesListErrorMessage: action.error
      }

    // POST_ENTRY
    case entryConstants.POST_ENTRY_REQUEST:
      return {
        ...state,
        creatingEntry: true,
        entryErrorMessage: ''
      }
    case entryConstants.POST_ENTRY_SUCCESS:
      return {
        ...state,
        creatingEntry: false,
        entry: action.results,
      }
    case entryConstants.POST_ENTRY_FAILURE:
      return {
        ...state,
        creatingEntry: false,
        entryErrorMessage: action.error
      }

    // DELETE_ENTRY
    case entryConstants.DELETE_ENTRY_REQUEST:
      return {
        ...state,
        deletingEntry: true,
        deletingEntryErrorMessage: ''
      }
    case entryConstants.DELETE_ENTRY_SUCCESS:
      let { entriesList, entriesCounter } = state
      entriesCounter -= 1
      entriesList = entriesList.filter(item => item.id !== action.id)
      return {
        ...state,
        entriesCounter: entriesCounter,
        entriesList: entriesList,
        deletingEntry: false
      }
    case entryConstants.DELETE_ENTRY_FAILURE:
      return {
        ...state,
        deletingEntry: false,
        deletingEntryErrorMessage: action.error
      }
    case entryConstants.CLEAR_ENTRY:
      return {
        ...state,
        ...initialState,
      }

    default:
      return state
  }
}
