import React, { useEffect, useState } from 'react';
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
import queryString from 'query-string';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const PasswordReset = ({
  match: {
    params: { uid, token }
  },
  history,
  loading,
  error,
  status,
  location,
  resetPasswordConfirm
}) => {
  const classes = useStyles();

  const validationSchema = yup.object({
    new_password: yup
      .string()
      .required('Este campo es requerido.')
      .min(
        8,
        'Esta contraseña es muy corta. Debe contener al menos 8 caracteres.'
      )
      .test('onlyNumbers', 'Esta contraseña solo contiene números.', value => {
        return !/^\d+$/.test(value);
      }),
      re_new_password: yup
      .string()
      .required('Este campo es requerido.')
      .test('pwdEquality', 'Las contraseñas no coinciden.', function() {
        return this.parent.new_password === this.parent.re_new_password;
      })
  });
  const initialValues = {
    new_password: '',
    re_new_password: ''
  };

  const [pageTitle, setPageTitle] = useState('Recuperar contraseña');

  const onSubmit = values => {
    console.log(values.new_password)
    console.log(values.re_new_password)
    resetPasswordConfirm(uid, token, values.new_password, values.re_new_password);
  };

  useEffect(() => {
    const values = queryString.parse(location.search);
    if (values.created) {
      setPageTitle('Establecer contraseña');
    }

    if (!loading) {
      if (error === 400) {
        toast.error(
          'Su token ha sido utilizado o está vencido. Comience el proceso nuevamente.'
        );
        return;
      }
      if (error) {
        toast.error('Ocurrió un error. Inténtelo de nuevo.');
        return;
      }
      if (!error && status === 204) {
        toast.success('Su contraseña ha sido cambiada exitosamente.');
        history.push('/auth/login');
      }
    }
  }, [loading, status, error]);

  return (
    <Page className={classes.root} title={pageTitle}>
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
                    {pageTitle}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Ingrese su nueva contraseña
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.new_password && errors.new_password)}
                  fullWidth
                  helperText={touched.new_password && errors.new_password}
                  label="Contraseña"
                  margin="normal"
                  name="new_password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.new_password}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.re_new_password && errors.re_new_password)}
                  fullWidth
                  helperText={touched.re_new_password && errors.re_new_password}
                  label="Repita la contraseña"
                  margin="normal"
                  name="re_new_password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.re_new_password}
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
                    Aceptar
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
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
    loading: auth.requestingPasswordConfirmReset,
    error: auth.passwordResetConfirmError,
    status: auth.passwordResetConfirmStatus
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetPasswordConfirm: (uid, token, password, password2) =>
      dispatch(auth.passwordResetConfirm(uid, token, password, password2))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);
