
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles/formStyle';
import HintWarning from "./HintWarning";
import {
    makeStyles,
    FormControl,
    InputLabel,
    FormHelperText,
    MenuItem,
    Select,
    OutlinedInput,
    FilledInput,
} from "@material-ui/core";
import { useField } from 'formik';

import { last } from "lodash";

const useStyles = makeStyles(styles);
export default function SelectFieldFormik({ fieldData }) {

    const selectRef = useRef(null);
    const classes = useStyles();

    const [labelWidth, setLabelWidth] = useState(null);

    let name = last(fieldData.path);
    const [field, meta] = useField(name);

    let error = meta.touched && meta.error ? meta.error : "";
    let noLabelNotchWidth = fieldData.title ? fieldData.title.length * 9 : 0;

    useEffect(() => {
        if (selectRef && selectRef.current) {
            let labelWidth = selectRef.current.offsetWidth;
            setLabelWidth(labelWidth);
        }
    }, [fieldData.title]);

    return (
        <div className={classes.flex} key={fieldData.title}>
            <HintWarning hint={fieldData.warning} isLeft isWarning />
            <FormControl
                error={!!error}
                variant={fieldData.disabled ? "filled" : "outlined"}
                margin={"dense"}
                className={classes.flexGrow}>
                <InputLabel
                    shrink={!!fieldData.value || (fieldData.value === 0)}
                    required={fieldData.required}
                    ref={selectRef}
                    htmlFor={name}>{fieldData.title}</InputLabel>
                <Select
                    name={field.name}
                    value={field.value === 0 ? 0 : field.value || ''}
                    onChange={field.onChange}
                    input={fieldData.disabled ?
                        <FilledInput
                            readOnly={true}
                            field={fieldData.value}
                        />
                        :
                        <OutlinedInput
                            field={fieldData.value}
                            id={name}
                            labelWidth={labelWidth || noLabelNotchWidth}
                            notched={!!fieldData.value || (fieldData.value === 0)}
                        />}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 300,
                            },
                        }
                    }}
                    label={fieldData.title}
                >
                    {fieldData.choice.map((choice, i) => {
                        if (!choice.category) {
                            return <MenuItem key={i} value={choice}>
                                {(fieldData.titleChoice && fieldData.titleChoice[i]) || choice}
                            </MenuItem>
                        } else {
                            return [
                                <MenuItem key={choice.category} disabled>
                                    <em>{choice.category}</em>
                                </MenuItem>,
                                choice.values.map((value, j) => <MenuItem key={j + value} value={value}>{value}</MenuItem>)
                            ]
                        }
                    }
                    )}
                </Select>
                {error && <FormHelperText margin={"dense"} error>{error}</FormHelperText>}
            </FormControl>
            <HintWarning hint={fieldData.hint} />
        </div>
    )
};