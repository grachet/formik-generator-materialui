import React from 'react';
import HintWarning from "../UI/HintWarning";
import {
  TextField,
} from "@material-ui/core";
import classes from '../index.css';
import { useFormikContext } from 'formik';
import get from 'lodash.get';
import PropTypes from 'prop-types';

function DisplayValueFormik({ fieldData: {
  title = "", hint = "", warning = "", required = false, isLink = false,
  yup = null, multiline = false, transformation = (v) => v, display = [], separator = ""
} }) {

  const { values } = useFormikContext();

  let displayedValue = display.map(displayItem => {
    if (displayItem && displayItem.path) {
      let newValue = get(values, displayItem.path);
      if (displayItem.transformation) {
        newValue = displayItem.transformation(newValue);
      }
      return newValue
    } else if (displayItem || displayItem === 0) {
      return displayItem
    } else {
      return ""
    }
  }).join(separator);

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
      <HintWarning text={warning} isWarning />
      <TextField
        className={classes.flexGrow}
        margin={"dense"}
        required={required}
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
      {isLink && <HintWarning text={displayedValue || ''} isLink />}
      <HintWarning text={hint} />
    </div>
  )
};

DisplayValueFormik.propTypes = {
  fieldData: PropTypes.shape({
    required: PropTypes.bool,
    hint: PropTypes.string,
    warning: PropTypes.string,
    title: PropTypes.string,

    multiline: PropTypes.bool,
    yup: PropTypes.object,
    transformation: PropTypes.func,
    separator: PropTypes.string,
    display: PropTypes.array,
    isLink: PropTypes.bool
  }),
};

export default DisplayValueFormik
