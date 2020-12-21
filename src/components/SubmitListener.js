import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import useIsMounted from './../functions/useIsMounted';

export default function SubmitListener({ onSubmitWithError }) {

  const formik = useFormikContext();
  const [isSubmitting, setIsSubmitting] = useState(formik.isSubmitting);
  const isMounted = useIsMounted();

  useEffect(() => {
    if ((isSubmitting !== formik.isSubmitting)) {
      if (!formik.isValid) {
        onSubmitWithError(formik);
      }
      if (isMounted.current) {
        setIsSubmitting(isSubmitting);
      }
    }
  }, [formik.isSubmitting, formik.isValid]);

  return null;
}
