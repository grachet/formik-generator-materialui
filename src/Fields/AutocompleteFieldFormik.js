import React from 'react';
import HintWarning from "../UI/HintWarning";
import {
  TextField,
} from "@material-ui/core";
import { useFormikContext } from 'formik';
import {
  Autocomplete,
} from "@material-ui/lab";
import { last } from "../functions/formHelper";
import classes from '../index.css'

export default function AutocompleteFieldFormik({ fieldData }) {

  let name = last(fieldData.path);
  const { values, setFieldValue, touched, errors } = useFormikContext();
  let error = touched[name] && errors[name] ? errors[name] : "";

  return (
    <div className={classes.flex} key={fieldData.title}>
      <HintWarning hint={fieldData.warning} isLeft isWarning />
      <Autocomplete
        freeSolo={fieldData.freeSolo}
        options={fieldData.options}
        getOptionLabel={(option) => fieldData.getOptionLabel(option) || ""}
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
