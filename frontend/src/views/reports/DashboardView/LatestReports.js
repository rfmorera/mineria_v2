import React, { useState, useEffect } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  makeStyles,
  Grid
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { report_sentimentActions } from '../../../_actions/report_sentiment.actions';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  root: {
    height: '100%'
  },
  image: {
    height: 48,
    width: 48
  }
});

const ITEM_HEIGHT = 48;

const LatestReports = ({
  className,
  history,
  loading,
  reportList,
  errorMessage,
  getList,
  order,
  setOrder,
  ...rest
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const open = Boolean(anchorEl);

  const dotsClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const dotsClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (order == 1) {
      getList();
      // setOrder(0);
    }
  }, [order]);

  useEffect(() => {
    if (order == 1) {
      setLoaded(!loading);
    }
  }, [loading]);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        subtitle={`${reportList.length} in total`}
        title="Últimos Reportes Básicos"
      />
      <Divider />
      {!loaded ? (
        <Grid
          container
          item
          xs={12}
          alignItems="center"
          direction="column"
          justify="flex-start"
        >
          <Box p={3}>
            <CircularProgress />
          </Box>
        </Grid>
      ) : (
        <List>
          {reportList.map(
            (report, i) =>
              i < 5 && (
                <ListItem divider={i < reportList.length - 1} key={report.id}>
                  <ListItemAvatar>
                    <img
                      alt="Report"
                      className={classes.image}
                      src={'/static/images/products/product_2.png'}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={report.name}
                    secondary={`${report.description}`}
                  />
                  <IconButton edge="end" size="small" onClick={dotsClick}>
                    <MoreVertIcon />
                  </IconButton>
                  {/*TODO: Asegurar independencia entre los menus, actualmente no funcionan*/}
                  <Menu
                    id={"long-menu-"+report.id}
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={dotsClose}
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch'
                      }
                    }}
                  >
                    <MenuItem
                      key={1}
                      component={RouterLink}
                      to={'/auth/report-sentiment/' + report.id}
                      target="_blank"
                    >
                      Ver
                    </MenuItem>
                    <MenuItem
                      key={1}
                      component={RouterLink}
                      to={'/admin/report-basic/edit/' + report.id}
                    >
                      Editar
                    </MenuItem>
                  </Menu>
                </ListItem>
              )
          )}
        </List>
      )}

      <Divider />
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
          onClick={() => {
            history.push('/admin/report-basic/1');
          }}
        >
          Ver todos
        </Button>
      </Box>
    </Card>
  );
};

LatestReports.propTypes = {
  className: PropTypes.string
};

function mapStateToProps({ report_sentiments }, ownProps) {
  return {
    loading: report_sentiments.loadingReportSentimentsList,
    reportList: report_sentiments.report_sentimentsList,
    errorMessage: report_sentiments.report_sentimentsListErrorMessage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getList: () => {
      dispatch(report_sentimentActions.getReportSentimentsList(1, true, true));
    }
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LatestReports)
);
