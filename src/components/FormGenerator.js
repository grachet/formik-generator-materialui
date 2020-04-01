import React, { useEffect, useState } from 'react';
import { Form } from 'formik';
import * as Yup from 'yup';
import FieldGenerator from './FieldGenerator';
import FormikWithRef from './FormikWithRef';
import {
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import classes from '../index.css';
import MomentUtils from '@date-io/moment';
import PropTypes from 'prop-types';

function FormGenerator({ initialValues = {}, fields = [], onSubmit = () => null, readOnly = false, formRef = null, validateOnBlur = true, validateOnChange = true, validateOnMount = true, validationSchema = null }) {

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <FormikWithRef
        ref={formRef}
        validateOnBlur={validateOnBlur}
        validateOnChange={validateOnChange}
        validateOnMount={validateOnMount}
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
  validateOnBlur: PropTypes.bool,
  validateOnChange: PropTypes.bool,
  validateOnMount: PropTypes.bool,
  validationSchema: PropTypes.object,
};

export default FormGenerator
