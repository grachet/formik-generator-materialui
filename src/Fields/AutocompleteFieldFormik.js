import React from 'react';
import HintWarning from "../UI/HintWarning";
import {
  TextField,
} from "@material-ui/core";
import { useField } from 'formik';
import {
  Autocomplete,
} from "@material-ui/lab";
import { last } from "../functions/formHelper";
import classes from '../index.css'
import PropTypes from 'prop-types';

let localValue = "";

function AutocompleteFieldFormik({ fieldData: {
  title = "", path = "", disabled = false, hint = "", warning = "", required = false,
  freeSolo = false, options = [], getOptionLabel = (v) => v, placeholder = "Search..."
} }) {

  const [{ value }, { error }, { setValue }] = useField(path);

  return (
    <div className={classes.flex}>
      <HintWarning hint={warning} isWarning />
      <Autocomplete
        // defaultValue={}
        // loading={loading}
        className={classes.flexGrow}
        disabled={disabled}
        options={options || []}
        getOptionLabel={(option) => getOptionLabel(option) || ""}
        value={value || ""}
        onChange={(_, val) => {
          if (freeSolo) {
            localValue = val
          }
          setValue(val)
        }}
        onClose={() => {
          freeSolo && setValue(localValue)
        }}
        freeSolo={freeSolo}
        onInputChange={(_, val) => {
          if (freeSolo) {
            localValue = val
          }
        }}
        renderInput={params => (<TextField
          {...params}
          margin={"dense"}
          error={!!error}
          required={required}
          helperText={error}
          label={title}
          fullWidth
          variant={disabled ? "filled" : "outlined"}
          placeholder={placeholder}
        />)}
      />
      <HintWarning hint={hint} />
    </div>
  )
};

AutocompleteFieldFormik.propTypes = {
  fieldData: PropTypes.shape({
    path: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    hint: PropTypes.string,
    warning: PropTypes.string,
    title: PropTypes.string,

    freeSolo: PropTypes.bool,
    options: PropTypes.array,
    getOptionLabel: PropTypes.func,
    placeholder: PropTypes.string,
  }),
};

export default AutocompleteFieldFormik
