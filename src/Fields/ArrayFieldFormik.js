import React from 'react';
import { FieldArray, useField } from 'formik';
import AddIcon from '@material-ui/icons/AddCircle';
import RemoveIcon from '@material-ui/icons/RemoveCircle';
// import RemoveIcon from '@material-ui/icons/Delete';
import HintWarning from "../UI/HintWarning";
import FieldGenerator from "../components/FieldGenerator";
import classes from '../index.css'
import { Button, IconButton, Typography, Tooltip } from '@material-ui/core';

export default function ArrayFieldFormik({ fieldData }) {

  const { title, path, emptyAddText, subfield, disabled, hint, warning, noBorder, renderLeftButton } = fieldData;

  const [{ value }] = useField(path);




  return <FieldArray
    validateOnChange={false}
    name={path}
    render={arrayHelpers => (
      <div className={noBorder ? "" : classes.borderContainer}>
        {title && <Typography variant="body2" gutterBottom
          color="textSecondary"
          component={'div'}>{title}
          <HintWarning hint={warning} isWarning />
          <HintWarning hint={hint} />
        </Typography>}
        {value && value.length > 0 ? (
          <div>
            {value.map((arrayValue, index) => (
              <div className={classes.flex} key={index}>
                <span className={classes.flexGrow}>
                  {/* //todo */}
                  {/* <FieldGenerator fieldData={{
                    path: [path[path.length - 1] + "[" + index + "]"],
                    ...subfield,
                    value: arrayValue
                  }} readOnly={disabled} /> */}
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
            <Button variant="outlined" disabled={disabled} onClick={() => arrayHelpers.push('')}>
              {emptyAddText}
            </Button>
          )}
      </div>
    )}
  />
}
