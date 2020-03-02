import React from 'react';
import HintWarning from "../UI/HintWarning";
import { DatePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { useFormikContext } from 'formik';
import classes from '../index.css'
import { last } from "../functions/formHelper";

export default function DateTimeFormik({ fieldData }) {

  let name = last(fieldData.path);
  const { setFieldValue } = useFormikContext();

  // const [field, meta] = useField(name);
  // let error = meta.touched && meta.error ? meta.error : "";

  let DateTimeComponent = fieldData.disabled ? DatePicker : KeyboardDatePicker;

  return (
    <div className={classes.flex} key={fieldData.title}>
      <HintWarning hint={fieldData.warning} isLeft isWarning />
      <DateTimeComponent
        margin={"dense"}
        name={name}
        required={fieldData.required}
        className={classes.flexGrow}
        clearable
        inputVariant={fieldData.disabled ? "filled" : "outlined"}
        autoOk
        label={fieldData.title}
        format="dd/MM/yyyy"
        placeholder="01/01/2020"
        onChange={value => {
          !fieldData.disabled && setFieldValue(name, value);
        }}
        value={fieldData.value}
        animateYearScrolling={false}
      />
      <HintWarning hint={fieldData.hint} />
    </div>
  )
};
