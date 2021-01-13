import { report_advancedConstants } from '../_constants/report_advanced.constants'


const initialState = {
  loadingReportsList: false,
  reportsList: [],
  reportsCounter: 0,
  reportsListErrorMessage: '',
  deletingReport: false,
  deletingReportErrorMessage: '',
  creatingReport: false,
  loadingReport: false,
  report: {},
  reportErrorMessage: '',
  updatingReport: false,
  updatingReportErrorMessage: ''
}

export function report_advanced(state = initialState, action) {
  switch (action.type) {
    // GET_REPORT
    case report_advancedConstants.GET_REPORT_REQUEST:
      return {
        ...state,
        loadingReport: true,
        reportErrorMessage: ''
      }
    case report_advancedConstants.GET_REPORT_SUCCESS:
      return {
        ...state,
        loadingReport: false,
        report: action.results,
      }
    case report_advancedConstants.GET_REPORT_FAILURE:
      return {
        ...state,
        loadingReport: false,
        reportErrorMessage: action.error
      }
    // PUT_REPORT
    case report_advancedConstants.PUT_REPORT_REQUEST:
      return {
        ...state,
        updatingReport: true,
        updatingReportErrorMessage: ''
      }
    case report_advancedConstants.PUT_REPORT_SUCCESS:
      return {
        ...state,
        updatingReport: false,
        report: action.results,
      }
    case report_advancedConstants.PUT_REPORT_FAILURE:
      return {
        ...state,
        updatingReport: false,
        updatingReportErrorMessage: action.error
      }

    // GET_REPORTS
    case report_advancedConstants.GET_REPORTS_REQUEST:
      return {
        ...state,
        loadingReportsList: true
      }
    case report_advancedConstants.GET_REPORTS_SUCCESS:
      return {
        ...state,
        loadingReportsList: false,
        reportsList: action.results,
        reportsCounter: action.reportsCounter
      }
    case report_advancedConstants.GET_REPORTS_FAILURE:
      return {
        ...state,
        loadingReportsList: false,
        reportsListErrorMessage: action.error
      }

    // POST_REPORT
    case report_advancedConstants.POST_REPORT_REQUEST:
      return {
        ...state,
        creatingReport: true,
        reportErrorMessage: ''
      }
    case report_advancedConstants.POST_REPORT_SUCCESS:
      return {
        ...state,
        creatingReport: false,
        report: action.results,
      }
    case report_advancedConstants.POST_REPORT_FAILURE:
      return {
        ...state,
        creatingReport: false,
        reportErrorMessage: action.error
      }

    // DELETE_REPORT
    case report_advancedConstants.DELETE_REPORT_REQUEST:
      return {
        ...state,
        deletingReport: true,
        deletingReportErrorMessage: ''
      }
    case report_advancedConstants.DELETE_REPORT_SUCCESS:
      let { reportsList, reportsCounter } = state
      reportsCounter -= 1
      reportsList = reportsList.filter(item => item.id !== action.id)
      return {
        ...state,
        reportsCounter: reportsCounter,
        reportsList: reportsList,
        deletingReport: false
      }
    case report_advancedConstants.DELETE_REPORT_FAILURE:
      return {
        ...state,
        deletingReport: false,
        deletingReportErrorMessage: action.error
      }
    case report_advancedConstants.CLEAR_REPORT:
      return {
        ...state,
        ...initialState,
      }

    default:
      return state
  }
}
