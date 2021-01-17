import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/views/components/Page';
import { authActions as auth } from '../../_actions/auth.actions';
import { isEmpty, isEqual } from 'lodash';
import connect from 'react-redux/es/connect/connect';
import { Redirect } from 'react-router';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoginView = ({
  login,
  loadUser,
  token,
  user,
  isAuthenticated,
  history
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (user && user.id) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    if (!isEmpty(token)) {
      loadUser();
    }

    if (isAuthenticated) {
      history.push('/admin');
    }
  }, [isAuthenticated, token]);

  const onSubmit = values => {
    login(values.username, values.password);
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .max(255)
      .required('Este campo es requerido.'),
    password: Yup.string()
      .max(255)
      .required('Este campo es requerido.')
  });

  const initialValues = {
    username: '',
    password: ''
  };

  return (
    <Page className={classes.root} title="Login">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Autentíquese con sus credenciales
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use su correo o nombre de usuario
                  </Typography>
                </Box>
                {/* <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      color="primary"
                      fullWidth
                      startIcon={<FacebookIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Facebook
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      fullWidth
                      startIcon={<GoogleIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Google
                    </Button>
                  </Grid>
                </Grid> */}
                {/* <Box
                  mt={3}
                  mb={1}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    or login with email address
                  </Typography>
                </Box> */}
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="Correo o Nombre de usuario"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Contraseña"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    // disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Iniciar sesión
                  </Button>
                </Box>
                <Grid className="d-flex" item form="maincomponent" xs>
                  <Typography color="textSecondary" variant="body1">
                    ¿Olvidó su contraseña?{' '}
                    <Link
                      component={RouterLink}
                      to="/auth/forgot-password"
                      variant="h6"
                    >
                      Recuperar
                    </Link>
                  </Typography>
                </Grid>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

const mapStateToProps = state => {
  let errors = [];
  if (state.auth.errors) {
    errors = Object.keys(state.auth.errors).map(field => {
      return { field, message: state.auth.errors[field] };
    });
  }

  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token,
    user: state.auth.user,
    isLoading: state.auth.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => {
      return dispatch(auth.login(username, password));
    },
    loadUser: () => {
      return dispatch(auth.loadUser());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
