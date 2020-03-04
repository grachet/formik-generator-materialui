import React from 'react';
import { FieldArray } from 'formik';
import AddIcon from '@material-ui/icons/AddCircle';
import RemoveIcon from '@material-ui/icons/Delete';
import HintWarning from "../UI/HintWarning";
import FieldGenerator from "../components/FieldGenerator";
import classes from '../index.css'
import { Button, IconButton, Typography, Tooltip } from '@material-ui/core';

export default function ArrayFieldFormik({ fieldData }) {

  const { title, path, value, emptyAddText, subfield, disabled, hint, warning, noBorder, renderLeftButton } = fieldData;

  return <FieldArray
    validateOnChange={false}
    name={path[path.length - 1]}
    render={arrayHelpers => (
      <div className={noBorder ? "" : classes.wrapperArrayField}>
        {title &&
          <Typography variant="body2" className={(!hint ? classes.mbmd : "")}
            color="textSecondary"
            component={'div'}>{title}<HintWarning hint={hint} noMargin /><HintWarning hint={warning} noMargin isWarning /></Typography>}
        {value && value.length > 0 ? (
          <div>
            {value.map((arrayValue, index) => (
              <div className={classes.flex} key={index}>
                <span className={classes.flexGrow}>
                  <FieldGenerator fieldData={{
                    path: [path[path.length - 1] + "[" + index + "]"],
                    ...subfield,
                    value: arrayValue
                  }} readOnly={disabled} />
                </span>
                <div className={classes.buttonHint}>
                  <Tooltip title={"Add"}>
                    <IconButton
                      disabled={disabled}
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
                      disabled={disabled}
                      onClick={() => arrayHelpers.remove(index)}
                      color="primary"
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Tooltip>
                </div>
                <div className={classes.buttonHint}>
                  {renderLeftButton && renderLeftButton(index)}
                </div>
              </div>
            )
            )}
          </div>
        ) : (
            <Button variant="outlined" disabled={disabled} className={classes.mymd} onClick={() => arrayHelpers.push('')}>
              {emptyAddText}
            </Button>
          )}
      </div>
    )}
  />
}
