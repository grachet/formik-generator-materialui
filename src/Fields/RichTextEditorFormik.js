import React from 'react';
import styles from './styles/formStyle';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormikContext } from "formik";
import HintWarning from "./HintWarning"
import classNames from 'classnames';

import { Typography, makeStyles } from '@material-ui/core';

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

const useStyles = makeStyles(styles);
export default function RichTextEditorFormik({ fieldData }) {

  const classes = useStyles();
  const { title, path } = fieldData;
  let name = path[path.length - 1];
  const { setFieldValue } = useFormikContext();

  if (!path) return null;

  return (
    <div className={classNames(classes.flexGrow, classes.mymd)}>
      {title &&
        <Typography variant="body2"
          color="textSecondary">{title}
        </Typography>}
      <div className={classes.flex}>
        <ReactQuill
          value={fieldData.value || ""}
          className={classes.flexGrow + " " + classes.mbxl}
          theme="snow"
          modules={modulesReactQuill}
          formats={formatsReactQuill}
          onChange={value => setFieldValue(name, value)}
        />
        <HintWarning hint={fieldData.hint} noMargin />
      </div>
    </div>
  )
}
