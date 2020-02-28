import React from 'react';
import styles from './styles/formStyle';
import HintWarning from "./HintWarning";
import {
    TextField,
    makeStyles,
} from "@material-ui/core";


const useStyles = makeStyles(styles);
export default function DisplayValueFormik({ fieldData }) {

    const classes = useStyles();

    let error;
    if (fieldData.yup) {
        try {
            fieldData.yup.validateSync(fieldData.value);
        } catch (e) {
            error = e.message
        }
    }

    return (
        <div className={classes.flex} key={fieldData.title}>
            <TextField
                className={classes.flexGrow}
                margin={"dense"}
                variant={"filled"}
                label={fieldData.title}
                inputlabelprops={{ shrink: true }}
                InputProps={{
                    readOnly: true
                }}
                error={!!error}
                helperText={error}
                multiline={fieldData.multiline}
                value={fieldData.value}
            />
            <HintWarning hint={fieldData.hint} />
        </div>
    )
};