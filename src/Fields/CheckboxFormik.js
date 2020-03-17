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

export default function CheckboxFormik({ fieldData, isSwitch }) {

  const { title, path, disabled, required, hint, warning } = fieldData;

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
