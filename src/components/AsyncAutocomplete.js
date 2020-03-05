import React, { useEffect } from "react";
import {
  TextField,
  CircularProgress
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { last } from "../functions/formHelper";
import HintWarning from "../UI/HintWarning";
import classes from '../index.css'

export default function AsyncAutocomplete({ fieldData, setFieldValue, error, value }) {

  const { path, getAsyncOptions, hint, placeholder, disabled, freeSolo, title, warning, getOptionLabel } = fieldData;

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState(null);
  const [inputText, setInputText] = React.useState("");
  const loading = open && !options;

  let name = last(path);

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
      <HintWarning hint={warning} isWarning />
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
          freeSolo && setFieldValue(name, inputText);
        }}
        onChange={(_, val) => {
          setFieldValue(name, val)
        }}
        onInputChange={(_, val) => {
          setInputText(val);
          setOptions(null);
        }}
        filterOptions={(options, { inputValue }) => options}
        value={value || ""}
        className={classes.flexGrow}
        disabled={disabled}
        renderInput={params => (
          <TextField
            {...params}
            margin={"dense"}
            error={!!error}
            helperText={error}
            label={title}
            fullWidth
            variant={disabled ? "filled" : "outlined"}
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
      <HintWarning hint={hint} />
    </div>
  );
}
