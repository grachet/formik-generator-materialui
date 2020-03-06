import React from 'react';
import HintWarning from "../UI/HintWarning";
import {
  TextField,
} from "@material-ui/core";
import { useField } from 'formik';
import { last } from '../functions/formHelper';
import classes from '../index.css'

export default function TextFieldFormik({ fieldData }) {

  const { title, path, disabled, hint, warning, required, multiline, isLink } = fieldData;

  const [field, { error }] = useField(path);

  return (
    <div className={classes.flex}>
      <HintWarning hint={warning} isWarning />
      <TextField
        name={path}
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
      {isLink && <HintWarning hint={field.value || ''} isLink />}
      <HintWarning hint={hint} />
    </div>
  )
};
