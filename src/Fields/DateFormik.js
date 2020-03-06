import React, { useState } from 'react';
import HintWarning from "../UI/HintWarning";
import { KeyboardDatePicker } from '@material-ui/pickers';
import { useField } from 'formik';
import classes from '../index.css'
import { last } from "../functions/formHelper";

export default function DateTimeFormik({ fieldData }) {

  const { required, title, hint, openTo, warning, disabled, path } = fieldData;

  const [field, { error }, helpers] = useField(path);

  return (
    <div className={classes.flex}>
      <HintWarning hint={warning} isWarning />
      <KeyboardDatePicker
        margin={"dense"}
        name={field.name}
        openTo={openTo}
        required={required}
        error={!!error}
        helperText={error}
        className={classes.flexGrow}
        clearable
        inputVariant={disabled ? "filled" : "outlined"}
        autoOk
        label={title}
        format="MM/DD/YYYY"
        disabled={disabled}
        placeholder="01/01/2020"
        onChange={value => {
          helpers.setValue((value && value.toDate() || null));
        }}
        value={field.value || null}
      />
      <HintWarning hint={hint} />
    </div>
  )
};
