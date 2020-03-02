import React from 'react';
import { useFormikContext } from "formik";
import HintWarning from "../UI/HintWarning"
import { Typography } from '@material-ui/core';
import classes from '../index.css'

export const modulesReactQuill = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link'],
    ['clean']
  ],
};

export const formatsReactQuill = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
];

export default function RichTextEditorFormik({ fieldData }) {

  const { title, path } = fieldData;
  let name = path[path.length - 1];
  const { setFieldValue } = useFormikContext();

  if (!path) return null;

  return (
    <div className={classes.flexGrow + " " + classes.mymd}>
      {title &&
        <Typography variant="body2"
          color="textSecondary">{title}
        </Typography>}
      <div className={classes.flex}>
        {/* <ReactQuill
          value={fieldData.value || ""}
          className={classes.flexGrow + " " + classes.mbxl}
          theme="snow"
          modules={modulesReactQuill}
          formats={formatsReactQuill}
          onChange={value => setFieldValue(name, value)}
        /> */}
        <HintWarning hint={fieldData.hint} noMargin />
      </div>
    </div>
  )
}
