import React, { useRef, useEffect, useState } from 'react';
import { useField } from "formik";
import HintWarning from "../UI/HintWarning";
import { Typography, FormHelperText } from '@material-ui/core';
import PropTypes from 'prop-types';
import classes from '../index.css';
import Editor from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function RichTextEditorFormik({ fieldData: { title = "", placeHolder = "...", path = "", readOnly = false, hint = "", warning = "", required = false } }) {

  const [{ value = "" }, { error }, { setValue }] = useField(path);


  return (
    <div className={classes.marginContainer}>
      {title &&
        <Typography variant="body2"
          className={!!error ? classes.errorColor : ""}
          color="textSecondary">{required ? title + " *" : title}
          <HintWarning text={warning} isWarning />
          <HintWarning text={hint} />
        </Typography>}
      <div>
        <Editor
          theme="snow"
          placeholder={placeHolder}
          value={value}
          onChange={(value) => setValue(value)}
          readOnly={readOnly}
        // modules={readOnly && {
        //   toolbar: false,
        // }}
        />
      </div>
      {!!error && <FormHelperText error>{error}</FormHelperText>}
    </div>
  )
}

RichTextEditorFormik.propTypes = {
  fieldData: PropTypes.shape({
    path: PropTypes.string.isRequired,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    hint: PropTypes.string,
    warning: PropTypes.string,
    title: PropTypes.string,
    placeHolder: PropTypes.string,
  }),
};

export default RichTextEditorFormik
