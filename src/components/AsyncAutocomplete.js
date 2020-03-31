import React, { useEffect } from "react";
import {
  TextField,
  CircularProgress
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { last } from "../functions/formHelper";
import HintWarning from "../UI/HintWarning";
import classes from '../index.css';
import PropTypes from 'prop-types';

function AsyncAutocomplete({ setValue, error, value,
  fieldData: { title = "", path = "", readOnly = false, hint = "", warning = "", required = false,
    getAsyncOptions = () => ([]), placeholder = "Search...", freeSolo = false, getOptionLabel = (v) => v }
}) {

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState(null);
  const [inputText, setInputText] = React.useState("");
  const loading = open && !options;

  useEffect(() => {
    let active = true;
    getAsyncOptions(inputText || "").then(
      r => !!active && setOptions(r)
    )
    return () => {
      active = false;
    };
  }, [inputText, getAsyncOptions]);

  React.useEffect(() => {
    if (!open) {
      setOptions(null);
    }
  }, [open]);

  return (
    <div className={classes.flex}>
      <HintWarning text={warning} isWarning />
      <Autocomplete
        // getOptionSelected={fieldData.getOptionSelected}
        getOptionLabel={(option) => getOptionLabel(option) || ""}
        freeSolo={freeSolo}
        options={options || []}
        loading={loading}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        onChange={(_, val) => {
          setValue(val)
        }}
        onInputChange={(_, val) => {
          setInputText(val);
          setOptions(null);
          freeSolo && setValue(val);
        }}
        filterOptions={(options, { inputValue }) => options}
        value={value || ""}
        className={classes.flexGrow}
        disabled={readOnly}
        renderInput={params => (
          <TextField
            {...params}
            margin={"dense"}
            error={!!error}
            readOnly={readOnly}
            disabled={false}
            helperText={error}
            label={title}
            required={required}
            fullWidth
            variant={readOnly ? "filled" : "outlined"}
            placeholder={placeholder}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              )
            }}
          />
        )}
      />
      <HintWarning text={hint} />
    </div>
  );
}

AsyncAutocomplete.propTypes = {
  fieldData: PropTypes.shape({
    path: PropTypes.string.isRequired,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    hint: PropTypes.string,
    warning: PropTypes.string,
    title: PropTypes.string,

    getAsyncOptions: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    freeSolo: PropTypes.bool,
    getOptionLabel: PropTypes.func,
  }),
  setValue: PropTypes.func,
  error: PropTypes.string,
};

export default AsyncAutocomplete
