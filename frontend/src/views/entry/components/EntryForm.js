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
  makeStyles,
  TextFieldProps
} from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Autocomplete from '@material-ui/lab/Autocomplete';

const validationSchema = yup.object({
  name: yup.string().required('Este campo es requerido.'),
  content: yup.string().required('Este campo es requerido.'),
  date: yup.date(),
  source: yup.string().required('Este campo es requerido.')
});
const initial_state = { name: '', content: '', source: null };

const EntryForm = ({ props, history }) => {
  let {
    id,
    creatingEntry,
    entry,
    entryErrorMessage,
    postEntry,
    getEntry,
    patchEntry,
    clearEntry,
    sourcesList
  } = props;

  const [select, setSelect] = useState(-1);
  const [inputValue, setInputValue] = useState('');
  const [values, setValues] = useState(initial_state);
  useEffect(() => {
    if (entry !== undefined && entry.id !== undefined) {
      setInputValue(entry.source.name);

      setValues({
        id: entry.id,
        name: entry.name,
        content: entry.content !== null ? entry.content : '',
        source: entry.source
      });
    }
  }, [entry]);

  const handleBack = event => {
    event.preventDefault();
    clearEntry();
    setValues(initial_state);
    history.goBack();
  };

  const onSubmit = form => {
    // let data = { source: values.source.id, ...form };
    let data = form;
    console.log(form);
    // if (id !== undefined) {
    //   // patchEntry(id, data);
    // } else {
    //   postEntry(data);
    //   setValues(initial_state);
    // clearEntry();
    // }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={values}
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
                error={Boolean(touched.content && errors.content)}
                helperText={touched.content && errors.content}
                fullWidth
                label="Contenido"
                margin="normal"
                name="content"
                type="text"
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.content}
              />
              <Field
                name="source"
                component={Autocomplete}
                options={sourcesList}
                getOptionLabel={option => option.name}
                // getOptionSelected={(option, value) => option.id === value.id}
                // onChange={(event, newValue) => {
                //   if (newValue === null) setValues({ ...values, source: null });
                //   else setValues({ ...values, source: newValue.id });
                // }}
                // error={Boolean(touched.autocomplete && errors.autocomplete)}
                // helperText={touched.autocomplete && errors.autocomplete}
                // onBlur={handleBlur}
                // onChange={handleChange}
                // inputValue={inputValue}
                // onInputChange={(event, newInputValue) => {
                //   setInputValue(newInputValue);
                // }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Fuente"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                )}
              />
              {/* <Autocomplete
                // value={entry.source}
                onChange={(event, newValue) => {
                  setValues({ ...values, source: newValue.id });
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={sourcesList}
                getOptionLabel={option => option.name}
                getOptionSelected={(option, value) => option.id === value.id}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Fuente"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    error={Boolean(touched.source && errors.source)}
                    helperText={touched.source && errors.source}
                  />
                )}
              /> */}
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

export default withRouter(EntryForm);
