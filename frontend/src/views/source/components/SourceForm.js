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
  makeStyles
} from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string().required('Este campo es requerido.'),
  description: yup.string().required('Este campo es requerido.')
});
const initial_state = { name: '', description: '' };

const SourceForm = ({ props, history }) => {
  let {
    id,
    creatingSource,
    source,
    sourceErrorMessage,
    postSource,
    getSource,
    putSource,
    clearSource
  } = props;

  const [values, setValues] = useState(initial_state);
  useEffect(() => {
    if (source !== undefined) {
      setValues({
        name: source.name,
        description: source.description
      });
    }
  }, [source]);

  const handleBack = event => {
    event.preventDefault();
    clearSource();
    setValues(initial_state);
    history.goBack();
  };

  const onSubmit = values => {
    if (id !== undefined) {
      putSource(id, values);
    } else {
      postSource(values);
      setValues(initial_state);
      clearSource();
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
        touched,
        values
      }) => (
        <Form>
          <Card>
            <CardHeader
              subheader={id !== undefined ? 'Editar fuente' : 'Crear fuente'}
              title="Fuente"
            />
            <Divider />
            <CardContent>
              <TextField
                error={Boolean(touched.name && errors.name)}
                fullWidth
                helperText={touched.name && errors.name}
                label="Correo o Nombre de usuario"
                margin="normal"
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.name}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.description && errors.description)}
                helperText={touched.description && errors.description}
                fullWidth
                label="Descripción"
                margin="normal"
                name="description"
                type="text"
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
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

export default withRouter(SourceForm);
