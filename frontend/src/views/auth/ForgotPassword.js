import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
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
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { authActions as auth } from '../../_actions/auth.actions';
import connect from 'react-redux/es/connect/connect';
import { Link as RouterLink } from 'react-router-dom';
import { authConstants } from '../../_constants/auth.constants';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const validationSchema = yup.object({
  email: yup
    .string()
    .email('El correo no es válido.')
    .required('El correo es un campo requerido.')
});

const ForgotPassword = ({
  loading,
  status,
  error,
  resetPassword,
  history,
  passwordResetCompleted
}) => {
  const classes = useStyles();

  const initialValues = {
    email: ''
  };
  const onSubmit = values => {
    resetPassword(values.email);
  };
  useEffect(() => {
    if (!loading) {
      if (error || ![204, ''].includes(status)) {
        toast.error('Su correo no está registrado.');
      }
      if (!error && status === 204) {
        passwordResetCompleted();
        history.push('/auth/password-reset-success');
      }
    }
  }, [loading, status, error]);

  return (
    <Page className={classes.root} title="Contraseña Perdida">
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
                    Recupere su contraseña
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use su correo
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Correo"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.email}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Recuperar contraseña
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Recuerda su contraseña?{' '}
                  <Link component={RouterLink} to="/register" variant="h6">
                    Inicie sesión
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

function mapStateToProps({ auth }) {
  return {
    loading: auth.requestingPasswordReset,
    error: auth.passwordResetError,
    status: auth.passwordResetStatus
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetPassword: email => dispatch(auth.passwordReset(email)),
    passwordResetCompleted: () => {
      dispatch({ type: authConstants.PASSWORD_RESET_COMPLETED });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
