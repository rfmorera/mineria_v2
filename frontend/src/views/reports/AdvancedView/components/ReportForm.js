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
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string().required('Este campo es requerido.'),
  description: yup.string().required('Este campo es requerido.'),
  basic_reports: yup.string().required('Este campo es requerido.')
});
const initial_state = { name: '', description: '', basic_reports: null };

const ReportForm = ({ props, history }) => {
  let {
    id,
    creatingReport,
    report,
    reportErrorMessage,
    postReport,
    getReport,
    putReport,
    clearReport,
    reportSentimentList
  } = props;

  const [values, setValues] = useState(initial_state);
  useEffect(() => {
    if (report !== undefined && report.id !== undefined) {
      setValues({
        name: report.name,
        description: report.description,
        basic_reports: report.basic_reports
      });
    } else if (id === undefined) {
      setValues({
        ...values,
        basic_reports: []
      });
    }
  }, [report]);

  const handleBack = event => {
    event.preventDefault();
    clearReport();
    setValues(initial_state);
    history.goBack();
  };

  const onSubmit = values => {
    if (id !== undefined) {
      putReport(id, values);
    } else {
      postReport(values);
      setValues(initial_state);
      clearReport();
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
        setFieldValue,
        isSubmitting,
        touched,
        values
      }) => (
        <Form>
          <Card>
            <CardHeader
              subheader={
                id !== undefined
                  ? 'Editar reporte avanzado'
                  : 'Crear reporte avanzado'
              }
              title="Reporte Avanzado"
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
              {reportSentimentList.length > 0 && values.basic_reports !== null && (
                <Autocomplete
                  multiple
                  id="basic_reports"
                  options={reportSentimentList}
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
                  defaultValue={reportSentimentList.filter(item =>
                    values.basic_reports.some(elem => elem === item.id)
                  )}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Reportes"
                      placeholder="Reportes"
                      margin="normal"
                    />
                  )}
                />
              )}
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

export default withRouter(ReportForm);
