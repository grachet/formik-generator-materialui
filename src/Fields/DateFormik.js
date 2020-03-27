import React, { useState } from 'react';
import HintWarning from "../UI/HintWarning";
import { KeyboardDatePicker } from '@material-ui/pickers';
import { useField } from 'formik';
import classes from '../index.css';
import { last } from "../functions/formHelper";
import PropTypes from 'prop-types';

function DateTimeFormik({ fieldData: { title = "", path = "", disabled = false, hint = "", warning = "", required = false, openTo = "date", simple = false } }) {

  const [field, { error }, helpers] = useField(path);

  return (
    <div className={classes.flex}>
      <HintWarning text={warning} isWarning />
      <KeyboardDatePicker
        margin={"dense"}
        name={field.name}
        disableToolbar={simple}
        variant={simple ? "inline" : null}
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
      <HintWarning text={hint} />
    </div>
  )
};

DateTimeFormik.propTypes = {
  fieldData: PropTypes.shape({
    path: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    hint: PropTypes.string,
    warning: PropTypes.string,
    title: PropTypes.string,

    openTo: PropTypes.string,
  }),
};

export default DateTimeFormik
