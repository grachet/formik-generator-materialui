import React from 'react';
import HintWarning from "../UI/HintWarning";
import {
  TextField,
} from "@material-ui/core";
import { useField } from 'formik';
import {
  Autocomplete,
} from "@material-ui/lab";
import { last } from "../functions/formHelper";
import classes from '../index.css'

let localValue = "";

export default function AutocompleteFieldFormik({ fieldData }) {

  const { freeSolo, options, getOptionLabel, title, path, placeholder, disabled, hint, warning } = fieldData;

  const [{ value }, meta, { setValue }] = useField(path);
  let error = meta.touched && meta.error ? meta.error : "";

  return (
    <div className={classes.flex}>
      <HintWarning hint={warning} isWarning />
      <Autocomplete
        // defaultValue={}
        // loading={loading}
        className={classes.flexGrow}
        disabled={disabled}
        options={options || []}
        getOptionLabel={(option) => getOptionLabel(option) || ""}
        value={value || ""}
        onChange={(_, val) => {
          if (freeSolo) {
            localValue = val
          }
          setValue(val)
        }}
        onClose={() => {
          freeSolo && setValue(localValue)
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
