import React from 'react';
import TextFieldFormik from "../Fields/TextFieldFormik";
import DisplayValueFormik from '../Fields/DisplayValueFormik';
import SelectFieldFormik from '../Fields/SelectFieldFormik';
import DateFormik from '../Fields/DateFormik';
import CheckboxFormik from '../Fields/CheckboxFormik';
import ArrayFieldFormik from '../Fields/ArrayFieldFormik';
import ArrayOfObjectFieldFormik from '../Fields/ArrayOfObjectFieldFormik';
import AutocompleteFieldFormik from "../Fields/AutocompleteFieldFormik";
import AsyncAutocompleteFieldFormik from '../Fields/AsyncAutocompleteFieldFormik';
import RichTextEditorFormik from '../Fields/RichTextEditorFormik';
import GroupFieldFormik from '../Fields/GroupFieldFormik';

export default function FieldGenerator({ fieldData, readOnly }) {

  let fieldDataWithReadOnly = { ...fieldData, disabled: fieldData.disabled || readOnly };

  switch (fieldData.typeField) {
    case "group":
      return <GroupFieldFormik fieldData={fieldDataWithReadOnly} />;
    case "text":
      return <TextFieldFormik fieldData={fieldDataWithReadOnly} />;
    case "select":
      return <SelectFieldFormik fieldData={fieldDataWithReadOnly} />;
    case "displayValue":
      return <DisplayValueFormik fieldData={fieldDataWithReadOnly} />;
    case "date":
      return <DateFormik fieldData={fieldDataWithReadOnly} />;
    case "checkbox":
      return <CheckboxFormik fieldData={fieldDataWithReadOnly} />;
    case "switch":
      return <CheckboxFormik fieldData={fieldDataWithReadOnly} isSwitch />;
    case "arrayObject":
      return <ArrayOfObjectFieldFormik fieldData={fieldDataWithReadOnly} />;
    case "array":
      return <ArrayFieldFormik fieldData={fieldDataWithReadOnly} />;
    case "autocomplete":
      return <AutocompleteFieldFormik fieldData={fieldDataWithReadOnly} />;
    case "asyncAutocomplete":
      return <AsyncAutocompleteFieldFormik fieldData={fieldDataWithReadOnly} />;
    case "richTextEditor":
      return <RichTextEditorFormik fieldData={fieldDataWithReadOnly} />;
    default:
      return null
  }
}


