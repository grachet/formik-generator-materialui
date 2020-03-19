import React, { useRef, useEffect, useState } from 'react';
import { useField } from "formik";
import HintWarning from "../UI/HintWarning";
import { Typography, FormHelperText } from '@material-ui/core';
import classes from '../index.css';
import MUIRichTextEditor from 'mui-rte';
import { last } from "../functions/formHelper";
import PropTypes from 'prop-types';

function RichTextEditorFormik({ fieldData: { title = "", path = "", disabled = false, hint = "", warning = "", required = false, isSmallIcons = false, saveOnEdit = true } }) {

  const [, { initialValue, error }, helpers] = useField(path);

  const [value, setValue] = useState(initialValue || null);

  const ref = useRef();

  useEffect(() => {
    setValue(initialValue || null)
  }, [initialValue])

  return (
    <div className={classes.flexGrow + " " + (!!error ? classes.errorBorderContainer : classes.borderContainer)}>
      {title &&
        <Typography variant="body2"
          className={!!error ? classes.errorColor : ""}
          color="textSecondary">{required ? title + " *" : title}
          <HintWarning text={warning} isWarning />
          <HintWarning text={hint} />
        </Typography>}
      <div className={classes.flex}>
        <MUIRichTextEditor
          ref={ref}
          readOnly={disabled}
          toolbarButtonSize={isSmallIcons ? "small" : "medium"}
          value={value}
          inlineToolbar={true}
          label="Start typing..."
          onSave={(string) => {
            helpers.setValue(string)
          }}
          onChange={(editorState) => saveOnEdit && ref.current.save()}
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

    isSmallIcons: PropTypes.bool,
    saveOnEdit: PropTypes.bool,
  }),
};

export default RichTextEditorFormik
