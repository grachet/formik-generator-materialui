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

  const { title, path, disabled, hint, warning } = fieldData;

  let name = last(path);
  const [field] = useField(name);

  return (
    <div className={classes.flex} key={"checkbox" + title}>
      <HintWarning hint={warning} isLeft isWarning />
      <FormControlLabel
        control={
          isSwitch ? <Switch
            checked={!!field.value} name={name} onChange={field.onChange}
          /> : <Checkbox
              checked={!!field.value} name={name} onChange={field.onChange}
            />
        }
        disabled={disabled}
        label={title}
      />
      <HintWarning hint={hint} />
    </div>
  )
};
