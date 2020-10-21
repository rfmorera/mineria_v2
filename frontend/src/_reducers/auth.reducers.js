import { authConstants } from '../_constants/auth.constants'
import { isEmpty } from 'lodash'

const token = localStorage.getItem('token')

const initialState = {
  token,
  isAuthenticated: !isEmpty(token),
  isLoading: false,
  user: {},
  errors: {},

  signUpRequesting: false,
  signUpErrorMessage: '',

  requestingPasswordReset: false,
  passwordResetError: '',
  passwordResetStatus: '',

  requestingPasswordConfirmReset: false,
  passwordResetConfirmError: '',
  passwordResetConfirmStatus: '',

  activateUserRequest: false,
  activateUserError: '',
  activateUserStatus: '',

  changePasswordRequest: false,
  changePasswordError: '',
  changePasswordStatus: ''
}

export function auth(state = initialState, action) {
  switch (action.type) {
    case authConstants.USER_LOADING:
      return { ...state, isLoading: true }

    case authConstants.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.user
      }

    case authConstants.LOGIN_SUCCESSFUL:
      localStorage.setItem('token', action.data.auth_token)
      return {
        ...state,
        ...action.data,
        token: action.data.auth_token,
        isAuthenticated: true,
        isLoading: false,
        errors: null
      }

    case authConstants.AUTHENTICATION_ERROR:
    case authConstants.LOGIN_FAILED:
    case authConstants.LOGOUT_SUCCESSFUL:
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      return {
        ...state,
        errors: action.data,
        token: '',
        user: {},
        isAuthenticated: false,
        isLoading: false
      }

    case authConstants.POST_SIGN_UP_REQUEST:
      return {
        ...state,
        signUpRequesting: true,
        signUpErrorMessage: '',
        token: ''
      }

    case authConstants.POST_SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpRequesting: false,
        isAuthenticated: false
      }

    case authConstants.POST_SIGN_UP_FAILURE:
      return {
        ...state,
        signUpRequesting: false,
        signUpErrorMessage: action.error
      }

    case authConstants.PASSWORD_RESET_REQUEST:
      return {
        ...state,
        requestingPasswordReset: true,
        passwordResetError: '',
        passwordResetStatus: ''
      }
    case authConstants.PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        requestingPasswordReset: false,
        passwordResetStatus: action.status
      }
    case authConstants.PASSWORD_RESET_FAILURE:
      return {
        ...state,
        requestingPasswordReset: false,
        passwordResetError: action.error
      }
    case authConstants.PASSWORD_RESET_COMPLETED:
      return {
        ...state,
        requestingPasswordReset: false,
        passwordResetError: '',
        passwordResetStatus: ''
      }
    case authConstants.PASSWORD_RESET_CONFIRM_REQUEST:
      return {
        ...state,
        requestingPasswordConfirmReset: true,
        passwordResetConfirmError: '',
        passwordResetConfirmStatus: ''
      }
    case authConstants.PASSWORD_RESET_CONFIRM_SUCCESS:
      return {
        ...state,
        requestingPasswordConfirmReset: false,
        passwordResetConfirmStatus: action.status
      }
    case authConstants.PASSWORD_RESET_CONFIRM_FAILURE:
      return {
        ...state,
        requestingPasswordConfirmReset: false,
        passwordResetConfirmError: action.error
      }
    case authConstants.ACTIVATE_USER_REQUEST:
      return {
        ...state,
        activateUserRequest: true,
        activateUserError: '',
        activateUserStatus: ''
      }
    case authConstants.ACTIVATE_USER_SUCCESS:
      return {
        ...state,
        activateUserRequest: false,
        activateUserError: '',
        activateUserStatus: action.status
      }
    case authConstants.ACTIVATE_USER_FAILURE:
      return {
        ...state,
        activateUserRequest: false,
        activateUserError: action.error
      }
    case authConstants.CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        changePasswordRequest: true,
        changePasswordError: '',
        changePasswordStatus: ''
      }
    case authConstants.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordRequest: false,
        changePasswordStatus: action.status
      }
    case authConstants.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        changePasswordRequest: false,
        changePasswordError: action.error
      }
    case authConstants.CHANGE_PASSWORD_COMPLETED:
      return {
        ...state,
        changePasswordRequest: false,
        changePasswordError: '',
        changePasswordStatus: ''
      }
    default:
      return state
  }
}
