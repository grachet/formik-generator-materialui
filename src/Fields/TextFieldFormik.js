import React from 'react';
import HintWarning from "../UI/HintWarning";
import {
  TextField,
} from "@material-ui/core";
import { useField } from 'formik';
import { last } from '../functions/formHelper';
import classes from '../index.css';
import PropTypes from 'prop-types';

function TextFieldFormik({ fieldData: { title, path, disabled, hint, warning, required, multiline, isLink } }) {

  const [field, { error }] = useField(path);

  return (
    <div className={classes.flex}>
      <HintWarning hint={warning} isWarning />
      <TextField
        name={path}
        value={field.value || ''}
        onChange={field.onChange}
        onBlur={field.onBlur}
        error={!!error}
        helperText={error}
        required={required}
        className={classes.flexGrow}
        margin={"dense"}
        multiline={multiline}
        variant={disabled ? "filled" : "outlined"}
        label={title}
        InputProps={{
          readOnly: disabled
        }}
      />
      {isLink && <HintWarning hint={field.value || ''} isLink />}
      <HintWarning hint={hint} />
    </div>
  )
};

TextFieldFormik.propTypes = {
  // path: PropTypes.string.isRequired,
  // disabled: PropTypes.bool,
  // required: PropTypes.bool,
  // hint: PropTypes.string,
  // warning: PropTypes.string,
  // title: PropTypes.string,

  // multiline: PropTypes.bool,
  // isLink: PropTypes.bool,
};

TextFieldFormik.defaultProps = {
  // disabled: false,
  // required: false,
};

export default TextFieldFormik
