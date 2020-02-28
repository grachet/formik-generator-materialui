import React from 'react';
import styles from './styles/formStyle';
import HintWarning from "./HintWarning";
import {
    makeStyles,
    FormControlLabel,
    Checkbox,
} from "@material-ui/core";
import { useField } from 'formik';

import { last } from "lodash";

const useStyles = makeStyles(styles);
export default function CheckboxFormik({ fieldData }) {
    const classes = useStyles();
    let name = last(fieldData.path);
    const [field] = useField(name);

    return (
        <div className={classes.flex} key={"checkbox" + fieldData.title}>
            <HintWarning hint={fieldData.warning} isLeft isWarning />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={!!field.value} name={name} onChange={field.onChange}
                    />
                }
                disabled={fieldData.disabled}
                label={fieldData.title}
            />
            <HintWarning hint={fieldData.hint} />
        </div>
    )
};
