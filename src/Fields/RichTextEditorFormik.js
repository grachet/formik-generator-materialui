import React, { useRef, useEffect, useState } from 'react';
import { useField } from "formik";
import HintWarning from "../UI/HintWarning";
import { Typography, FormHelperText } from '@material-ui/core';
import { Editor } from 'react-draft-wysiwyg';
import PropTypes from 'prop-types';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import classes from '../index.css';

function RichTextEditorFormik({ fieldData: { title = "", path = "", disabled = false, hint = "", warning = "", required = false } }) {

  const [{ value }, { initialValue, error }, { setValue }] = useField(path);

  return (
    <div className={(!!error ? classes.errorBorderContainer : classes.borderContainer)}>
      {title &&
        <Typography variant="body2"
          className={!!error ? classes.errorColor : ""}
          color="textSecondary">{required ? title + " *" : title}
          <HintWarning text={warning} isWarning />
          <HintWarning text={hint} />
        </Typography>}
      <div>
        <Editor
          editorState={value}
          toolbarClassName={classes.toolbarRTE}
          editorClassName={disabled ? classes.editorRTEDisabled : classes.editorRTE}
          onEditorStateChange={setValue}
          readOnly={disabled}
          toolbarHidden={disabled}
        />
      </div>
      {!!error && <FormHelperText error>{error}</FormHelperText>}
    </div>
  )
}

RichTextEditorFormik.propTypes = {
  fieldData: PropTypes.shape({
    path: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    hint: PropTypes.string,
    warning: PropTypes.string,
    title: PropTypes.string,
  }),
};

export default RichTextEditorFormik
