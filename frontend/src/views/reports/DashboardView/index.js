import React, { useState } from 'react';
import { Container, Grid, makeStyles, Hidden } from '@material-ui/core';
import Page from 'src/views/components/Page';
import Budget from './Budget';
import LatestOrders from './LatestOrders';
import LatestReports from './LatestReports';
import SentimentReportFavorites from './SentimentReportFavorites';
import TasksProgress from './TasksProgress';
import TotalCustomers from './TotalCustomers';
import TotalProfit from './TotalProfit';
import SentimentCounter from './SentimentCounter';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const [order1, setOrder1] = useState(0);
  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          {/* <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Budget />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalCustomers />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TasksProgress />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalProfit />
          </Grid> */}
          <Hidden smDown>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <SentimentReportFavorites order={order1} setOrder={setOrder1} />
            </Grid>
          </Hidden>

          <Grid item lg={4} md={6} xl={3} xs={12}>
            <SentimentCounter />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <LatestReports order={order1} setOrder={setOrder1} />
          </Grid>
          {/* <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
