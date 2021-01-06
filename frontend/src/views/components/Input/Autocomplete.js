import React, { useEffect, usePara, useState } from 'react';
import { TextField } from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Autocomplete from '@material-ui/lab/Autocomplete';

const initial_state = { name: '', content: '', source: null };

const EntryAutocomplete = ({
  entry,
  sourcesList,
  touched,
  errors,
  handleBlur,
  handleChange
}) => {
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

  return (
    <div>
      <Field
        name="source"
        component={Autocomplete}
        options={sourcesList}
        getOptionLabel={option => option.name}
        getOptionSelected={(option, value) => option.id === value.id}
        onChange={(event, newValue) => {
          if (newValue === null) setValues({ ...values, source: null });
          else setValues({ ...values, source: newValue.id });
        }}
        error={Boolean(touched.autocomplete && errors.autocomplete)}
        helperText={touched.autocomplete && errors.autocomplete}
        onBlur={handleBlur}
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
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
      <Autocomplete
        value={entry.source}
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
      />
    </div>
  );
};

export default EntryAutocomplete;
