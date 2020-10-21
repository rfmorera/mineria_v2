import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/views/components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import { authActions as auth } from '../../../_actions/auth.actions';
import connect from 'react-redux/es/connect/connect';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Account = ({auth}) => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Account">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <Profile user={auth.user}/>
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <ProfileDetails user={auth.user}/>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
