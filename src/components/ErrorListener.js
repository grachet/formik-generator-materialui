import React, { useState, useEffect } from 'react';
import { useFormikContext } from 'formik';
import isequal from 'lodash.isequal';

const defaultShouldTriggerErrors = (previousErrors, formik) => !isequal(previousErrors, formik.errors);

export const ErrorListener = ({ onError, shouldTriggerErrors }) => {

  shouldTriggerErrors = shouldTriggerErrors || defaultShouldTriggerErrors;

  const formik = useFormikContext();
  const [errors, updateErrors] = useState(formik.errors);

  useEffect(() => {
    if (shouldTriggerErrors(errors, formik)) {
      onError(formik.errors);
      updateErrors(errors);
    }
  }, [formik.errors]);

  return null;
}
