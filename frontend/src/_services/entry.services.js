import axios from 'axios'
import { get } from 'lodash'

export const entryServices = {
  deleteEntry,
  getEntriesList,
  postEntry,
  getEntry,
  patchEntry
}

const API_URL = process.env.REACT_APP_MINERIA_API_URL

function getEntry(id) {
  let token = localStorage.getItem('token')

  const authConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',

      Authorization: `Token ${token}`
    }
  }

  return axios
    .get(API_URL + '/entries/' + id, authConfig)
    .then(function(response) {
      return response
    })
    .catch(function(error) {
      return handleError(error)
    })
}

function patchEntry(id, entry) {
  let token = localStorage.getItem('token')

  const authConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',

      Authorization: `Token ${token}`
    }
  }

  return axios
    .patch(API_URL + '/entries/' + id + '/', entry, authConfig)
    .then(function(response) {
      return response
    })
    .catch(function(error) {
      return handleError(error)
    })
}

function postEntry(entry) {
  let token = localStorage.getItem('token')

  const authConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',

      Authorization: `Token ${token}`
    }
  }

  return axios
    .post(API_URL + '/entries/', entry, authConfig)
    .then(function(response) {
      return response
    })
    .catch(function(error) {
      return handleError(error)
    })
}

function getEntriesList(page, pagination) {
  let token = localStorage.getItem('token')

  const authConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',

      Authorization: `Token ${token}`
    },
    params: {
      page
    }
  }
  let url = '/entries/'
  if (pagination === false) {
    url = '/entries/all/'
  }

  return axios
    .get(API_URL + url, authConfig)
    .then(function(response) {
      return response
    })
    .catch(function(error) {
      return handleError(error)
    })
}

function deleteEntry(entryId) {
  let token = localStorage.getItem('token')

  const authConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      Authorization: `Token ${token}`
    }
  }

  return axios
    .delete(API_URL + '/entries/' + entryId, authConfig)
    .then(function(response) {
      return response
    })
    .catch(function(error) {
      return handleError(error)
    })
}

function handleError(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // toast.error("" + error.response.data.message)
    let errorMsj = error.response.data.message
    if (error.response.data.message === 'Request with malformed syntax')
      errorMsj = error.response.data.errors[0]
    return Promise.reject(errorMsj)
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    const ret_error = error.request.hasOwnProperty('data')
      ? error.request.data.message
      : error.message
    return Promise.reject(ret_error)
  } else {
    // Something happened in setting up the request that triggered an Error
    return Promise.reject(error.message)
  }
}
