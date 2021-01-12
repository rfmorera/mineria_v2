import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { report_sentimentActions } from '../../../_actions/report_sentiment.actions';
import { entityActions } from '../../../_actions/entity.actions';
import { regionActions } from '../../../_actions/region.actions';
import { super_regionActions } from '../../../_actions/super_region.actions';
import ReportForm from './components/ReportForm';

const ReportFormView = props => {
  let {
    creatingReport,
    report,
    reportErrorMessage,
    postReport,
    getReport,
    patchReport,
    clearReport,
    getAllEntitiesList,
    getAllSuperRegionsList,
    getAllRegionsList,
    entitiesList,
    regionList,
    super_regionsList
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
    getAllEntitiesList();
    getAllSuperRegionsList();
    getAllRegionsList();

  }, [id]);
  id = id === 'add' ? undefined : id;

  return <ReportForm props={{ id, ...props }} />;
};

function mapStateToProps({ report_sentiments, entities, regions, super_regions }, ownProps) {
  return {
    creatingReport: report_sentiments.creatingReportSentiment,
    report: report_sentiments.report_sentiment,
    reportErrorMessage: report_sentiments.deletingReportSentimentErrorMessage,
    entitiesList: entities.entitiesList,
    regionList: regions.regionsList,
    super_regionsList: super_regions.super_regionsList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postReport: report => {
      dispatch(report_sentimentActions.postReportSentiment(report));
    },
    getReport: id => {
      dispatch(report_sentimentActions.getReportSentiment(id));
    },
    patchReport: (id, report) => {
      dispatch(report_sentimentActions.patchReportSentiment(id, report));
    },
    clearReport: () => {
      dispatch(report_sentimentActions.clearReportSentiment());
    },
    getAllSuperRegionsList: () => {
      dispatch(super_regionActions.getSuperRegionsList(0, false));
    },
    getAllRegionsList: () => {
      dispatch(regionActions.getRegionsList(0, false));
    },
    getAllEntitiesList: () => {
      dispatch(entityActions.getEntitiesList(0, false));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportFormView);
