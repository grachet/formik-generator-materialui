import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';

export default function SubmitListener({ onSubmitWithError }) {

  const formik = useFormikContext();
  const [isSubmitting, setIsSubmitting] = useState(formik.isSubmitting);

  useEffect(() => {
    if ((isSubmitting !== formik.isSubmitting)) {
      if (!formik.isValid) {
        onSubmitWithError(formik);
      }
      setIsSubmitting(isSubmitting);
    }
  }, [formik.isSubmitting, formik.isValid]);

  return null;
}
