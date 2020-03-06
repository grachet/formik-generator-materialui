import React from 'react';
import { useField } from 'formik';
import { last } from "../functions/formHelper";
import AsyncAutocomplete from '../components/AsyncAutocomplete';

export default function AsyncAutocompleteFieldFormik({ fieldData, fieldData: { path } }) {


  const [{ value }, { touched, error }, { setValue }] = useField(path);
  let errorMessage = touched && error ? error : "";

  return (
    <AsyncAutocomplete
      fieldData={fieldData}
      setValue={setValue}
      errorMessage={errorMessage}
      value={value}
    />
  )
};
