import React from 'react';
import { useField } from 'formik';
import { last } from "../functions/formHelper";
import AsyncAutocomplete from '../components/AsyncAutocomplete';

export default function AsyncAutocompleteFieldFormik({ fieldData, fieldData: { path } }) {


  const [{ value }, { error }, { setValue }] = useField(path);

  return (
    <AsyncAutocomplete
      fieldData={fieldData}
      setValue={setValue}
      error={error}
      value={value}
    />
  )
};
