import React, { useRef, useEffect } from 'react';
import { useFormikContext } from "formik";
import HintWarning from "../UI/HintWarning"
import { Typography } from '@material-ui/core';
import classes from '../index.css'
import MUIRichTextEditor from 'mui-rte'
import { last } from "../functions/formHelper"

let value = null;

export default function RichTextEditorFormik({ fieldData }) {

  const { title, path, disabled, saveOnEdit, warning, hint, isSmallIcons } = fieldData;

  let name = last(path);
  const { values, setFieldValue, touched, errors } = useFormikContext();
  let error = touched[name] && errors[name] ? errors[name] : "";

  const ref = useRef()

  useEffect(() => {
    console.log("reset")
    value = values[name] || null
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
            setFieldValue(name, string)
          }}
          onChange={(editorState) => saveOnEdit && ref.current.save()}
        />
      </div>
    </div>
  )
}
