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

  if (readOnly) {
    //can be true without read only
    fieldData.disabled = true
  }

  switch (fieldData.typeField) {
    case "group":
      return <GroupFieldFormik fieldData={fieldData} />;
    case "text":
      return <TextFieldFormik fieldData={fieldData} />;
    case "select":
      return <SelectFieldFormik fieldData={fieldData} />;
    case "displayValue":
      return <DisplayValueFormik fieldData={fieldData} />;
    case "date":
      return <DateFormik fieldData={fieldData} />;
    case "checkbox":
      return <CheckboxFormik fieldData={fieldData} />;
    case "switch":
      return <CheckboxFormik fieldData={fieldData} isSwitch />;
    case "arrayObject":
      return <ArrayOfObjectFieldFormik fieldData={fieldData} />;
    case "array":
      return <ArrayFieldFormik fieldData={fieldData} />;
    case "autocomplete":
      return <AutocompleteFieldFormik fieldData={fieldData} />;
    case "asyncAutocomplete":
      return <AsyncAutocompleteFieldFormik fieldData={fieldData} />;
    case "richTextEditor":
      return <RichTextEditorFormik fieldData={fieldData} />;
    default:
      return null
  }
}


