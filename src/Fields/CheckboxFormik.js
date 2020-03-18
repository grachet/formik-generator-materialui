import React from 'react';
import HintWarning from "../UI/HintWarning";
import {
  FormControlLabel,
  Checkbox,
  Switch
} from "@material-ui/core";
import { useField } from 'formik';
import classes from '../index.css'
import { last } from "../functions/formHelper";
import PropTypes from 'prop-types';

function CheckboxFormik({ fieldData: { title = "", path = "",
  disabled = false, hint = "", warning = "", required = false }, isSwitch }) {

  const [field] = useField(path);

  return (
    <div className={classes.flex}>
      <HintWarning hint={warning} isWarning />
      <FormControlLabel
        control={
          isSwitch ? <Switch
            checked={!!field.value} name={path} onChange={field.onChange}
          /> : <Checkbox
              checked={!!field.value} name={path} onChange={field.onChange}
            />
        }
        disabled={disabled}
        label={required ? title + " *" : title}
        required={required}
      />
      <HintWarning hint={hint} />
    </div>
  )
};

CheckboxFormik.propTypes = {
  fieldData: PropTypes.shape({
    path: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    hint: PropTypes.string,
    warning: PropTypes.string,
    title: PropTypes.string,
  }),
};

export default CheckboxFormik
