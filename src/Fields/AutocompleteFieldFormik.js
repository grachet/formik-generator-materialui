import React from 'react';
import styles from './styles/formStyle';
import HintWarning from "./HintWarning";
import {
  TextField,
  makeStyles,
} from "@material-ui/core";
import { useFormikContext } from 'formik';
import {
  Autocomplete,
} from "@material-ui/lab";

import { last } from "lodash";

const useStyles = makeStyles(styles);

export default function AutocompleteFieldFormik({ fieldData }) {
  const classes = useStyles();
  let name = last(fieldData.path);
  const { values, setFieldValue, touched, errors } = useFormikContext();
  let error = touched[name] && errors[name] ? errors[name] : "";

  return (
    <div className={classes.flex} key={fieldData.title}>
      <HintWarning hint={fieldData.warning} isLeft isWarning />
      <Autocomplete
        freeSolo={fieldData.freeSolo}
        options={fieldData.options}
        getOptionLabel={fieldData.getOptionLabel}
        className={classes.flexGrow}
        // defaultValue={values[name] || ""}
        value={values[name] || ""}
        onChange={(_, val) => setFieldValue(name, val)}
        onInputChange={(_, val) => fieldData.freeSolo && setFieldValue(name, val)}
        disabled={fieldData.disabled}
        renderInput={params => (<TextField
          {...params}
          margin={"dense"}
          error={!!error}
          helperText={error}
          label={fieldData.title}
          fullWidth
          variant={fieldData.disabled ? "filled" : "outlined"}
          placeholder={fieldData.placeholder}
        />)}
      />
      <HintWarning hint={fieldData.hint} />
    </div>
  )
};