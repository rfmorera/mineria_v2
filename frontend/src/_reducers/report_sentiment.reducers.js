import { report_sentimentConstants } from '../_constants/report_sentiment.constants';

const initialState = {
  loadingReportSentimentsList: false,
  report_sentimentsList: [],
  report_sentimentsCounter: 0,
  report_sentimentsListErrorMessage: '',
  deletingReportSentiment: false,
  deletingReportSentimentErrorMessage: '',
  creatingReportSentiment: false,
  loadingReportSentiment: false,
  report_sentiment: {},
  report_sentimentErrorMessage: '',
  updatingReportSentiment: false,
  updatingReportSentimentErrorMessage: '',
  dataReport: {
    data_line: [],
    data_total_report: [],
    data_total: [],
    data_ratio: [],
    data_report_desc: [],
    total: '-',
    total_opiniones: '-',
    min_date: '',
    max_date: ''
  }
};

export function report_sentiments(state = initialState, action) {
  switch (action.type) {
    // GET_REPORT_SENTIMENT
    case report_sentimentConstants.GET_REPORT_SENTIMENT_REQUEST:
      return {
        ...state,
        loadingReportSentiment: true,
        report_sentimentErrorMessage: ''
      };
    case report_sentimentConstants.GET_REPORT_SENTIMENT_SUCCESS:
      return {
        ...state,
        loadingReportSentiment: false,
        report_sentiment: action.results
      };
    case report_sentimentConstants.GET_REPORT_SENTIMENT_FAILURE:
      return {
        ...state,
        loadingReportSentiment: false,
        report_sentimentErrorMessage: action.error
      };
    // PUT_REPORT_SENTIMENT
    case report_sentimentConstants.PUT_REPORT_SENTIMENT_REQUEST:
      return {
        ...state,
        updatingReportSentiment: true,
        updatingReportSentimentErrorMessage: ''
      };
    case report_sentimentConstants.PUT_REPORT_SENTIMENT_SUCCESS:
      return {
        ...state,
        updatingReportSentiment: false,
        report_sentiment: action.results
      };
    case report_sentimentConstants.PUT_REPORT_SENTIMENT_FAILURE:
      return {
        ...state,
        updatingReportSentiment: false,
        updatingReportSentimentErrorMessage: action.error
      };

    // PATCH_REPORT_SENTIMENT
    case report_sentimentConstants.PATCH_REPORT_SENTIMENT_REQUEST:
      return {
        ...state,
        updatingReportSentiment: true,
        updatingReportSentimentErrorMessage: ''
      };
    case report_sentimentConstants.PATCH_REPORT_SENTIMENT_SUCCESS:
      return {
        ...state,
        updatingReportSentiment: false,
        report_sentiment: action.results
      };
    case report_sentimentConstants.PATCH_REPORT_SENTIMENT_FAILURE:
      return {
        ...state,
        updatingReportSentiment: false,
        updatingReportSentimentErrorMessage: action.error
      };

    // GET_REPORT_SENTIMENTS
    case report_sentimentConstants.GET_REPORT_SENTIMENTS_REQUEST:
      return {
        ...state,
        loadingReportSentimentsList: true
      };
    case report_sentimentConstants.GET_REPORT_SENTIMENTS_SUCCESS:
      return {
        ...state,
        loadingReportSentimentsList: false,
        report_sentimentsList: action.results,
        report_sentimentsCounter: action.report_sentimentsCounter
      };
    case report_sentimentConstants.GET_REPORT_SENTIMENTS_FAILURE:
      return {
        ...state,
        loadingReportSentimentsList: false,
        report_sentimentsListErrorMessage: action.error
      };

    // POST_REPORT_SENTIMENT
    case report_sentimentConstants.POST_REPORT_SENTIMENT_REQUEST:
      return {
        ...state,
        creatingReportSentiment: true,
        report_sentimentErrorMessage: ''
      };
    case report_sentimentConstants.POST_REPORT_SENTIMENT_SUCCESS:
      return {
        ...state,
        creatingReportSentiment: false,
        report_sentiment: action.results
      };
    case report_sentimentConstants.POST_REPORT_SENTIMENT_FAILURE:
      return {
        ...state,
        creatingReportSentiment: false,
        report_sentimentErrorMessage: action.error
      };

    // DELETE_REPORT_SENTIMENT
    case report_sentimentConstants.DELETE_REPORT_SENTIMENT_REQUEST:
      return {
        ...state,
        deletingReportSentiment: true,
        deletingReportSentimentErrorMessage: ''
      };
    case report_sentimentConstants.DELETE_REPORT_SENTIMENT_SUCCESS:
      let { report_sentimentsList, report_sentimentsCounter } = state;
      report_sentimentsCounter -= 1;
      report_sentimentsList = report_sentimentsList.filter(
        item => item.id !== action.id
      );
      return {
        ...state,
        report_sentimentsCounter: report_sentimentsCounter,
        report_sentimentsList: report_sentimentsList,
        deletingReportSentiment: false
      };
    case report_sentimentConstants.DELETE_REPORT_SENTIMENT_FAILURE:
      return {
        ...state,
        deletingReportSentiment: false,
        deletingReportSentimentErrorMessage: action.error
      };
    case report_sentimentConstants.CLEAR_REPORT_SENTIMENT:
      return {
        ...state,
        ...initialState
      };

    // GET_REPORT_SENTIMENT_DATA
    case report_sentimentConstants.GET_REPORT_SENTIMENTS_DATA_REQUEST:
      return {
        ...state,
        loadingReportSentiment: true,
        report_sentimentErrorMessage: ''
      };
    case report_sentimentConstants.GET_REPORT_SENTIMENTS_DATA_SUCCESS:
      return {
        ...state,
        loadingReportSentiment: false,
        dataReport: action.results
      };
    case report_sentimentConstants.GET_REPORT_SENTIMENTS_DATA_FAILURE:
      return {
        ...state,
        loadingReportSentiment: false,
        report_sentimentErrorMessage: action.error
      };
    default:
      return state;
  }
}
