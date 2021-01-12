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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
  TextFieldProps
} from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string().required('Este campo es requerido.'),
  content: yup.string(),
  date: yup.date(),
  source: yup.string().required('Este campo es requerido.')
});
const initial_state = { name: '', content: '', source: '' };

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
        source: entry.source.id
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
    let data = form;
    console.log(form);
    if (id !== undefined) {
      patchEntry(id, data);
    } else {
      postEntry(data);
      setValues(initial_state);
      clearEntry();
    }
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
              subheader={id !== undefined ? 'Editar entrada' : 'Crear entrada'}
              title="Entrada"
            />
            <Divider />
            <CardContent>
              <TextField
                error={Boolean(touched.name && errors.name)}
                fullWidth
                helperText={touched.name && errors.name}
                label="Nombre"
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
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">
                  Fuente
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="source"
                  name="source"
                  value={values.source}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Fuente"
                >
                  {sourcesList.map((e, idx) => {
                    return <MenuItem value={e.id}>{e.name}</MenuItem>;
                  })}
                </Select>
              </FormControl>
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
