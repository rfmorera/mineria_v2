import { connect } from 'react-redux';
import { NavLink as RouterLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { withRouter, useParams } from 'react-router';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Swal from 'sweetalert2';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import { PAGINATION_ELEMENTS_COUNT } from '../../../../_constants/global';
import { report_sentimentActions } from '../../../../_actions/report_sentiment.actions';

const useStyles = makeStyles(theme => ({
  root: {},
  button: {
    marginRight: theme.spacing(1)
  }
}));

const Results = ({
  className,
  report_sentiments,
  count,
  getReportSentimentlists,
  deleteReportSentiment,
  selectedReportSentimentIds,
  setSelectedReportSentimentIds,
  clearReports,
  history,
  ...rest
}) => {
  const classes = useStyles();

  const [limit, setLimit] = useState(10);
  let { pagen } = useParams();
  const [page, setPage] = useState(pagen - 1);

  useEffect(() => {
    setPage(pagen - 1);
  }, [pagen]);

  useEffect(() => {
    getReportSentimentlists(pagen);
    return function cleanup() {
      clearReports();
    };
  }, [pagen]);

  const handleSelectAll = event => {
    let newSelectedReportSentimentIds;

    if (event.target.checked) {
      newSelectedReportSentimentIds = report_sentiments.map(
        report_sentiment => report_sentiment.id
      );
    } else {
      newSelectedReportSentimentIds = [];
    }

    setSelectedReportSentimentIds(newSelectedReportSentimentIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedReportSentimentIds.indexOf(id);
    let newSelectedReportSentimentIds = [];

    if (selectedIndex === -1) {
      newSelectedReportSentimentIds = newSelectedReportSentimentIds.concat(
        selectedReportSentimentIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedReportSentimentIds = newSelectedReportSentimentIds.concat(
        selectedReportSentimentIds.slice(1)
      );
    } else if (selectedIndex === selectedReportSentimentIds.length - 1) {
      newSelectedReportSentimentIds = newSelectedReportSentimentIds.concat(
        selectedReportSentimentIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedReportSentimentIds = newSelectedReportSentimentIds.concat(
        selectedReportSentimentIds.slice(0, selectedIndex),
        selectedReportSentimentIds.slice(selectedIndex + 1)
      );
    }

    setSelectedReportSentimentIds(newSelectedReportSentimentIds);
  };

  const handlePageChange = (event, newPage) => {
    newPage += 1;
    history.push('/admin/report_sentiments/' + newPage);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={
                      selectedReportSentimentIds.length ===
                      report_sentiments.length
                    }
                    color="primary"
                    indeterminate={
                      selectedReportSentimentIds.length > 0 &&
                      selectedReportSentimentIds.length <
                        report_sentiments.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Fecha Inicio</TableCell>
                <TableCell>Fecha Fin</TableCell>
                <TableCell>Frecuencia</TableCell>
                <TableCell>Salto</TableCell>
                <TableCell>Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {report_sentiments.slice(0, limit).map(report_sentiment => (
                <TableRow
                  hover
                  key={report_sentiment.id}
                  selected={
                    selectedReportSentimentIds.indexOf(report_sentiment.id) !==
                    -1
                  }
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={
                        selectedReportSentimentIds.indexOf(
                          report_sentiment.id
                        ) !== -1
                      }
                      onChange={event =>
                        handleSelectOne(event, report_sentiment.id)
                      }
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box alignItems="center" display="flex">
                      <Typography color="textPrimary" variant="body1">
                        {report_sentiment.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{report_sentiment.description}</TableCell>
                  <TableCell>{report_sentiment.start_date}</TableCell>
                  <TableCell>{report_sentiment.end_date}</TableCell>
                  <TableCell>{report_sentiment.delta_type}</TableCell>
                  <TableCell>{report_sentiment.delta_value}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className={classes.button}
                      component={RouterLink}
                      to={'/auth/report-sentiment/' + report_sentiment.id}
                      target="_blank"
                      // endIcon={<VisibilityIcon />}
                      // onClick={() => {
                      //   history.push(
                      //     '/admin/report-sentiment/' + report_sentiment.id
                      //   );
                      // }}
                    >
                      {/* Ver */}
                      <VisibilityIcon />
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className={classes.button}
                      endIcon={<EditIcon />}
                      onClick={() => {
                        history.push(
                          '/admin/report-basic/edit/' + report_sentiment.id
                        );
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      className={classes.button}
                      startIcon={<DeleteIcon />}
                      onClick={e => {
                        e.preventDefault();
                        Swal.fire({
                          title:
                            '¿Está seguro que desea eliminar este Reporte?',
                          text: 'Esta operación no se puede deshacer.',
                          icon: 'warning',
                          showCancelButton: true,
                          cancelButtonText: 'Cancelar',
                          confirmButtonText: 'Eliminar'
                        }).then(result => {
                          if (result.value) {
                            deleteReportSentiment(report_sentiment.id);
                            // TODO: after delete retrieve the page, currently the list request go first than delete and the response is outdate
                          }
                          return result;
                        });
                      }}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      {count > PAGINATION_ELEMENTS_COUNT && (
        <TablePagination
          component="div"
          count={count}
          onChangePage={handlePageChange}
          page={page}
          rowsPerPage={PAGINATION_ELEMENTS_COUNT}
          rowsPerPageOptions={PAGINATION_ELEMENTS_COUNT}
        />
      )}
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  report_sentiments: PropTypes.array.isRequired
};

function mapStateToProps({ report_sentiments }) {
  return {
    loading: report_sentiments.loadingReportSentimentsList,
    report_sentiments: report_sentiments.report_sentimentsList,
    count: report_sentiments.report_sentimentsCounter
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getReportSentimentlists: page => {
      dispatch(report_sentimentActions.getReportSentimentsList(page));
    },
    deleteReportSentiment: report_sentimentId => {
      dispatch(
        report_sentimentActions.deleteReportSentiment(report_sentimentId)
      );
    },
    clearReports: () => {
      dispatch(report_sentimentActions.clearReportSentiment());
    }
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Results)
);
