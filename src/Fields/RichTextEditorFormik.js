import React, { useRef, useEffect, useState } from 'react';
import { useField } from "formik";
import HintWarning from "../UI/HintWarning";
import { Typography, FormHelperText } from '@material-ui/core';
import classes from '../index.css';
import MUIRichTextEditor from 'mui-rte';
import { last } from "../functions/formHelper";

export default function RichTextEditorFormik({ fieldData }) {

  const { title, path, required, disabled, saveOnEdit, warning, hint, isSmallIcons } = fieldData;

  const [, { initialValue, error }, helpers] = useField(path);

  const [value, setValue] = useState(initialValue || null);

  const ref = useRef();

  useEffect(() => {
    console.log("reset")
    setValue(initialValue || null)
  }, [initialValue])

  return (
    <div className={classes.flexGrow + " " + (!!error ? classes.errorBorderContainer : classes.borderContainer)}>
      {title &&
        <Typography variant="body2"
          className={!!error ? classes.errorColor : ""}
          color="textSecondary">{required ? title + " *" : title}
          <HintWarning hint={warning} isWarning />
          <HintWarning hint={hint} />
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
