import React from 'react';
import HintWarning from "../UI/HintWarning";
import {
  TextField,
} from "@material-ui/core";
import classes from '../index.css'


export default function DisplayValueFormik({ fieldData }) {

  const { yup, title, multiline, value, hint, warning } = fieldData;

  let error;
  if (yup) {
    try {
      yup.validateSync(value);
    } catch (e) {
      error = e.message
    }
  }

  return (
    <div className={classes.flex} key={title}>
      <HintWarning hint={warning} noMargin isWarning />
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
        value={value}
      />
      <HintWarning hint={hint} />
    </div>
  )
};
