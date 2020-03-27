import React, { useEffect, useState } from 'react';
import { Form } from 'formik';
import * as Yup from 'yup';
import FieldGenerator from './FieldGenerator';
import { getValidationSchema } from '../functions/formHelper'
import FormikWithRef from './FormikWithRef';
import {
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import classes from '../index.css';
import MomentUtils from '@date-io/moment';
import PropTypes from 'prop-types';

let validationSchema = {};

function FormGenerator({ initialValues = {}, fields = [], onSubmit = () => null, readOnly = false, formRef = null, isValidateOnlyOnSubmit = false }) {

  const [validationSchema, setValidationSchema] = useState({})

  useEffect(() => {
    console.log(getValidationSchema(fields));
    setValidationSchema(Yup.object().shape(
      getValidationSchema(fields)
    ));
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
            {fields && fields.map((field, i) => <div key={i} className={classes.noCollapse}>
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

FormGenerator.propTypes = {
  initialValues: PropTypes.object,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSubmit: PropTypes.func,
  readOnly: PropTypes.bool,
  formRef: PropTypes.object.isRequired,
  isValidateOnlyOnSubmit: PropTypes.bool,
};

export default FormGenerator
