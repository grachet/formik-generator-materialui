import React from 'react';
import HintWarning from "../UI/HintWarning";
import {
  TextField,
} from "@material-ui/core";
import { useField } from 'formik';
import { last } from '../functions/formHelper';
import classes from '../index.css'

export default function TextFieldFormik({ fieldData }) {


  const { title, path, disabled, value, hint, warning, required, multiline, link } = fieldData;


  let name = last(path);
  const [field, meta] = useField(name);

  let error = meta.touched && meta.error ? meta.error : "";

  return (
    <div className={classes.flex}>
      <HintWarning hint={warning} isLeft isWarning />
      <TextField
        name={field.name}
        value={field.value || ''}
        onChange={field.onChange}
        onBlur={field.onBlur}
        error={!!error}
        helperText={error}
        required={required}
        className={classes.flexGrow}
        margin={"dense"}
        multiline={multiline}
        variant={disabled ? "filled" : "outlined"}
        label={title}
        InputProps={{
          readOnly: disabled
        }}
      />
      {link && <HintWarning hint={value} isLink />}
      <HintWarning hint={hint} />
    </div>
  )
};
