
import React, { useEffect, useRef, useState } from 'react';
import HintWarning from "../UI/HintWarning";
import {
  FormControl,
  InputLabel,
  FormHelperText,
  MenuItem,
  Select,
  OutlinedInput,
  FilledInput,
} from "@material-ui/core";
import { useField } from 'formik';
import classes from '../index.css'
import PropTypes from 'prop-types';

import { last } from "../functions/formHelper";

function SelectFieldFormik({ fieldData: { title = "", path = "", disabled = false, hint = "", warning = "", required = false, choices = [], titleChoices = [] } }) {

  const [field, { error }] = useField(path);

  const selectRef = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  let noLabelNotchWidth = title ? title.length * 9 : 0;

  useEffect(() => {
    if (selectRef && selectRef.current) {
      let labelWidth = selectRef.current.offsetWidth;
      setLabelWidth(labelWidth);
    }
  }, [title]);

  let menu = choices.map((choice, i) => {
    if (!choice && choice !== 0) {
      return <MenuItem key={i} value={null}>
        {"-"}
      </MenuItem>
    } else if (!choice.category) {
      return <MenuItem key={i} value={choice}>
        {(titleChoices && titleChoices[i]) || choice}
      </MenuItem>
    } else {
      return [
        <MenuItem key={i + "category"} disabled>
          <em>{choice.category}</em>
        </MenuItem>,
        choice.values.map((value, j) => <MenuItem key={j + "" + i} value={value}>{value}</MenuItem>)
      ]
    }
  })

  return (
    <div className={classes.flex}>
      <HintWarning hint={warning} isWarning />
      <FormControl
        error={!!error}
        variant={disabled ? "filled" : "outlined"}
        margin={"dense"}
        className={classes.flexGrow}>
        <InputLabel
          shrink={!!field.value || (field.value === 0)}
          required={required}
          ref={selectRef}
          htmlFor={path}>
          {title}
        </InputLabel>
        <Select
          name={field.name}
          value={field.value === 0 ? 0 : field.value || ''}
          onChange={field.onChange}
          input={disabled ?
            <FilledInput
              readOnly={true}
            />
            :
            <OutlinedInput
              labelWidth={labelWidth || noLabelNotchWidth}
              notched={!!field.value || (field.value === 0)}
            />}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
              },
            }
          }}
          label={title}
        >
          {menu}
        </Select>
        {error && <FormHelperText margin={"dense"} error>{error}</FormHelperText>}
      </FormControl>
      <HintWarning hint={hint} />
    </div>
  )
};


SelectFieldFormik.propTypes = {
  fieldData: PropTypes.shape({
    path: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    hint: PropTypes.string,
    warning: PropTypes.string,
    title: PropTypes.string,

    choices: PropTypes.array.isRequired,
    titleChoices: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default SelectFieldFormik
