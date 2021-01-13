import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { withRouter, useParams } from 'react-router';
import { NavLink as RouterLink } from 'react-router-dom';
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
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import getInitials from 'src/utils/getInitials';
import { PAGINATION_ELEMENTS_COUNT } from '../../../../_constants/global';
import { report_advancedActions } from '../../../../_actions/report_advanced.actions';

const useStyles = makeStyles(theme => ({
  root: {},
  button: {
    marginRight: theme.spacing(1)
  }
}));

const Results = ({
  className,
  reports,
  count,
  getReportlists,
  deleteReport,
  history,
  ...rest
}) => {
  const classes = useStyles();
  const [selectedReportIds, setSelectedReportIds] = useState([]);
  const [limit, setLimit] = useState(10);
  let { pagen } = useParams();
  const [page, setPage] = useState(pagen - 1);

  useEffect(() => {
    setPage(pagen - 1);
  }, [pagen]);

  useEffect(() => {
    getReportlists(pagen);
  }, [pagen]);

  const handleSelectAll = event => {
    let newSelectedReportIds;

    if (event.target.checked) {
      newSelectedReportIds = reports.map(report => report.id);
    } else {
      newSelectedReportIds = [];
    }

    setSelectedReportIds(newSelectedReportIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedReportIds.indexOf(id);
    let newSelectedReportIds = [];

    if (selectedIndex === -1) {
      newSelectedReportIds = newSelectedReportIds.concat(selectedReportIds, id);
    } else if (selectedIndex === 0) {
      newSelectedReportIds = newSelectedReportIds.concat(
        selectedReportIds.slice(1)
      );
    } else if (selectedIndex === selectedReportIds.length - 1) {
      newSelectedReportIds = newSelectedReportIds.concat(
        selectedReportIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedReportIds = newSelectedReportIds.concat(
        selectedReportIds.slice(0, selectedIndex),
        selectedReportIds.slice(selectedIndex + 1)
      );
    }

    setSelectedReportIds(newSelectedReportIds);
  };

  const handlePageChange = (event, newPage) => {
    newPage += 1;
    history.push('/admin/reports/' + newPage);
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
                    checked={selectedReportIds.length === reports.length}
                    color="primary"
                    indeterminate={
                      selectedReportIds.length > 0 &&
                      selectedReportIds.length < reports.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.slice(0, limit).map(report => (
                <TableRow
                  hover
                  key={report.id}
                  selected={selectedReportIds.indexOf(report.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedReportIds.indexOf(report.id) !== -1}
                      onChange={event => handleSelectOne(event, report.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box alignItems="center" display="flex">
                      <Typography color="textPrimary" variant="body1">
                        {report.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{report.description}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className={classes.button}
                      component={RouterLink}
                      to={'/auth/report-sentiment/' + report.basic_reports.join()}
                      target="_blank"
                    >
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
                          '/admin/report-advanced/edit/' + report.id
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
                          title: '¿Está seguro que desea eliminar esta Fuente?',
                          text: 'Esta operación no se puede deshacer.',
                          icon: 'warning',
                          showCancelButton: true,
                          cancelButtonText: 'Cancelar',
                          confirmButtonText: 'Eliminar'
                        }).then(result => {
                          if (result.value) {
                            deleteReport(report.id);
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
  reports: PropTypes.array.isRequired
};

function mapStateToProps({ report_advanced }) {
  return {
    loading: report_advanced.loadingReportsList,
    reports: report_advanced.reportsList,
    count: report_advanced.reportsCounter
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getReportlists: page => {
      dispatch(report_advancedActions.getReportsList(page));
    },
    deleteReport: reportId => {
      dispatch(report_advancedActions.deleteReport(reportId));
    }
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Results)
);
