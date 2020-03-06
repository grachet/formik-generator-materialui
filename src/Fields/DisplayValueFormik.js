import React from 'react';
import HintWarning from "../UI/HintWarning";
import {
  TextField,
} from "@material-ui/core";
import classes from '../index.css'
import { useFormikContext } from 'formik';

export default function DisplayValueFormik({ fieldData }) {

  const { yup, title, multiline, transformation, hint, warning, display } = fieldData;

  const { values } = useFormikContext();

  let displayedValue = display.map(displayItem => {
    if (displayItem && displayItem.path) {
      let newValue = values[displayItem.path]
      if (displayItem.transformation) {
        newValue = displayItem.transformation(newValue);
      }
      return newValue
    } else if (displayItem || displayItem === 0) {
      return displayItem
    } else {
      return ""
    }
  }).join(fieldData.separator || "");

  if (transformation) {
    displayedValue = transformation(displayedValue);
  }

  let error;
  if (yup) {
    try {
      yup.validateSync(displayedValue);
    } catch (e) {
      error = e.message
    }
  }

  return (
    <div className={classes.flex}>
      <HintWarning hint={warning} isWarning />
      <TextField
        className={classes.flexGrow}
        margin={"dense"}
        variant={"filled"}
        label={title}
        inputlabelprops={{ shrink: true }}
        InputProps={{
          readOnly: true
        }}
        error={!!error}
        helperText={error}
        multiline={multiline}
        value={displayedValue}
      />
      <HintWarning hint={hint} />
    </div>
  )
};
