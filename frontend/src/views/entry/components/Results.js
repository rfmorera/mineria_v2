import { connect } from 'react-redux';
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
import EditIcon from '@material-ui/icons/Edit';
import getInitials from 'src/utils/getInitials';
import { PAGINATION_ELEMENTS_COUNT } from '../../../_constants/global';
import { entryActions } from '../../../_actions/entry.actions';

const useStyles = makeStyles(theme => ({
  root: {},
  button: {
    marginRight: theme.spacing(1)
  }
}));

const Results = ({
  className,
  entries,
  count,
  getEntrieslists,
  deleteEntry,
  history,
  ...rest
}) => {
  const classes = useStyles();
  const [selectedEntryIds, setSelectedEntryIds] = useState([]);
  const [limit, setLimit] = useState(10);
  let { pagen } = useParams();
  const [page, setPage] = useState(pagen - 1);

  useEffect(() => {
    setPage(pagen - 1);
  }, [pagen]);

  useEffect(() => {
    getEntrieslists(pagen);
  }, [pagen]);

  const handleSelectAll = event => {
    let newSelectedEntryIds;

    if (event.target.checked) {
      newSelectedEntryIds = entries.map(entry => entry.id);
    } else {
      newSelectedEntryIds = [];
    }

    setSelectedEntryIds(newSelectedEntryIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedEntryIds.indexOf(id);
    let newSelectedEntryIds = [];

    if (selectedIndex === -1) {
      newSelectedEntryIds = newSelectedEntryIds.concat(selectedEntryIds, id);
    } else if (selectedIndex === 0) {
      newSelectedEntryIds = newSelectedEntryIds.concat(
        selectedEntryIds.slice(1)
      );
    } else if (selectedIndex === selectedEntryIds.length - 1) {
      newSelectedEntryIds = newSelectedEntryIds.concat(
        selectedEntryIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedEntryIds = newSelectedEntryIds.concat(
        selectedEntryIds.slice(0, selectedIndex),
        selectedEntryIds.slice(selectedIndex + 1)
      );
    }

    setSelectedEntryIds(newSelectedEntryIds);
  };

  const handlePageChange = (event, newPage) => {
    newPage += 1;
    history.push('/admin/entries/' + newPage);
  };
  console.log(entries)
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedEntryIds.length === entries.length}
                    color="primary"
                    indeterminate={
                      selectedEntryIds.length > 0 &&
                      selectedEntryIds.length < entries.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Contenido</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Fuente</TableCell>
                <TableCell>Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entries.slice(0, limit).map(entry => (
                <TableRow
                  hover
                  key={entry.id}
                  selected={selectedEntryIds.indexOf(entry.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedEntryIds.indexOf(entry.id) !== -1}
                      onChange={event => handleSelectOne(event, entry.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box alignItems="center" display="flex">
                      <Typography color="textPrimary" variant="body1">
                        {entry.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{entry.content.substr(0, 25)}...</TableCell>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.source.name}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className={classes.button}
                      endIcon={<EditIcon />}
                      onClick={() => {
                        history.push('/admin/entries/edit/' + entry.id);
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
                          title: '¿Está seguro que desea eliminar esta Entrada?',
                          text: 'Esta operación no se puede deshacer.',
                          icon: 'warning',
                          showCancelButton: true,
                          cancelButtonText: 'Cancelar',
                          confirmButtonText: 'Eliminar'
                        }).then(result => {
                          if (result.value) {
                            deleteEntry(entry.id);
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
  entries: PropTypes.array.isRequired
};

function mapStateToProps({ entries }) {
  return {
    loading: entries.loadingEntrysList,
    entries: entries.entriesList,
    count: entries.entriesCounter
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getEntrieslists: page => {
      dispatch(entryActions.getEntriesList(page));
    },
    deleteEntry: entryId => {
      dispatch(entryActions.deleteEntry(entryId));
    }
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Results)
);
