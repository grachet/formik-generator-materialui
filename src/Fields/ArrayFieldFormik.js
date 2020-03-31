import React from 'react';
import { FieldArray, useField } from 'formik';
import AddIcon from '@material-ui/icons/AddCircle';
import RemoveIcon from '@material-ui/icons/RemoveCircle';
import HintWarning from "../UI/HintWarning";
import classes from '../index.css';
import { Button, IconButton, Typography, FormHelperText, Tooltip } from '@material-ui/core';
import PropTypes from 'prop-types';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';

function ArrayFieldFormik({ FieldGenerator, fieldData: { title = "", path = "", readOnly = false, hint = "", warning = "", required = false,
  emptyAddText = "Add", subfield = {}, noBorder = false, withSwap = false, renderRightButton = null } }) {

  const [{ value }, { error }] = useField(path);

  let haveError = (!!error) && !(Array.isArray(error) && error.every(v => !v));

  return <FieldArray
    validateOnChange={false}
    name={path}
    render={arrayHelpers => (
      <div className={noBorder ? "" : haveError ? classes.errorBorderContainer : classes.borderContainer}>
        {title && <Typography variant="body2" gutterBottom
          color="textSecondary"
          component={'div'}
          className={haveError ? classes.errorColor : ""}
        >{required ? title + " *" : title}
          <HintWarning text={warning} isWarning />
          <HintWarning text={hint} />
        </Typography>}
        {value && value.length > 0 ? (
          <div>
            {value.map((arrayValue, index) => (
              <div className={classes.flex} key={index}>
                <span className={classes.flexGrow}>
                  <FieldGenerator
                    fieldData={{
                      path: path + "[" + index + "]",
                      ...subfield,
                      value: arrayValue
                    }}
                    readOnly={readOnly} />
                </span>
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
                      onClick={() => arrayHelpers.insert(index + 1, '')}
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
                {renderRightButton && <div className={classes.buttonHint}>
                  {renderRightButton}
                </div>}
              </div>
            )
            )}
          </div>
        ) : (
            <Button variant="outlined" disabled={readOnly} onClick={() => arrayHelpers.push('')}>
              {emptyAddText}
            </Button>
          )
        }
        {!!error && !Array.isArray(error) && < FormHelperText error>{error}</FormHelperText>}
      </ div >
    )}
  />
}

ArrayFieldFormik.propTypes = {
  fieldData: PropTypes.shape({
    path: PropTypes.string.isRequired,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    hint: PropTypes.string,
    warning: PropTypes.string,
    title: PropTypes.string,

    emptyAddText: PropTypes.string,
    noBorder: PropTypes.bool,
    subfield: PropTypes.object,
    renderRightButton: PropTypes.object
  }),
};

export default ArrayFieldFormik
