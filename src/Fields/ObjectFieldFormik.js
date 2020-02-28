import React from 'react';
import { FieldArray } from 'formik';
import AddIcon from '@material-ui/icons/AddCircle';
import RemoveIcon from '@material-ui/icons/Delete';
import styles from './styles/formStyle';
import HintWarning from "./HintWarning"
import FieldGen from "./FormikFieldGenerator";

import { Button, IconButton, Typography, Tooltip, Grid, Divider, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(styles);

export default function ObjectFieldFormik(props) {

  const { fieldData } = props;

  const classes = useStyles();
  const { title, path, value, emptyAddText, noBorder } = fieldData;

  return <FieldArray
    key={fieldData.title}
    validateOnChange={false}
    name={path[path.length - 1]}
    render={arrayHelpers => (

      <div className={(!noBorder ? classes.wrapperArrayField : "") + " " + classes.mymd}>
        {title &&
          <Typography variant="body2" className={!fieldData.hint ? classes.mbmd : ""}
            color="textSecondary"
            component={'div'}>{title}<HintWarning hint={fieldData.hint} noMargin /></Typography>}
        {value && value.length > 0 ? (
          <div>
            {value.map((arrayValue, index) => (
              <span key={index}>
                <RenderFieldsContainer arrayHelpers={arrayHelpers} index={index} {...props} />
              </span>
            )
            )}
          </div>
        ) : (
            <Button
              disabled={fieldData.disabled} variant="outlined" className={classes.mymd}
              onClick={() => arrayHelpers.push({})}>
              {emptyAddText}
            </Button>
          )}
      </div>

    )}
  />
}


function RenderFieldsContainer({ arrayHelpers, index, fieldData, paper }) {

  const classes = useStyles();
  const { path, value, subfields, dense } = fieldData;

  let newObject = subfields.reduce((obj, item) => {
    obj[item.name] = "";
    return obj
  }, {});

  return (
    <span>
      <div className={classes.flex}>
        <Grid container spacing={2}>
          {subfields.map((subfield, index2) =>
            <Grid item key={index2} className={classes.flex}
              sm={12} md={subfield.fullWidth ? 12 : 6}
              lg={subfield.fullWidth ? 12 : dense ? 4 : 6}>

              <span className={classes.flexGrow}><FieldGen field={{
                ...subfield,
                disabled: fieldData.disabled,
                path: [path[path.length - 1] + "[" + index + "]." + subfield.name],
                value: value[index][subfield.name]
              }} /></span>
            </Grid>)}
        </Grid>
        <div className={classes.buttonHint}>
          <Tooltip title={"Add"}>
            <IconButton
              disabled={fieldData.disabled}
              onClick={() => arrayHelpers.insert(index + 1, newObject)}
              color="primary"
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div className={classes.buttonHint}>
          <Tooltip title={"Remove"}>
            <IconButton
              disabled={fieldData.disabled}
              onClick={() => arrayHelpers.remove(index)}
              color="primary"
            >
              <RemoveIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      {!paper && subfields.length >= 3 && index < value.length - 1 && <Divider className={classes.myl} />}
    </span>
  )
};
