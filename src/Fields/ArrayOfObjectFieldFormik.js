import React from 'react';
import { FieldArray, useField } from 'formik';
import AddIcon from '@material-ui/icons/AddCircle';
import RemoveIcon from '@material-ui/icons/RemoveCircle';
// import RemoveIcon from '@material-ui/icons/Delete';
import HintWarning from "../UI/HintWarning";
import { Button, IconButton, Typography, FormHelperText, Tooltip, Grid, Divider } from '@material-ui/core';
import classes from '../index.css';
import PropTypes from 'prop-types';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';

function ArrayOfObjectFieldFormik({ FieldGenerator, fieldData,
  fieldData: { title = "", path = "", readOnly = false, hint = "", warning = "", required = false, emptyAddText = "Add", noBorder = false } }) {

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
          <HintWarning text={warning} isWarning />
          <HintWarning text={hint} />
        </Typography>}
        {value && value.length > 0 ? <div>
          {value.map((arrayValue, index) => (
            <span key={index}>
              <RenderFieldsContainer arrayHelpers={arrayHelpers} index={index} fieldData={fieldData} value={value} FieldGenerator={FieldGenerator} />
            </span>
          )
          )}
        </div> :
          <Button
            disabled={readOnly} variant="outlined"
            onClick={() => arrayHelpers.push({})}>
            {emptyAddText}
          </Button>
        }
        {!!error && !Array.isArray(error) && < FormHelperText error>{error}</FormHelperText>}
      </div>
    )}
  />
}


function RenderFieldsContainer({ FieldGenerator, arrayHelpers, index, value,
  fieldData: { path = "", withSwap = false, subfields = {}, readOnly = false } }) {

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
          readOnly={readOnly}
        />
      </div>
    </Grid>)

  return (
    <div className={classes.flex + " " + (needShadow && classes.shadowContainer)}>
      <Grid container spacing={2} >
        {fields}
      </Grid>
      {withSwap && value.length > 1 && <div className={classes.buttonHint}>
        <Tooltip title={"Swap down"}>
          <IconButton
            disabled={readOnly}
            onClick={() => arrayHelpers.swap(index, (value.length === index + 1) ? 0 : index + 1)}
            color="primary"
          >
            <ArrowDropDownCircleIcon />
          </IconButton>
        </Tooltip>
      </div>}
      <div className={classes.buttonHint}>
        <Tooltip title={"Add"}>
          <IconButton
            disabled={readOnly}
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
            disabled={readOnly}
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

ArrayOfObjectFieldFormik.propTypes = {
  fieldData: PropTypes.shape({
    path: PropTypes.string.isRequired,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    hint: PropTypes.string,
    warning: PropTypes.string,
    title: PropTypes.string,

    emptyAddText: PropTypes.string,
    noBorder: PropTypes.bool,
    subfields: PropTypes.arrayOf(PropTypes.object),
    withSwap: PropTypes.bool,
  }),
};

export default ArrayOfObjectFieldFormik
