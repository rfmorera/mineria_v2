import React, { useEffect, usePara, useState } from 'react';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { userActions } from '../../_actions/user.actions';
import UserForm from './components/UserForm';
const UserFormView = props => {
  let {
    creatingUser,
    user,
    userErrorMessage,
    postUser,
    getUser,
    putUser,
    patchUser,
    clearUser
  } = props;
  let { id } = useParams();
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (id !== 'add' && id !== undefined) {
      getUser(id);
      setUpdating(true);
    } else {
      setUpdating(false);
    }
  }, id);
  id = id === 'add' ? undefined : id;
  return (
    <UserForm props={{ id, groupsList: [{ id: 12, name: 'asd' }], ...props }} />
  );
};

function mapStateToProps({ users }, ownProps) {
  return {
    creatingUser: users.creatingUser,
    user: users.user,
    userErrorMessage: users.userErrorMessage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postUser: user => {
      dispatch(userActions.postUser(user));
    },
    getUser: id => {
      dispatch(userActions.getUser(id));
    },
    putUser: (id, user) => {
      dispatch(userActions.putUser(id, user));
    },
    patchUser: (id, user) => {
      dispatch(userActions.patchUser(id, user));
    },
    clearUser: () => {
      dispatch(userActions.clearUser());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserFormView);
