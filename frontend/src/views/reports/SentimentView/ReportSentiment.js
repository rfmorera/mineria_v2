// import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { NivoPie } from '../../components/Charts/NivoChart';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, Grid, Paper, Box } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import SentimentRatioChart from './components/SentimentRatioChart';
import SentimentDistribution from './components/SentimentDistribution';
import ReportList from './components/ReportList';
import { report_sentimentActions } from '../../../_actions/report_sentiment.actions';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

const ReportSentiment = ({ className, getData, data, clearData, ...rest }) => {
  let { id } = useParams();
  useEffect(() => {
    let fav_ids = id.split(',');

    getData(fav_ids);
  }, [id]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Container fixed>
      <Grid container spacing={3} p={2}>
        <ReportList
          data={data.data_report_desc}
          start_date={data.min_date}
          end_date={data.max_date}
        />

        <Grid
          container
          xs={12}
          sm={6}
          alignItems="center"
          direction="column"
          justify="flex-start"
        >
          <Box p={3}>
            <Typography variant="h3">Resumen por cantidad</Typography>
          </Box>
          <div>
            <p className="text-center">
              Total de opiniones: <b>{data.total_opiniones}</b>
            </p>
          </div>
          {data.data_total.length === 0 ? (
            <Box p={3}>
              <CircularProgress />
            </Box>
          ) : (
            <Box height="350px" width="100%" component="div">
              <NivoPie data={data.data_total} />
            </Box>
          )}
        </Grid>
      </Grid>

      <SentimentRatioChart
        data={data.data_ratio}
        noTitle={false}
        height={'80vh'}
        pt={0}
      />

      <SentimentDistribution data={data.data_total_report} />
    </Container>
  );
};

function mapStateToProps({ report_sentiments }, ownProps) {
  return {
    data: report_sentiments.dataReport
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getData: ids => {
      dispatch(report_sentimentActions.getReportSentimentData(ids));
    },
    clearData: () => {
      dispatch(report_sentimentActions.clearReportSentiment());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportSentiment);
