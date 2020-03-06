import React, { useRef, useEffect, useState } from 'react';
import { useFormikContext } from 'formik';
import HintWarning from "../UI/HintWarning";
import { Typography } from '@material-ui/core';
import classes from '../index.css';
import MUIRichTextEditor from 'mui-rte';
import { last } from "../functions/formHelper";

export default function RichTextEditorFormik({ fieldData }) {

  const { title, path, disabled, saveOnEdit, warning, hint, isSmallIcons } = fieldData;

  const { values, setFieldValue, touched, errors, initialValues: { [path]: initialValue } } = useFormikContext();

  const [value, setValue] = useState(initialValue || null);

  let error = touched[name] && errors[name] ? errors[name] : "";

  const ref = useRef()

  useEffect(() => {
    console.log("reset rte " + title, initialValue)
    setValue(initialValue || null)
  }, [initialValue])

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
          error={!!error} //todo
          label="Start typing..."
          onSave={(string) => {
            setFieldValue(path, string)
          }}
          onChange={(editorState) => saveOnEdit && ref.current.save()}
        />
      </div>
    </div>
  )
}
