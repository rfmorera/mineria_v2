import React, { useEffect, usePara, useState } from 'react';
import { withRouter } from 'react-router';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Checkbox,
  FormControlLabel,
  makeStyles,
  withStyles
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600]
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

const validationSchema = yup.object({
  username: yup.string().required('Este campo es requerido.'),
  email: yup.string().required('Este campo es requerido.'),
  first_name: yup.string().required('Este campo es requerido.'),
  last_name: yup.string().required('Este campo es requerido.')
});
const initial_state = {
  username: '',
  email: '',
  first_name: '',
  last_name: '',
  groups: null,
  is_active: false
};

const UserForm = ({ props, history }) => {
  let {
    id,
    creatingUser,
    user,
    userErrorMessage,
    postUser,
    getUser,
    putUser,
    patchUser,
    clearUser,
    groupsList
  } = props;

  const [values, setValues] = useState(initial_state);
  useEffect(() => {
    if (user !== undefined) {
      setValues({
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        is_active: user.is_active,
        groups: user.groups
      });
    } else if (id === undefined) {
      setValues({
        ...values,
        groups: []
      });
    }
  }, [user]);

  const handleBack = event => {
    event.preventDefault();
    clearUser();
    setValues(initial_state);
    history.goBack();
  };

  const onSubmit = values => {
    console.log(values);
    console.log(values);
    if (id !== undefined) {
      patchUser(id, values);
    } else {
      postUser(values);
      setValues(initial_state);
      clearUser();
    }
  };
  return (
    <Formik
      enableReinitialize
      initialValues={values}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      // handleChange={onChange}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        touched,
        values
      }) => (
        <Form>
          <Card>
            <CardHeader
              subheader={id !== undefined ? 'Editar usuario' : 'Crear usuario'}
              title="Usuario"
            />
            <Divider />
            <CardContent>
              <TextField
                error={Boolean(touched.username && errors.username)}
                fullWidth
                helperText={touched.username && errors.username}
                label="Nombre de usuario"
                margin="normal"
                name="username"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.username}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                fullWidth
                label="Correo electrónico"
                margin="normal"
                name="email"
                type="text"
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
              />
              <TextField
                error={Boolean(touched.first_name && errors.first_name)}
                helperText={touched.first_name && errors.first_name}
                fullWidth
                label="Nombre(s)"
                margin="normal"
                name="first_name"
                type="text"
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.first_name}
              />
              <TextField
                error={Boolean(touched.last_name && errors.last_name)}
                helperText={touched.last_name && errors.last_name}
                fullWidth
                label="Apellidos"
                margin="normal"
                name="last_name"
                type="text"
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.last_name}
              />
              {groupsList.length > 0 &&
                values.groups !== undefined &&
                values.groups !== null && (
                  <Autocomplete
                    multiple
                    id="groups"
                    name="groups"
                    options={groupsList}
                    filterSelectedOptions
                    freeSolo
                    onBlur={handleBlur}
                    onChange={(e, v) => {
                      setFieldValue(
                        'basic_reports',
                        v.map(item => item.id)
                      );
                    }}
                    getOptionLabel={option => option.name}
                    defaultValue={groupsList.filter(item =>
                      values.groups.some(elem => elem === item.id)
                    )}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Grupos"
                        placeholder="Grupos"
                        margin="normal"
                      />
                    )}
                  />
                )}
              <FormControlLabel
                fullWidth
                margin="normal"
                control={
                  <GreenCheckbox
                    checked={values.is_active}
                    onChange={handleChange}
                    name="is_active"
                  />
                }
                label="Activo"
              />
            </CardContent>
            <Divider />
            <Box display="flex" justifyContent="flex-end" mr="16px" py={2}>
              <Box mr={2}>
                <Button
                  color="neutral"
                  variant="contained"
                  onClick={handleBack}
                >
                  Atrás
                </Button>
              </Box>

              <Button color="primary" variant="contained" type="submit">
                Guardar
              </Button>
            </Box>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export default withRouter(UserForm);
