import axios from 'axios';
import { get } from 'lodash';
import compose_data, {
  resume_data,
  convert_to_pie
} from '../utils/chart-data-converter';

export const report_sentimentServices = {
  deleteReportSentiment,
  getReportSentimentsList,
  postReportSentiment,
  getReportSentiment,
  putReportSentiment,
  getReportSentimentData
};

const API_URL = process.env.REACT_APP_MINERIA_API_URL;

function getReportSentiment(id) {
  let token = localStorage.getItem('token');

  const authConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',

      Authorization: `Token ${token}`
    }
  };

  return axios
    .get(API_URL + '/report-sentiment/' + id, authConfig)
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      return handleError(error);
    });
}

function putReportSentiment(id, report) {
  let token = localStorage.getItem('token');

  const authConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',

      Authorization: `Token ${token}`
    }
  };

  return axios
    .put(API_URL + '/report-sentiment/' + id + '/', report, authConfig)
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      return handleError(error);
    });
}

function postReportSentiment(report) {
  let token = localStorage.getItem('token');

  const authConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',

      Authorization: `Token ${token}`
    }
  };

  return axios
    .post(API_URL + '/report-sentiment/', report, authConfig)
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      return handleError(error);
    });
}

function getReportSentimentsList(
  page,
  pagination,
  inverse_order = false,
  favorite = null
) {
  let token = localStorage.getItem('token');

  const authConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',

      Authorization: `Token ${token}`
    },
    params: {
      page
    }
  };
  let url = '/report-sentiment/';
  if (pagination === false) {
    url = '/report-sentiment/all/';
  }

  if (inverse_order === true) {
    url += '?ordering=-created_on';
  }

  if (favorite !== null) {
    url += '?favorite=' + (favorite ? 'True' : 'False');
  }
  return axios
    .get(API_URL + url, authConfig)
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      return handleError(error);
    });
}

function deleteReportSentiment(reportId) {
  let token = localStorage.getItem('token');

  const authConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      Authorization: `Token ${token}`
    }
  };

  return axios
    .delete(API_URL + '/report-sentiment/' + reportId, authConfig)
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      return handleError(error);
    });
}

function getReportSentimentData(ids) {
  let token = localStorage.getItem('token');

  const authConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    }
  };

  const promises = ids.map(item => {
    return axios
      .get(
        API_URL + '/report-sentiment-planteamiento/' + item + '/report',
        authConfig
      )
      .then(response => {
        var json = JSON.stringify(response.data);
        json = JSON.parse(json);

        var desc = compose_data(
          [json],
          [
            'id',
            'name',
            'description',
            'start_date',
            'end_date',
            'delta_type',
            'delta_value'
          ],
          [
            'id',
            'name',
            'description',
            'inicio',
            'fin',
            'delta_type',
            'delta_value'
          ]
        )[0];

        var total_d = compose_data(
          json.result,
          ['start_date', 'total_positive', 'total_negative', 'total_neutral'],
          ['fecha', 'Positivas', 'Negativas', 'Neutras']
        );

        total_d = resume_data(
          total_d,
          ['Positivas', 'Negativas', 'Neutras'],
          ['Positivas', 'Negativas', 'Neutras'],
          { id: desc['name'] }
        );

        var ratio_d = {
          id: desc['name'],
          data: compose_data(json.result, ['start_date', 'ratio'], ['x', 'y'])
        };

        return { desc, total_d, ratio_d };
      })
      .catch(function(error) {
        return handleError(error);
      });
  });

  var temp_data_ratio = [];
  var temp_data_total_report = [];
  var temp_data_report_desc = [];
  var final_answer = {};

  Promise.all(promises)
    .then(results => {
      results.map(item => {
        temp_data_ratio.push(item['ratio_d']);

        temp_data_total_report.push(item['total_d']);

        temp_data_report_desc.push(item['desc']);
      });

      var min = [null].concat(temp_data_report_desc).reduce(function(a, b) {
        return a < b.inicio ? a : b.inicio;
      });
      var max = [null].concat(temp_data_report_desc).reduce(function(a, b) {
        return a > b.fin ? a : b.fin;
      });

      if (max === null) {
        max = 'Ahora';
      }

      // this.setState({
      //   min_date: min,
      //   max_date: max
      // });

      final_answer['min_date'] = min;
      final_answer['max_date'] = max;

      return temp_data_total_report;
    })
    .then(result => {
      var ans = convert_to_pie(
        temp_data_total_report,
        ['Positivas', 'Negativas', 'Neutras'],
        ['Positivas', 'Negativas', 'Neutras']
      );

      var total_op = resume_data(ans, ['value'], ['value']);

      // this.setState({
      //   data_total: ans,
      //   total_opiniones: total_op['value']
      // });
      final_answer['data_total'] = ans;
      final_answer['total_opiniones'] = total_op['value'];
    })
    .catch(function(error) {
      return handleError(error);
    });
  final_answer.data_ratio = temp_data_ratio;
  final_answer['data_total_report'] = temp_data_total_report;
  final_answer['data_report_desc'] = temp_data_report_desc;

  // console.log('service');
  // console.log(final_answer);
  return Promise.resolve(final_answer);

  // this.setState({
  //   data_ratio: temp_data_ratio,
  //   data_total_report: temp_data_total_report,
  //   data_report_desc: temp_data_report_desc
  // });
}

function handleError(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // toast.error("" + error.response.data.message)
    let errorMsj = error.response.data.message;
    if (error.response.data.message === 'Request with malformed syntax')
      errorMsj = error.response.data.errors[0];
    return Promise.reject(errorMsj);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    const ret_error = error.request.hasOwnProperty('data')
      ? error.request.data.message
      : error.message;
    return Promise.reject(ret_error);
  } else {
    // Something happened in setting up the request that triggered an Error
    return Promise.reject(error.message);
  }
}
