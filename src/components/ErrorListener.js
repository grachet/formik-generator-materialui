import React, { useState, useEffect } from 'react';
import { useFormikContext } from 'formik';
import isequal from 'lodash.isequal';

const defaultShouldTriggerErrors = (errors, nextErrors) => !isequal(errors, nextErrors);

export const ErrorListener = ({ onError, shouldTriggerErrors }) => {

  shouldTriggerErrors = shouldTriggerErrors || defaultShouldTriggerErrors;

  const formik = useFormikContext();
  const [errors, updateErrors] = useState(formik.errors);

  useEffect(() => {
    if (shouldTriggerErrors(errors, formik.errors)) {
      onError(formik.errors);
      updateErrors(errors);
    }
  }, [formik.errors]);

  return "uhiuhiu";
}
