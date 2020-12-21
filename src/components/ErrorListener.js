import { useFormikContext } from 'formik';
import isequal from 'lodash.isequal';
import { useEffect, useState } from 'react';
import useIsMounted from '../functions/useIsMounted';

const defaultShouldTriggerErrors = (previousErrors, formik) => !isequal(previousErrors, formik.errors);

export default function ErrorListener({ onError, shouldTriggerErrors }) {

  shouldTriggerErrors = shouldTriggerErrors || defaultShouldTriggerErrors;

  const formik = useFormikContext();
  const [errors, updateErrors] = useState(formik.errors);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (shouldTriggerErrors(errors, formik)) {
      onError(formik.errors);
      if (isMounted.current) {
        updateErrors(errors);
      }
    }
  }, [formik.errors]);

  return null;
}
