
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

import { last } from "../functions/formHelper";

export default function SelectFieldFormik({ fieldData }) {

  const { title, path, choice, titleChoice, category, disabled, value, hint, warning, required } = fieldData;

  const selectRef = useRef(null);
  const [labelWidth, setLabelWidth] = useState(null);

  let name = last(path);
  const [field, meta] = useField(name);

  let error = meta.touched && meta.error ? meta.error : "";
  let noLabelNotchWidth = title ? title.length * 9 : 0;

  useEffect(() => {
    if (selectRef && selectRef.current) {
      let labelWidth = selectRef.current.offsetWidth;
      setLabelWidth(labelWidth);
    }
  }, [title]);

  return (
    <div className={classes.flex}>
      <HintWarning hint={warning} isLeft isWarning />
      <FormControl
        error={!!error}
        variant={disabled ? "filled" : "outlined"}
        margin={"dense"}
        className={classes.flexGrow}>
        <InputLabel
          shrink={!!value || (value === 0)}
          required={required}
          ref={selectRef}
          htmlFor={name}>{title}</InputLabel>
        <Select
          name={field.name}
          value={field.value === 0 ? 0 : field.value || ''}
          onChange={field.onChange}
          input={disabled ?
            <FilledInput
              readOnly={true}
              field={value}
            />
            :
            <OutlinedInput
              field={value}
              labelWidth={labelWidth || noLabelNotchWidth}
              notched={!!value || (value === 0)}
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
          {choice.map((choice, i) => {
            if (!choice.category) {
              return <MenuItem key={i} value={choice}>
                {(titleChoice && titleChoice[i]) || choice}
              </MenuItem>
            } else {
              return [
                <MenuItem key={category} disabled>
                  <em>{category}</em>
                </MenuItem>,
                choice.values.map((value, j) => <MenuItem key={j + value} value={value}>{value}</MenuItem>)
              ]
            }
          }
          )}
        </Select>
        {error && <FormHelperText margin={"dense"} error>{error}</FormHelperText>}
      </FormControl>
      <HintWarning hint={hint} />
    </div>
  )
};
