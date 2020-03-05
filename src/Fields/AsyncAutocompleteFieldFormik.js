import React from 'react';
import { useFormikContext } from 'formik';
import { last } from "../functions/formHelper";
import AsyncAutocomplete from '../components/AsyncAutocomplete';

export default function AsyncAutocompleteFieldFormik({ fieldData }) {

  let name = last(fieldData.path);
  const { values, setFieldValue, errors, touched } = useFormikContext();
  let error = touched[name] && errors[name] ? errors[name] : "";

  console.log(values[name])

  return (
    <AsyncAutocomplete
      fieldData={fieldData}
      setFieldValue={setFieldValue}
      error={error}
      value={values[name]}
    />
  )
};
