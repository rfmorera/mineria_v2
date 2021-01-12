import React, { useEffect, useState } from 'react';
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
  FormControlLabel,
  Checkbox,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Typography,
  makeStyles,
  TextFieldProps,
  withStyles
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { green } from '@material-ui/core/colors';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { entities } from 'src/_reducers/entity.reducers';
import { entries } from 'lodash';

const validationSchema = yup.object({
  name: yup.string().required('Este campo es requerido.'),
  description: yup.string(),
  favorite: yup.boolean(),
  delta_type: yup.string().required("Este campo es requerido"),
  delta_value: yup.string().required("Este campo es requerido"),
  start_date: yup.string().required("Este campo es requerido")
});
const initial_state = {
  name: '',
  description: '',
  favorite: false,
  entities: null,
  regions: null,
  super_regions: null,
  start_date: '',
  end_date: null,
  delta_type: '',
  delta_value: 1
};

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600]
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

const marks = [
  {
    value: 1,
    label: '1'
  },
  {
    value: 3,
    label: '3'
  },
  {
    value: 6,
    label: '6'
  },
  {
    value: 9,
    label: '9'
  },
  {
    value: 12,
    label: '12'
  },
  {
    value: 15,
    label: '15'
  },
  {
    value: 30,
    label: '30'
  },
  {
    value: 45,
    label: '45'
  },
  {
    value: 60,
    label: '60'
  }
];

const ReportForm = ({ props, history }) => {
  let {
    id,
    creatingReport,
    report,
    reportErrorMessage,
    postReport,
    getReport,
    patchReport,
    clearReport,
    getAllEntitiesList,
    getAllSuperRegionsList,
    getAllRegionsList,
    entitiesList,
    regionList,
    super_regionsList
  } = props;

  const [select, setSelect] = useState([]);
  const [form_state, setValues] = useState(initial_state);

  useEffect(() => {
    if (report !== undefined && report.id !== undefined) {
      setValues({
        id: report.id,
        name: report.name,
        description: report.description !== null ? report.description : '',
        start_date: report.start_date,
        end_date: report.end_date,
        delta_type: report.delta_type,
        delta_value: report.delta_value,
        favorite: report.favorite,
        entities: report.entities,
        regions: report.regions,
        super_regions: report.super_regions
      });
    } else if (id === undefined) {
      setValues({
        ...form_state,
        entities: [],
        regions: [],
        super_regions: []
      });
    }
  }, [report]);

  const handleBack = event => {
    event.preventDefault();
    clearReport();
    setValues(initial_state);
    history.goBack();
  };

  const onSubmit = form => {
    let data = form;
    if (id !== undefined) {
      patchReport(id, data);
    } else {
      postReport(data);
      setValues(initial_state);
      clearReport();
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={form_state}
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
              subheader={id !== undefined ? 'Editar Reporte' : 'Crear Reporte'}
              title="Reporte"
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
              <TextField
                id="start_date"
                name="start_date"
                margin="normal"
                label="Fecha Inicio"
                type="datetime-local"
                value={values.start_date}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                id="end_date"
                name="end_date"
                margin="normal"
                label="Fecha Fin"
                type="datetime-local"
                value={values.end_date}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">
                  Delta
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="delta_type"
                  name="delta_type"
                  value={values.delta_type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Delta"
                >
                  <MenuItem value="hora">Hora</MenuItem>
                  <MenuItem value="dia">Dia</MenuItem>
                  <MenuItem value="semana">Semana</MenuItem>
                  <MenuItem value="mes">Mes</MenuItem>
                  <MenuItem value="anno">Año</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" fullWidth>
                <Box component="span" mt={2} mb={2}>
                  <Typography id="discrete-slider-always" gutterBottom>
                    Intervalo
                  </Typography>
                </Box>

                <Slider
                  defaultValue={values.delta_value}
                  aria-labelledby="discrete-slider-always"
                  name="delta_value"
                  id="delta_value"
                  value={values.delta_value}
                  onChange={(e, v) => {
                    setFieldValue('delta_value', v);
                  }}
                  onBlur={handleBlur}
                  step={1}
                  marks={marks}
                  valueLabelDisplay="on"
                  min={1}
                  max={60}
                />
              </FormControl>

              <FormControlLabel
                fullWidth
                margin="normal"
                control={
                  <GreenCheckbox
                    checked={values.favorite}
                    onChange={handleChange}
                    name="favorite"
                  />
                }
                label="Favorito"
              />
              {entitiesList.length > 0 && values.entities !== null && (
                <Autocomplete
                  multiple
                  limitTags={5}
                  id="entities"
                  options={entitiesList}
                  onBlur={handleBlur}
                  onChange={(e, v) => {
                    setFieldValue(
                      'entities',
                      v.map(item => item.id)
                    );
                  }}
                  getOptionLabel={option => option.name}
                  defaultValue={entitiesList.filter(item =>
                    values.entities.some(elem => elem === item.id)
                  )}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Entidades"
                      placeholder="Entidades"
                      margin="normal"
                    />
                  )}
                />
              )}
              {regionList.length > 0 && values.regions !== null && (
                <Autocomplete
                  multiple
                  limitTags={5}
                  id="regions"
                  options={regionList}
                  onBlur={handleBlur}
                  onChange={(e, v) => {
                    setFieldValue(
                      'regions',
                      v.map(item => item.id)
                    );
                  }}
                  getOptionLabel={option => option.name}
                  defaultValue={regionList.filter(item =>
                    values.regions.some(elem => elem === item.id)
                  )}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Municipios"
                      placeholder="Municipios"
                      margin="normal"
                    />
                  )}
                />
              )}
              {super_regionsList.length > 0 && values.super_regions !== null && (
                <Autocomplete
                  multiple
                  limitTags={5}
                  id="super_regions"
                  options={super_regionsList}
                  onBlur={handleBlur}
                  onChange={(e, v) => {
                    setFieldValue(
                      'super_regions',
                      v.map(item => item.id)
                    );
                  }}
                  getOptionLabel={option => option.name}
                  defaultValue={super_regionsList.filter(item =>
                    values.super_regions.some(elem => elem === item.id)
                  )}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Provincias"
                      placeholder="Provincias"
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
