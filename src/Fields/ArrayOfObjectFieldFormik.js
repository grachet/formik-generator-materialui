import React from 'react';
import { FieldArray } from 'formik';
import AddIcon from '@material-ui/icons/AddCircle';
import RemoveIcon from '@material-ui/icons/Delete';
import HintWarning from "../UI/HintWarning"
import FieldGenerator from "../components/FieldGenerator";
import { Button, IconButton, Typography, Tooltip, Grid, Divider } from '@material-ui/core';
import classes from '../index.css'

export default function ArrayOfObjectFieldFormik(props) {

  const { fieldData } = props;

  const { title, path, disabled, value, emptyAddText, noBorder, hint, warning } = fieldData;

  return <FieldArray
    key={title}
    validateOnChange={false}
    name={path[path.length - 1]}
    render={arrayHelpers => (
      <div className={(!noBorder ? classes.wrapperArrayField : "")}>
        {title &&
          <Typography variant="body2" className={!hint ? classes.mbmd : ""}
            color="textSecondary"
            component={'div'}>{title}
            <HintWarning hint={hint} noMargin />
            <HintWarning hint={warning} noMargin isWarning />
          </Typography>}
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
              disabled={disabled} variant="outlined" className={classes.mymd}
              onClick={() => arrayHelpers.push({})}>
              {emptyAddText}
            </Button>
          )}
      </div>

    )}
  />
}


function RenderFieldsContainer({ arrayHelpers, index, fieldData, paper }) {

  const { path, value, subfields, dense, disabled } = fieldData;

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

              <span className={classes.flexGrow}><FieldGenerator field={{
                ...subfield,
                disabled,
                path: [path[path.length - 1] + "[" + index + "]." + subfield.name],
                value: value[index][subfield.name]
              }} /></span>
            </Grid>)}
        </Grid>
        <div className={classes.buttonHint}>
          <Tooltip title={"Add"}>
            <IconButton
              disabled={disabled}
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
              disabled={disabled}
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
