import React from 'react';
import { FieldArray, useField } from 'formik';
import AddIcon from '@material-ui/icons/AddCircle';
import RemoveIcon from '@material-ui/icons/RemoveCircle';
// import RemoveIcon from '@material-ui/icons/Delete';
import HintWarning from "../UI/HintWarning"
import FieldGenerator from "../components/FieldGenerator";
import { Button, IconButton, Typography, FormHelperText, Tooltip, Grid, Divider } from '@material-ui/core';
import classes from '../index.css'

export default function ArrayOfObjectFieldFormik(props) {

  const { fieldData } = props;

  const { title, path, required, disabled, emptyAddText, noBorder, hint, warning } = fieldData;

  const [{ value }, { error }] = useField(path);

  let haveError = (!!error) && !(Array.isArray(error) && error.every(v => !v));

  return <FieldArray
    validateOnChange={false}
    name={path}
    render={arrayHelpers => (
      <div className={noBorder ? "" : haveError ? classes.errorBorderContainer : classes.borderContainer}>
        {title && <Typography variant="body2" gutterBottom
          className={haveError ? classes.errorColor : ""}
          color="textSecondary"
          component={'div'}>{required ? title + " *" : title}
          <HintWarning hint={warning} isWarning />
          <HintWarning hint={hint} />
        </Typography>}
        {value && value.length > 0 ? <div>
          {value.map((arrayValue, index) => (
            <span key={index}>
              <RenderFieldsContainer arrayHelpers={arrayHelpers} index={index} {...props} value={value} />
            </span>
          )
          )}
        </div> :
          <Button
            disabled={disabled} variant="outlined"
            onClick={() => arrayHelpers.push({})}>
            {emptyAddText}
          </Button>
        }
        {!!error && !Array.isArray(error) && < FormHelperText error>{error}</FormHelperText>}
      </div>

    )}
  />
}


function RenderFieldsContainer({ arrayHelpers, index, fieldData, value }) {

  const { path, subfields, dense, disabled } = fieldData;

  let needShadow = subfields.reduce((acc, current) => acc + (current.col || 6), 0) > 12

  let newObject = subfields.reduce((obj, item) => {
    obj[item.name] = "";
    return obj
  }, {});

  let fields = subfields.map((subfieldData, i) =>
    <Grid key={i} item
      xs={12}
      sm={subfieldData.col || 6}
    >
      <div className={classes.flexGrow}>
        <FieldGenerator
          fieldData={{
            ...subfieldData,
            path: path + "[" + index + "]." + subfieldData.name,
            value: value[index][subfieldData.name]
          }}
          readOnly={disabled}
        />
      </div>
    </Grid>)

  return (
    <div className={classes.flex + " " + (needShadow && classes.shadowContainer)}>
      <Grid container spacing={2} >
        {fields}
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
  )
};
