import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIcon from '@material-ui/icons/Phone';
import TabletIcon from '@material-ui/icons/Tablet';
import LinearProgress from '@material-ui/core/LinearProgress';

import { sentimentActions } from '../../../_actions/sentiment.actions';
import { connect } from 'react-redux';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const SentimentCounter = ({
  className,
  loading,
  counter,
  counterErrorMessage,
  getCounter,
  ...rest
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [loaded, setLoaded] = useState(false);

  const [data, setData] = useState({
    datasets: [
      {
        data: [],
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
          colors.orange[600]
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['Positiva', 'Negativas', 'Neutras']
  });

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const [distribution, setDistribution] = useState([
    {
      title: 'Total',
      value: 555,
      icon: LaptopMacIcon,
      color: colors.indigo[500]
    },
    {
      title: 'Positiva',
      value: 63,
      icon: LaptopMacIcon,
      color: colors.indigo[500]
    },
    {
      title: 'Negativas',
      value: 15,
      icon: TabletIcon,
      color: colors.red[600]
    },
    {
      title: 'Neutras',
      value: 23,
      icon: PhoneIcon,
      color: colors.orange[600]
    }
  ]);

  useEffect(() => {
    getCounter();
  }, []);

  useEffect(() => {
    if (counter.total !== undefined) {
      let ids = ['total', 'positive', 'negative', 'neutral'];

      distribution.map((element, idx) => {
        element.value = counter[ids[idx]];
      });

      data.datasets[0].data = [
        parseInt(counter.positive),
        counter.negative,
        counter.neutral
      ];
      setDistribution(distribution);
      setData(data);
      setLoaded(true);
    }
  }, [counter]);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Distribución de opiniones" />
      <Divider />
      <CardContent>
        <Box
          container
          item
          height={300}
          position="relative"
          alignItems="center"
          direction="column"
          justify="flex-start"
        >
          {!loaded ? (
            <Box width="100%">
              <LinearProgress />
            </Box>
          ) : (
            <Doughnut data={data} options={options} />
          )}
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          {distribution.map(({ color, icon: Icon, title, value }) => (
            <Box key={title} p={1} textAlign="center">
              <Icon color="action" />
              <Typography color="textPrimary" variant="body1">
                {title}
              </Typography>
              <Typography style={{ color }} variant="h2">
                {value}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

SentimentCounter.propTypes = {
  className: PropTypes.string
};

function mapStateToProps({ sentiment }, ownProps) {
  return {
    loading: sentiment.loadingCounter,
    counter: sentiment.counter,
    counterErrorMessage: sentiment.counterErrorMessage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCounter: () => {
      dispatch(sentimentActions.getCounter());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SentimentCounter);
