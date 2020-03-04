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

export default function AutocompleteFieldFormik({ fieldData }) {

  const { freeSolo, options, getOptionLabel, title, path, placeholder, disabled, hint, warning } = fieldData;

  let name = last(path);
  const { values, setFieldValue, touched, errors } = useFormikContext();
  let error = touched[name] && errors[name] ? errors[name] : "";

  return (
    <div className={classes.flex}>
      <HintWarning hint={warning} isLeft isWarning />
      <Autocomplete
        freeSolo={freeSolo}
        options={options}
        getOptionLabel={(option) => getOptionLabel(option) || ""}
        className={classes.flexGrow}
        // defaultValue={values[name] || ""}
        value={values[name] || ""}
        onChange={(_, val) => setFieldValue(name, val)}
        onInputChange={(_, val) => freeSolo && setFieldValue(name, val)}
        disabled={disabled}
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
