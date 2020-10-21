import axios from 'axios'
import handleError from './_handleError'
import { API_URL } from '../_constants/global'
import { get } from 'lodash'

export const authServices = {
  loadUser,
  login,
  signUp,
  passwordReset,
  passwordResetConfirm,
  activateUser,
  changePassword
}

function loadUser() {
  let token = localStorage.getItem('token')

  const authConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    }
  }

  return axios
    .get(API_URL + '/auth/users/me', authConfig)
    .then(function(response) {
      return response
    })
    .catch(function(error) {
      return handleError(error)
    })
}

function signUp(username, email, password, password2) {
  const authConfig = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const payload = {
    username,
    email,
    password,
    password2
  }

  return axios
    .post(API_URL + '/auth/users/', payload, authConfig)
    .then(function(response) {
      return response
    })
    .catch(function(error) {
      const usernameError = get(error, 'response.data.username')
      if (usernameError) {
        return Promise.reject(usernameError[0])
      }
      const emailError = get(error, 'response.data.email')
      if (emailError) {
        return Promise.reject(emailError[0])
      }
      return handleError(error)
    })
}

function login(username, password) {
  const authConfig = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const payload = {
    username,
    password
  }

  return axios
    .post(`${API_URL}/auth/token/login/`, payload, authConfig)
    .then(function(res) {
      return { status: res.status, data: res.data }
    })
    .catch(function(error) {
      if (error.response && error.response.status === 400) {
        return { status: 400, data: error.response.data }
      }
    })
}

function passwordReset(email) {
  const authConfig = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const params = {
    email
  }

  return axios
    .post(`${API_URL}/auth/users/reset_password/`, params, authConfig)
    .then(function(response) {
      return response
    })
    .catch(function(error) {
      return handleError(error)
    })
}

function passwordResetConfirm(uid, token, password, password2) {
  const authConfig = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const params = {
    uid,
    token,
    new_password: password,
    re_new_password: password2
  }

  return axios
    .post(
      `${API_URL}/auth/users/reset_password_confirm/`,
      params,
      authConfig
    )
    .then(function(response) {
      return response
    })
    .catch(function(error) {
      const status = get(error, 'response.status')
      if (status === 400) {
        return Promise.reject(status)
      }
      return handleError(error)
    })
}

function activateUser(uid, token) {
  const authConfig = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const payload = {
    uid,
    token
  }

  return axios
    .post(`${API_URL}/auth/users/activation/`, payload, authConfig)
    .then(function(res) {
      return { status: res.status, data: res.data }
    })
    .catch(function(error) {
      const status = get(error, 'response.status')
      if (status === 400 || status === 403) {
        return Promise.reject(status)
      }
      return handleError(error)
    })
}

function changePassword(current_password, password, password2) {
  let token = localStorage.getItem('token')

  const authConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    }
  }
  const payload = {
    current_password,
    new_password: password,
    re_new_password: password2
  }

  return axios
    .post(`${API_URL}/auth/users/set_password/`, payload, authConfig)
    .then(function(res) {
      return { status: res.status, data: res.data }
    })
    .catch(function(error) {
      const status = get(error, 'response.status')
      if (status === 400) {
        return Promise.reject(status)
      }
      return handleError(error)
    })
}
