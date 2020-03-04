import React from 'react';
import { Form } from 'formik';
import * as Yup from 'yup';
import FieldGenerator from './FieldGenerator';
import { addValues, getInitialValues, getValidationSchema } from '../functions/formHelper'
import FormikWithRef from './FormikWithRef';
import {
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

export default function FormGenerator({ defaultValue, fields, onSubmit, readOnly, formRef }) {

  //  static propTypes = {
  //   text: PropTypes.string
  // }

  const initialValues = fields && getInitialValues(fields, defaultValue);
  const validationSchema = fields && getValidationSchema(fields);

  // console.log(validationSchema, initialValues)

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
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
              <FieldGenerator
                readOnly={readOnly}
                formFunction={formFunction}
                fieldData={addValues(field, values)}
              />
            </div>)}
          </Form>
        )}
      </FormikWithRef>
    </MuiPickersUtilsProvider>
  );
}


