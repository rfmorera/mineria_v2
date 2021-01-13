import axios from 'axios'
import { get } from 'lodash'

export const reportServices = {
  deleteReport,
  getReportsList,
  postReport,
  getReport,
  putReport
}

const API_URL = process.env.REACT_APP_MINERIA_API_URL

function getReport(id) {
  let token = localStorage.getItem('token')

  const authConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',

      Authorization: `Token ${token}`
    }
  }

  return axios
    .get(API_URL + '/report-advanced/' + id + '/', authConfig)
    .then(function(response) {
      return response
    })
    .catch(function(error) {
      return handleError(error)
    })
}

function putReport(id, report) {
  let token = localStorage.getItem('token')

  const authConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',

      Authorization: `Token ${token}`
    }
  }

  return axios
    .put(API_URL + '/report-advanced/' + id + '/', report, authConfig)
    .then(function(response) {
      return response
    })
    .catch(function(error) {
      return handleError(error)
    })
}

function postReport(report) {
  let token = localStorage.getItem('token')

  const authConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',

      Authorization: `Token ${token}`
    }
  }

  return axios
    .post(API_URL + '/report-advanced/', report, authConfig)
    .then(function(response) {
      return response
    })
    .catch(function(error) {
      return handleError(error)
    })
}

function getReportsList(page, pagination) {
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
  let url = '/report-advanced/'
  if (pagination === false) {
    url = '/report-advanced/all/'
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

function deleteReport(reportId) {
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
    .delete(API_URL + '/report-advanced/' + reportId + '/', authConfig)
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
