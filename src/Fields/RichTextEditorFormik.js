import React, { useRef, useEffect } from 'react';
import { useField } from "formik";
import HintWarning from "../UI/HintWarning"
import { Typography } from '@material-ui/core';
import classes from '../index.css'
import MUIRichTextEditor from 'mui-rte'
import { last } from "../functions/formHelper"

let value = null;

export default function RichTextEditorFormik({ fieldData }) {

  const { title, path, disabled, saveOnEdit, warning, hint, isSmallIcons } = fieldData;

  const [field, meta, helpers] = useField(path);
  let error = meta.touched && meta.error ? meta.error : "";

  const ref = useRef()

  useEffect(() => {
    //todo change on initial value change
    console.log("reset")
    value = field.value || null
  }, [])

  return (
    <div className={classes.flexGrow + " " + classes.borderContainer}>
      {title &&
        <Typography variant="body2"
          color="textSecondary">{title}
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
          error={!!error}
          label="Start typing..."
          onSave={(string) => {
            helpers.setValue(string)
          }}
          onChange={(editorState) => saveOnEdit && ref.current.save()}
        />
      </div>
    </div>
  )
}
