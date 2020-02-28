import React from 'react';
import { FieldArray } from 'formik';
import AddIcon from '@material-ui/icons/AddCircle';
import RemoveIcon from '@material-ui/icons/Delete';
import styles from './styles/formStyle';
import HintWarning from "./HintWarning";
import FieldGen from "./FormikFieldGenerator";

import { Button, IconButton, makeStyles, Typography, Tooltip } from '@material-ui/core';
const useStyles = makeStyles(styles);

export default function ArrayFieldFormik({ fieldData }) {

  const classes = useStyles();
  const { title, path, value, emptyAddText, noBorder, renderLeftButton } = fieldData;

  return <FieldArray
    key={fieldData.title}
    validateOnChange={false}
    name={path[path.length - 1]}
    render={arrayHelpers => (
      <div className={noBorder ? "" : classes.wrapperArrayField + " " + classes.mymd}>
        {title &&
          <Typography variant="body2" className={(!fieldData.hint ? classes.mbmd : "")}
            color="textSecondary"
            component={'div'}>{title}<HintWarning hint={fieldData.hint} noMargin /></Typography>}
        {value && value.length > 0 ? (
          <div>
            {value.map((arrayValue, index) => (
              <div className={classes.flex} key={index}>
                <span className={classes.flexGrow}>
                  <FieldGen field={{
                    path: [path[path.length - 1] + "[" + index + "]"],
                    ...fieldData.subfield,
                    value: arrayValue
                  }} />
                </span>
                <div className={classes.buttonHint}>
                  <Tooltip title={"Add"}>
                    <IconButton
                      disabled={fieldData.disabled}
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
                      disabled={fieldData.disabled}
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
            <Button variant="outlined" className={classes.mymd} onClick={() => arrayHelpers.push('')}>
              {emptyAddText}
            </Button>
          )}
      </div>
    )}
  />
}
