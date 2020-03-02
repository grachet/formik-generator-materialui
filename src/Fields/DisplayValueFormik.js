import React from 'react';
import HintWarning from "../UI/HintWarning";
import {
  TextField,
  makeStyles,
} from "@material-ui/core";
import classes from '../index.css'


export default function DisplayValueFormik({ fieldData }) {

  let error;
  if (fieldData.yup) {
    try {
      fieldData.yup.validateSync(fieldData.value);
    } catch (e) {
      error = e.message
    }
  }

  return (
    <div className={classes.flex} key={fieldData.title}>
      <TextField
        className={classes.flexGrow}
        margin={"dense"}
        variant={"filled"}
        label={fieldData.title}
        inputlabelprops={{ shrink: true }}
        InputProps={{
          readOnly: true
        }}
        error={!!error}
        helperText={error}
        multiline={fieldData.multiline}
        value={fieldData.value}
      />
      <HintWarning hint={fieldData.hint} />
    </div>
  )
};
