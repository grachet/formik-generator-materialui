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

  let name = last(fieldData.path);
  const [field] = useField(name);

  return (
    <div className={classes.flex} key={"checkbox" + fieldData.title}>
      <HintWarning hint={fieldData.warning} isLeft isWarning />
      <FormControlLabel
        control={
          isSwitch ? <Switch
            checked={!!field.value} name={name} onChange={field.onChange}
          /> : <Checkbox
              checked={!!field.value} name={name} onChange={field.onChange}
            />
        }
        disabled={fieldData.disabled}
        label={fieldData.title}
      />
      <HintWarning hint={fieldData.hint} />
    </div>
  )
};
