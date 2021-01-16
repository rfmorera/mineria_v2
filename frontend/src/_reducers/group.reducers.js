import { groupConstants } from '../_constants/group.constants'


const initialState = {
  loadingGroupsList: false,
  groupsList: [],
  groupsCounter: 0,
  groupsListErrorMessage: '',
  deletingGroup: false,
  deletingGroupErrorMessage: '',
  creatingGroup: false,
  loadingGroup: false,
  group: {},
  groupErrorMessage: '',
  updatingGroup: false,
  updatingGroupErrorMessage: ''
}

export function groups(state = initialState, action) {
  switch (action.type) {
    // GET_GROUP
    case groupConstants.GET_GROUP_REQUEST:
      return {
        ...state,
        loadingGroup: true,
        groupErrorMessage: ''
      }
    case groupConstants.GET_GROUP_SUCCESS:
      return {
        ...state,
        loadingGroup: false,
        group: action.results,
      }
    case groupConstants.GET_GROUP_FAILURE:
      return {
        ...state,
        loadingGroup: false,
        groupErrorMessage: action.error
      }
    // PUT_GROUP
    case groupConstants.PUT_GROUP_REQUEST:
      return {
        ...state,
        updatingGroup: true,
        updatingGroupErrorMessage: ''
      }
    case groupConstants.PUT_GROUP_SUCCESS:
      return {
        ...state,
        updatingGroup: false,
        group: action.results,
      }
    case groupConstants.PUT_GROUP_FAILURE:
      return {
        ...state,
        updatingGroup: false,
        updatingGroupErrorMessage: action.error
      }

    // GET_GROUPS
    case groupConstants.GET_GROUPS_REQUEST:
      return {
        ...state,
        loadingGroupsList: true
      }
    case groupConstants.GET_GROUPS_SUCCESS:
      return {
        ...state,
        loadingGroupsList: false,
        groupsList: action.results,
        groupsCounter: action.groupsCounter
      }
    case groupConstants.GET_GROUPS_FAILURE:
      return {
        ...state,
        loadingGroupsList: false,
        groupsListErrorMessage: action.error
      }

    // POST_GROUP
    case groupConstants.POST_GROUP_REQUEST:
      return {
        ...state,
        creatingGroup: true,
        groupErrorMessage: ''
      }
    case groupConstants.POST_GROUP_SUCCESS:
      return {
        ...state,
        creatingGroup: false,
        group: action.results,
      }
    case groupConstants.POST_GROUP_FAILURE:
      return {
        ...state,
        creatingGroup: false,
        groupErrorMessage: action.error
      }

    // DELETE_GROUP
    case groupConstants.DELETE_GROUP_REQUEST:
      return {
        ...state,
        deletingGroup: true,
        deletingGroupErrorMessage: ''
      }
    case groupConstants.DELETE_GROUP_SUCCESS:
      let { groupsList, groupsCounter } = state
      groupsCounter -= 1
      groupsList = groupsList.filter(item => item.id !== action.id)
      return {
        ...state,
        groupsCounter: groupsCounter,
        groupsList: groupsList,
        deletingGroup: false
      }
    case groupConstants.DELETE_GROUP_FAILURE:
      return {
        ...state,
        deletingGroup: false,
        deletingGroupErrorMessage: action.error
      }
    case groupConstants.CLEAR_GROUP:
      return {
        ...state,
        ...initialState,
      }

    default:
      return state
  }
}
