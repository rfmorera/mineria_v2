import React, { useEffect, usePara, useState } from 'react';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { userActions } from '../../_actions/user.actions';
import { groupActions } from '../../_actions/group.actions';
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
    clearUser,
    groupsList,
    getAllGroups
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
    console.log("??????????????????????/")
    console.log(id)
    getAllGroups();
  }, [id]);
  id = id === 'add' ? undefined : id;
  return <UserForm props={{ id, ...props }} />;
};

function mapStateToProps({ users, groups }, ownProps) {
  return {
    creatingUser: users.creatingUser,
    user: users.user,
    userErrorMessage: users.userErrorMessage,
    groupsList: groups.groupsList
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
    },
    getAllGroups: () => {
      dispatch(groupActions.getGroupsList(1, false));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserFormView);
