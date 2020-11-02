import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar';
import TopBar from './TopBar';
import routes from '../../../routes.js';
import { Route, Switch } from 'react-router';
import { withRouter } from 'react-router';
import { authActions as auth } from '../../../_actions/auth.actions';
import { isEmpty } from 'lodash';
import connect from 'react-redux/es/connect/connect';
// import { toast } from 'react-toastify';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const DashboardLayout = ({ auth, loadUser, history, logout }) => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  useEffect(() => {
    if (!isEmpty(auth.token) && isEmpty(auth.user)) {
      loadUser();
    }
    if (isEmpty(auth.token)) {
      denyAccess();
    }
  }, [auth]);

  const denyAccess = () => {
    history.push('/auth');
    toast.error('No posee los permisos suficientes para acceder a estos recursos');
  };

  const getRoutes = routes => {
    let ans = routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
    return ans;
  };

  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} logout={logout} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
        logout={logout}
        user={auth.user}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Switch>{getRoutes(routes)}</Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => {
      return dispatch(auth.loadUser());
    },
    logout: () => {
      return dispatch(auth.logout());
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DashboardLayout)
);
