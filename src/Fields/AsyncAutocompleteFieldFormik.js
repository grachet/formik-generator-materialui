import React from 'react';
import { useFormikContext } from 'formik';
import { last } from "lodash";
import AsyncAutocomplete from './AsyncAutocomplete';


export default function AsyncAutocompleteFieldFormik({ fieldData }) {

    let name = last(fieldData.path);
    const { values, setFieldValue, errors, touched } = useFormikContext();
    let error = touched[name] && errors[name] ? errors[name] : "";

    return (
        <AsyncAutocomplete
            fieldData={fieldData}
            setFieldValue={setFieldValue}
            error={error}
            value={values[name]}
        />
    )
};