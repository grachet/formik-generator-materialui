import React from 'react';
import styles from './styles/formStyle';
import HintWarning from "./HintWarning";
import {
    makeStyles,
} from "@material-ui/core";
import { DatePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { useFormikContext } from 'formik';

import { last } from "lodash";

const useStyles = makeStyles(styles);
export default function DateTimeFormik({ fieldData }) {
    const classes = useStyles();
    let name = last(fieldData.path);
    const { setFieldValue } = useFormikContext();

    // const [field, meta] = useField(name);
    // let error = meta.touched && meta.error ? meta.error : "";

    let DateTimeComponent = fieldData.disabled ? DatePicker : KeyboardDatePicker;

    return (
        <div className={classes.flex} key={fieldData.title}>
            <HintWarning hint={fieldData.warning} isLeft isWarning />
            <DateTimeComponent
                margin={"dense"}
                name={name}
                required={fieldData.required}
                className={classes.flexGrow}
                clearable
                inputVariant={fieldData.disabled ? "filled" : "outlined"}
                autoOk
                label={fieldData.title}
                format="dd/MM/yyyy"
                placeholder="01/01/2020"
                onChange={value => {
                    !fieldData.disabled && setFieldValue(name, value);
                }}
                value={fieldData.value}
                animateYearScrolling={false}
            />
            <HintWarning hint={fieldData.hint} />
        </div>
    )
};