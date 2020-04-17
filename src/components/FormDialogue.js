import React, { useRef } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import FormGenerator from "./FormGenerator";
import PropTypes from 'prop-types';

function FormDialogue({ onOk = () => null, disableCancelOnOK = false,
  okText = "Ok", title = "", maxWidth = "sm", open = false, component = null, onCancel = () => null, link = "", text = "",
  initialValues = {}, fields = [], readOnly = false, validationSchema = null,
  validateOnBlur = true, validateOnChange = true, validateOnMount = false,
  onError = null, shouldTriggerErrors = null, onSubmitWithError = null
}) {

  const formRef = useRef(null);

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth={maxWidth}
        open={open}
        onClose={onCancel}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {text}
          </DialogContentText>
          {link &&
            <Button href={link.url} target="_blank" color="primary" size={"small"} variant={"outlined"}>{link.name || link.url}</Button>
          }
          {component}
          <FormGenerator
            validationSchema={validationSchema}
            onSubmit={(values) => {
              !disableCancelOnOK && onCancel();
              onOk(values);
            }}
            fields={fields}
            formRef={formRef}
            readOnly={readOnly}
            initialValues={initialValues}
            validateOnBlur={validateOnBlur}
            validateOnChange={validateOnChange}
            validateOnMount={validateOnMount}
            onError={onError}
            shouldTriggerErrors={shouldTriggerErrors}
            onSubmitWithError={onSubmitWithError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="primary">
            Cancel
            </Button>
          <Button onClick={() => formRef.current && formRef.current.submitForm()} color="primary">
            {okText}
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}

FormDialogue.propTypes = {
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  disableCancelOnOK: PropTypes.bool,
  onError: PropTypes.func,
  okText: PropTypes.string,
  title: PropTypes.string,
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', false]),
  open: PropTypes.bool,
  component: PropTypes.object,
  link: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string.isRequired,
  }),
  text: PropTypes.string,
  initialValues: PropTypes.object,
  fields: PropTypes.arrayOf(PropTypes.object),
  readOnly: PropTypes.bool,
  validateOnBlur: PropTypes.bool,
  validateOnChange: PropTypes.bool,
  validateOnMount: PropTypes.bool,
  validationSchema: PropTypes.object,
  shouldTriggerErrors: PropTypes.func,
  onSubmitWithError: PropTypes.func,
};

export default FormDialogue
