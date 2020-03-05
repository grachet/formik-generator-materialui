import React from 'react';
import HintWarning from "../UI/HintWarning";
import {
  TextField,
} from "@material-ui/core";
import { useFormikContext } from 'formik';
import {
  Autocomplete,
} from "@material-ui/lab";
import { last } from "../functions/formHelper";
import classes from '../index.css'

let localValue = "";

export default function AutocompleteFieldFormik({ fieldData }) {

  const { freeSolo, options, getOptionLabel, title, path, placeholder, disabled, hint, warning } = fieldData;

  let name = last(path);
  const { values, setFieldValue, touched, errors } = useFormikContext();
  let error = touched[name] && errors[name] ? errors[name] : "";

  return (
    <div className={classes.flex}>
      <HintWarning hint={warning} isWarning />
      <Autocomplete
        // defaultValue={values[name] || ""}
        // loading={loading}
        className={classes.flexGrow}
        disabled={disabled}
        options={options || []}
        getOptionLabel={(option) => getOptionLabel(option) || ""}
        value={values[name] || ""}
        onChange={(_, val) => {
          if (freeSolo) {
            localValue = val
          }
          setFieldValue(name, val)
        }}
        onClose={() => {
          freeSolo && setFieldValue(name, localValue)
        }}
        freeSolo={freeSolo}
        onInputChange={(_, val) => {
          if (freeSolo) {
            localValue = val
          }
        }}
        renderInput={params => (<TextField
          {...params}
          margin={"dense"}
          error={!!error}
          helperText={error}
          label={title}
          fullWidth
          variant={disabled ? "filled" : "outlined"}
          placeholder={placeholder}
        />)}
      />
      <HintWarning hint={hint} />
    </div>
  )
};
