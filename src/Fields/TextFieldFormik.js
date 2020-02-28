import React from 'react';
import HintWarning from "../UI/HintWarning";
import {
  TextField,
} from "@material-ui/core";
import { useField } from 'formik';
import { last } from '../functions/formHelper';
import classes from '../index.css'

export default function TextFieldFormik({ fieldData }) {

  let name = last(fieldData.path);
  const [field, meta] = useField(name);

  let error = meta.touched && meta.error ? meta.error : "";

  return (
    <div className={classes.flex} key={fieldData.title}>
      <HintWarning hint={fieldData.warning} isLeft isWarning />
      <TextField
        name={field.name}
        value={field.value || ''}
        onChange={field.onChange}
        onBlur={field.onBlur}
        error={!!error}
        helperText={error}
        required={fieldData.required}
        className={classes.flexGrow}
        margin={"dense"}
        multiline={fieldData.multiline}
        variant={fieldData.disabled ? "filled" : "outlined"}
        label={fieldData.title}
        InputProps={{
          readOnly: fieldData.disabled
        }}
      />
      {fieldData.link && <HintWarning hint={fieldData.value} isLink />}
      <HintWarning hint={fieldData.hint} />
    </div>
  )
};
