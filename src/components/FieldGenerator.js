import React from 'react';
import HintWarning from "../UI/HintWarning";
import {
  Typography,
  Grid,
} from "@material-ui/core";
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
import classes from '../index.css'

export default function FormikFieldGenerator({ field, disabled }) {

  let renderGroup = (fieldsData) => {
    const { title, subfields, col } = fieldsData;
    return (
      <div key={title} className={classes.wrapperArrayField}>
        {title &&
          <Typography variant="body2" className={(!fieldsData.hint ? classes.mbmd : "")}
            color="textSecondary"
            component={'div'}>{title}<HintWarning hint={fieldsData.hint} noMargin /><HintWarning hint={fieldsData.warning} noMargin isWarning /></Typography>}
        {col ?
          <Grid container spacing={2}>
            {subfields.map((fieldsData, i) => <Grid key={i} item xs={12} sm={col}>
              {switchTypeRender({ ...fieldsData, disabled: disabled || fieldsData.disabled })}
            </Grid>)}
          </Grid> :
          subfields.map((fieldData, i) => <span key={i}> {switchTypeRender({ ...fieldData, disabled: disabled || fieldData.disabled })}</span>)}
      </div>
    )
  };

  let switchTypeRender = (fieldData) => {

    switch (fieldData.typeField) {
      case "group":
        return renderGroup(fieldData);
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
  };

  return switchTypeRender({ ...field, disabled: disabled || field.disabled })

}
