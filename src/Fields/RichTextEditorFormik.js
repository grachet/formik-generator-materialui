import React from 'react';
import { useFormikContext } from "formik";
import HintWarning from "../UI/HintWarning"
import { Typography } from '@material-ui/core';
import classes from '../index.css'
import MUIRichTextEditor from 'mui-rte'
import { last } from "../functions/formHelper"

export default function RichTextEditorFormik({ fieldData }) {

  const { title, path, disabled, warning, hint, isSmallIcons } = fieldData;

  let name = last(path);
  const { values, setFieldValue, touched, errors } = useFormikContext();
  let error = touched[name] && errors[name] ? errors[name] : "";

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
          readOnly={disabled}
          toolbarButtonSize={isSmallIcons ? "small" : "medium"}
          value={values[name] || ""}
          inlineToolbar={true}
          error={!!error}
          label="Start typing..."
          onSave={(string) => {
            setFieldValue(name, string)
          }}
        // onChange={(editorState) => console.log(editorState)}
        />
      </div>
    </div>
  )
}
