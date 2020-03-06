import React, { useEffect, useState } from 'react';
import { Form } from 'formik';
import * as Yup from 'yup';
import FieldGenerator from './FieldGenerator';
import { getValidationSchema } from '../functions/formHelper'
import FormikWithRef from './FormikWithRef';
import {
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

let validationSchema = {};

export default function FormGenerator({ initialValues, fields, onSubmit, readOnly, formRef, isValidateOnlyOnSubmit }) {

  //  static propTypes = {
  //   text: PropTypes.string
  // }

  const [validationSchema, setValidationSchema] = useState({})

  useEffect(() => {
    setValidationSchema(Yup.object().shape(
      getValidationSchema((fields || []))
    ));
    console.log("new validationSchema", validationSchema)
  }, [fields])

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <FormikWithRef
        ref={formRef}
        validateOnBlur={!isValidateOnlyOnSubmit}
        validateOnChange={!isValidateOnlyOnSubmit}
        // validateOnMount={!isValidateOnlyOnSubmit}
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values);
          setSubmitting(false);
        }}
        validationSchema={validationSchema}
      >
        {({ values, ...formFunction }) => (
          <Form>
            {fields && fields.map((field, i) => <div key={i}>
              <FieldGenerator
                readOnly={readOnly}
                formFunction={formFunction}
                fieldData={field}
              />
            </div>)}
          </Form>
        )}
      </FormikWithRef>
    </MuiPickersUtilsProvider>
  );
}


