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
import { userActions } from '../../../_actions/user.actions';

const useStyles = makeStyles(theme => ({
  root: {},
  button: {
    marginRight: theme.spacing(1)
  }
}));

const Results = ({
  className,
  users,
  count,
  getUserlists,
  deleteUser,
  history,
  ...rest
}) => {
  const classes = useStyles();
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [limit, setLimit] = useState(10);
  let { pagen } = useParams();
  const [page, setPage] = useState(pagen - 1);

  useEffect(() => {
    setPage(pagen - 1);
  }, [pagen]);

  useEffect(() => {
    getUserlists(pagen);
  }, [pagen]);

  const handleSelectAll = event => {
    let newSelectedUserIds;

    if (event.target.checked) {
      newSelectedUserIds = users.map(user => user.id);
    } else {
      newSelectedUserIds = [];
    }

    setSelectedUserIds(newSelectedUserIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUserIds.indexOf(id);
    let newSelectedUserIds = [];

    if (selectedIndex === -1) {
      newSelectedUserIds = newSelectedUserIds.concat(selectedUserIds, id);
    } else if (selectedIndex === 0) {
      newSelectedUserIds = newSelectedUserIds.concat(selectedUserIds.slice(1));
    } else if (selectedIndex === selectedUserIds.length - 1) {
      newSelectedUserIds = newSelectedUserIds.concat(
        selectedUserIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedUserIds = newSelectedUserIds.concat(
        selectedUserIds.slice(0, selectedIndex),
        selectedUserIds.slice(selectedIndex + 1)
      );
    }

    setSelectedUserIds(newSelectedUserIds);
  };

  const handlePageChange = (event, newPage) => {
    newPage += 1;
    history.push('/admin/users/' + newPage);
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
                    checked={selectedUserIds.length === users.length}
                    color="primary"
                    indeterminate={
                      selectedUserIds.length > 0 &&
                      selectedUserIds.length < users.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Nombre de usuario</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Correo</TableCell>
                <TableCell>Último acceso</TableCell>
                <TableCell>Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(0, limit).map(user => (
                <TableRow
                  hover
                  key={user.id}
                  selected={selectedUserIds.indexOf(user.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUserIds.indexOf(user.id) !== -1}
                      onChange={event => handleSelectOne(event, user.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box alignItems="center" display="flex">
                      <Typography color="textPrimary" variant="body1">
                        {user.username}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {user.first_name} {user.last_name}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.last_login}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className={classes.button}
                      endIcon={<EditIcon />}
                      onClick={() => {
                        history.push('/admin/users/edit/' + user.id);
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
                            '¿Está seguro que desea eliminar esta Usuario?',
                          text: 'Esta operación no se puede deshacer.',
                          icon: 'warning',
                          showCancelButton: true,
                          cancelButtonText: 'Cancelar',
                          confirmButtonText: 'Eliminar'
                        }).then(result => {
                          if (result.value) {
                            deleteUser(user.id);
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
  users: PropTypes.array.isRequired
};

function mapStateToProps({ users }) {
  return {
    loading: users.loadingUsersList,
    users: users.usersList,
    count: users.usersCounter
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUserlists: page => {
      dispatch(userActions.getUsersList(page));
    },
    deleteUser: userId => {
      dispatch(userActions.deleteUser(userId));
    }
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Results)
);
