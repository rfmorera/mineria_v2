import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
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
import { PAGINATION_ELEMENTS_COUNT } from '../../_constants/global';

const useStyles = makeStyles(theme => ({
  root: {},
  button: {
    marginRight: theme.spacing(1)
  }
}));

const Results = ({ className, sources, count, getSourcelists, ...rest }) => {
  const classes = useStyles();
  const [selectedSourceIds, setSelectedSourceIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    let newSelectedSourceIds;

    if (event.target.checked) {
      newSelectedSourceIds = sources.map(source => sources.id);
    } else {
      newSelectedSourceIds = [];
    }

    setSelectedSourceIds(newSelectedSourceIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedSourceIds.indexOf(id);
    let newSelectedSourceIds = [];

    if (selectedIndex === -1) {
      newSelectedSourceIds = newSelectedSourceIds.concat(selectedSourceIds, id);
    } else if (selectedIndex === 0) {
      newSelectedSourceIds = newSelectedSourceIds.concat(
        selectedSourceIds.slice(1)
      );
    } else if (selectedIndex === selectedSourceIds.length - 1) {
      newSelectedSourceIds = newSelectedSourceIds.concat(
        selectedSourceIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedSourceIds = newSelectedSourceIds.concat(
        selectedSourceIds.slice(0, selectedIndex),
        selectedSourceIds.slice(selectedIndex + 1)
      );
    }

    setSelectedSourceIds(newSelectedSourceIds);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    if (sources.length < parseInt(count)) getSourcelists(newPage + 1);
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
                    checked={selectedSourceIds.length === sources.length}
                    color="primary"
                    indeterminate={
                      selectedSourceIds.length > 0 &&
                      selectedSourceIds.length < sources.length
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
              {sources.slice(0, limit).map(source => (
                <TableRow
                  hover
                  key={source.id}
                  selected={selectedSourceIds.indexOf(source.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedSourceIds.indexOf(source.id) !== -1}
                      onChange={event => handleSelectOne(event, source.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box alignItems="center" display="flex">
                      <Typography color="textPrimary" variant="body1">
                        {source.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{source.description}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className={classes.button}
                      endIcon={<EditIcon />}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      className={classes.button}
                      startIcon={<DeleteIcon />}
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
  sources: PropTypes.array.isRequired
};

export default Results;
