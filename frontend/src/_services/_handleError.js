export default function handleError(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // toast.error("" + error.response.data.message)
    let errorMsj = error.response.data.message
    if (error.response.data.message === 'Request with malformed syntax')
      errorMsj = error.response.data.errors[0]
    else if (error.response.data.detail) errorMsj = error.response.data.detail
    else if (error.response.data.non_field_errors) {
      if (Array.isArray(error.response.data.non_field_errors)){
        errorMsj = error.response.data.non_field_errors[0]
      } else {
        errorMsj = error.response.data.non_field_errors
      }
    }
    return Promise.reject(errorMsj || 'error')
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    const ret_error = error.request.hasOwnProperty('data')
      ? error.request.data.message
      : error.message
    return Promise.reject(ret_error || 'error')
  } else {
    // Something happened in setting up the request that triggered an Error
    return Promise.reject(error.message || 'error')
  }
}
