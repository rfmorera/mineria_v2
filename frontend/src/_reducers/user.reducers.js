import { userConstants } from '../_constants/user.constants'


const initialState = {
  loadingUsersList: false,
  usersList: [],
  usersCounter: 0,
  usersListErrorMessage: '',
  deletingUser: false,
  deletingUserErrorMessage: '',
  creatingUser: false,
  loadingUser: false,
  user: {},
  userErrorMessage: '',
  updatingUser: false,
  updatingUserErrorMessage: ''
}

export function users(state = initialState, action) {
  switch (action.type) {
    // GET_USER
    case userConstants.GET_USER_REQUEST:
      return {
        ...state,
        loadingUser: true,
        userErrorMessage: ''
      }
    case userConstants.GET_USER_SUCCESS:
      return {
        ...state,
        loadingUser: false,
        user: action.results,
      }
    case userConstants.GET_USER_FAILURE:
      return {
        ...state,
        loadingUser: false,
        userErrorMessage: action.error
      }
    // PUT_USER
    case userConstants.PUT_USER_REQUEST:
      return {
        ...state,
        updatingUser: true,
        updatingUserErrorMessage: ''
      }
    case userConstants.PUT_USER_SUCCESS:
      return {
        ...state,
        updatingUser: false,
        user: action.results,
      }
    case userConstants.PUT_USER_FAILURE:
      return {
        ...state,
        updatingUser: false,
        updatingUserErrorMessage: action.error
      }

    // GET_USERS
    case userConstants.GET_USERS_REQUEST:
      return {
        ...state,
        loadingUsersList: true
      }
    case userConstants.GET_USERS_SUCCESS:
      return {
        ...state,
        loadingUsersList: false,
        usersList: action.results,
        usersCounter: action.usersCounter
      }
    case userConstants.GET_USERS_FAILURE:
      return {
        ...state,
        loadingUsersList: false,
        usersListErrorMessage: action.error
      }

    // POST_USER
    case userConstants.POST_USER_REQUEST:
      return {
        ...state,
        creatingUser: true,
        userErrorMessage: ''
      }
    case userConstants.POST_USER_SUCCESS:
      return {
        ...state,
        creatingUser: false,
        user: action.results,
      }
    case userConstants.POST_USER_FAILURE:
      return {
        ...state,
        creatingUser: false,
        userErrorMessage: action.error
      }

    // DELETE_USER
    case userConstants.DELETE_USER_REQUEST:
      return {
        ...state,
        deletingUser: true,
        deletingUserErrorMessage: ''
      }
    case userConstants.DELETE_USER_SUCCESS:
      let { usersList, usersCounter } = state
      usersCounter -= 1
      usersList = usersList.filter(item => item.id !== action.id)
      return {
        ...state,
        usersCounter: usersCounter,
        usersList: usersList,
        deletingUser: false
      }
    case userConstants.DELETE_USER_FAILURE:
      return {
        ...state,
        deletingUser: false,
        deletingUserErrorMessage: action.error
      }
    case userConstants.CLEAR_USER:
      return {
        ...state,
        ...initialState,
      }

    default:
      return state
  }
}
