import React, { useEffect, usePara, useState } from 'react';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { report_advancedActions } from '../../../_actions/report_advanced.actions';
import { report_sentimentActions } from '../../../_actions/report_sentiment.actions';
import ReportForm from './components/ReportForm';

const ReportAdvancedFormView = props => {
  let {
    creatingReport,
    report,
    reportErrorMessage,
    postReport,
    getReport,
    putReport,
    clearReport,
    getAllReportSentiment,
    reportSentimentList
  } = props;
  let { id } = useParams();
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (id !== 'add' && id !== undefined) {
      getReport(id);
      setUpdating(true);
    } else {
      setUpdating(false);
    }
    getAllReportSentiment();
  }, [id]);
  id = id === 'add' ? undefined : id;
  return <ReportForm props={{ id, ...props }} />;
};

function mapStateToProps({ report_advanced, report_sentiments }, ownProps) {
  return {
    creatingReport: report_advanced.creatingReport,
    report: report_advanced.report,
    reportErrorMessage: report_advanced.reportErrorMessage,
    reportSentimentList: report_sentiments.report_sentimentsList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postReport: report => {
      dispatch(report_advancedActions.postReport(report));
    },
    getReport: id => {
      dispatch(report_advancedActions.getReport(id));
    },
    putReport: (id, report) => {
      dispatch(report_advancedActions.putReport(id, report));
    },
    clearReport: () => {
      dispatch(report_advancedActions.clearReport());
    },
    getAllReportSentiment: () => {
      dispatch(
        report_sentimentActions.getReportSentimentsList(1, false, false)
      );
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportAdvancedFormView);
