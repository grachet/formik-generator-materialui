import React from 'react';
import { Form } from 'formik';
import * as Yup from 'yup';
import FieldGen from './FormikFieldGenerator';
import { addValues, getInitialValues, getValidationSchema } from './formHelper'
import FormikWithRef from './FormikWithRef';

export default function FormikFormGenerator({ data, fields, onSubmit, readOnly, isDialogue, formRef }) {

  const initialValues = fields && getInitialValues(fields, data);
  const validationSchema = fields && getValidationSchema(fields);

  return (
    <FormikWithRef
      ref={formRef}
      validateOnBlur={false}
      validateOnChange={false}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
      validationSchema={Yup.object().shape(
        validationSchema
      )}
    >
      {({ values, ...formFunction }) => (
        <Form>
          {fields && fields.map((field, i) => <div key={i}>
            <FieldGen
              disabled={readOnly}
              formFunction={formFunction}
              field={addValues(field, values)} /></div>)}
        </Form>
      )}
    </FormikWithRef>
  );
}


