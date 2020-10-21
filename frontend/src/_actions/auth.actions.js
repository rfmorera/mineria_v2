import { toast } from 'react-toastify'
import { authServices } from '../_services/auth.services'
import { authConstants } from '../_constants/auth.constants'

export const authActions = {
  loadUser,
  login,
  signUp,
  logout,
  passwordReset,
  passwordResetConfirm,
  activateUser,
  changePassword
}

function loadUser() {
  return dispatch => {
    dispatch(request())

    authServices.loadUser().then(
      response => {
        dispatch(success(response.data))
      },
      error => {
        dispatch(failure(error))
      }
    )
  }

  function request() {
    return { type: authConstants.USER_LOADING }
  }
  function success(user) {
    return { type: authConstants.USER_LOADED, user }
  }
  function failure(error) {
    return { type: authConstants.AUTHENTICATION_ERROR, error }
  }
}

function signUp(username, email, password, password2) {
  return dispatch => {
    dispatch(request())

    authServices.signUp(username, email, password, password2).then(
      response => {
        dispatch(success(response.data))
      },
      error => {
        dispatch(failure(error))
      }
    )
  }

  function request() {
    return { type: authConstants.POST_SIGN_UP_REQUEST }
  }
  function success(data) {
    return {
      type: authConstants.POST_SIGN_UP_SUCCESS,
      user: data.user,
      token: data.token
    }
  }
  function failure(error) {
    return { type: authConstants.POST_SIGN_UP_FAILURE, error }
  }
}

function logout() {
  return dispatch => {
    dispatch(request())
  }

  function request() {
    return { type: authConstants.LOGOUT_SUCCESSFUL }
  }
}

function login(username, password) {
  return dispatch => {
    dispatch({ type: authConstants.USER_LOADING })
    authServices
      .login(username, password)
      .then(res => {
        if (res.status === 200) {
          toast.success('Bienvenido a Wayam Integral')
          dispatch({ type: authConstants.LOGIN_SUCCESSFUL, data: res.data })
        } else if (
          res.status === 403 ||
          res.status === 401 ||
          res.status === 400
        ) {
          toast.error('Credenciales incorrectas')
          dispatch({ type: authConstants.AUTHENTICATION_ERROR, data: res.data })
        } else {
          dispatch({ type: authConstants.LOGIN_FAILED, data: res.data })
        }
      })
      .catch(err => {
        toast.error('Error de autenticación')
        dispatch({ type: authConstants.LOGIN_FAILED, data: err })
      })
  }
}

function passwordReset(email) {
  return dispatch => {
    dispatch({ type: authConstants.PASSWORD_RESET_REQUEST })

    authServices.passwordReset(email).then(
      response => {
        dispatch({
          type: authConstants.PASSWORD_RESET_SUCCESS,
          status: response.status
        })
      },
      error => {
        dispatch({ type: authConstants.PASSWORD_RESET_FAILURE, error })
      }
    )
  }
}

function passwordResetConfirm(uid, token, password, password2) {
  return dispatch => {
    dispatch({ type: authConstants.PASSWORD_RESET_CONFIRM_REQUEST })

    authServices.passwordResetConfirm(uid, token, password, password2).then(
      response => {
        dispatch({
          type: authConstants.PASSWORD_RESET_CONFIRM_SUCCESS,
          status: response.status
        })
      },
      error => {
        dispatch({ type: authConstants.PASSWORD_RESET_CONFIRM_FAILURE, error })
      }
    )
  }
}

function activateUser(uid, token) {
  return dispatch => {
    dispatch({ type: authConstants.ACTIVATE_USER_REQUEST })

    authServices.activateUser(uid, token).then(
      res => {
        dispatch({
          type: authConstants.ACTIVATE_USER_SUCCESS,
          ...res.data
        })
      },
      error => {
        dispatch({ type: authConstants.ACTIVATE_USER_FAILURE, error })
      }
    )
  }
}

function changePassword(current_password, password, password2) {
  return dispatch => {
    dispatch({ type: authConstants.CHANGE_PASSWORD_REQUEST })

    authServices.changePassword(current_password, password, password2).then(
      res => {
        dispatch({
          type: authConstants.CHANGE_PASSWORD_SUCCESS,
          status: res.status
        })
      },
      error => {
        dispatch({ type: authConstants.CHANGE_PASSWORD_FAILURE, error })
      }
    )
  }
}
