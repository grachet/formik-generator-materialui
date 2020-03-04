import React, { useState } from 'react';
import HintWarning from "../UI/HintWarning";
import { KeyboardDatePicker } from '@material-ui/pickers';
import { useFormikContext } from 'formik';
import classes from '../index.css'
import { last } from "../functions/formHelper";

export default function DateTimeFormik({ fieldData }) {

  const { required, title, hint, value, openTo, warning, disabled, path } = fieldData;

  let name = last(path);
  const { setFieldValue } = useFormikContext();

  // const [field, meta] = useField(name);
  // let error = meta.touched && meta.error ? meta.error : "";

  return (
    <div className={classes.flex}>
      <HintWarning hint={warning} isWarning />
      <KeyboardDatePicker
        margin={"dense"}
        name={name}
        openTo={openTo}
        required={required}
        className={classes.flexGrow}
        clearable
        inputVariant={disabled ? "filled" : "outlined"}
        autoOk
        label={title}
        format="MM/DD/YYYY"
        disabled={disabled}
        placeholder="01/01/2020"
        onChange={value => {
          setFieldValue(name, value.toDate());
        }}
        value={value || null}
      />
      <HintWarning hint={hint} />
    </div>
  )
};
