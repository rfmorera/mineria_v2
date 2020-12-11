import React, { useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
  colors
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { connect } from 'react-redux';
import { report_sentimentActions } from '../../../_actions/report_sentiment.actions';
import { Pagination } from '@material-ui/lab';
import SentimentRatioChart from '../SentimentView/components/SentimentRatioChart';
import ReportList from '../SentimentView/components/ReportList';

const useStyles = makeStyles(() => ({
  root: {}
}));

const SentimentReportFavorites = ({
  className,
  getFavorites,
  list,
  order,
  setOrder,
  getData,
  data,
  ...rest
}) => {
  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {
    if (order == 0) {
      getFavorites();
    }
  }, []);

  // useEffect(() => {
  //   console.log("comp")
  //   console.log(data.data_ratio)
  //   console.log(typeof data.data_ratio)
  // });

  useEffect(() => {
    if (order != 0) return;
    if (list.length > 0) {
      let fav_ids = list.map(e => e.id);

      getData(fav_ids);
      setOrder(1);
    }
  }, [list]);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        // action={
        //   <Button endIcon={<ArrowDropDownIcon />} size="small" variant="text">
        //     Last 7 days
        //   </Button>
        // }
        title="Reportes de Sentimientos"
      />
      <Divider />
      <CardContent>
        <Box height={400} position="relative">
          {/* <Bar data={data} options={options} /> */}
          <SentimentRatioChart data={data.data_ratio} noTitle={true} />
          <ReportList data={data.data_report_desc}
            total_reports={data.total}
            start_date={data.min_date}
            end_date={data.max_date} />
        </Box>
      </CardContent>
      <Divider />
      {/* <Box display="flex" justifyContent="flex-end" p={2}>
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          Overview
        </Button>
      </Box> */}
    </Card>
  );
};

SentimentReportFavorites.propTypes = {
  className: PropTypes.string
};

function mapStateToProps({ report_sentiments }, ownProps) {
  return {
    loading: report_sentiments.loadingReportSentimentsList,
    data: report_sentiments.dataReport,
    list: report_sentiments.report_sentimentsList,
    listErrorMessage: report_sentiments.report_sentimentsListErrorMessage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getFavorites: () => {
      dispatch(
        report_sentimentActions.getReportSentimentsList(1, false, false, true)
      );
    },
    getData: ids => {
      dispatch(report_sentimentActions.getReportSentimentData(ids));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SentimentReportFavorites);
