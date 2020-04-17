import React, { useState, useEffect } from 'react';
import { useFormikContext } from 'formik';
import { isEmptyObject } from "../functions/formHelper"

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
