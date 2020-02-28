import React from 'react';
// import HintWarning from "./HintWarning";
import {
  Typography,
  Grid,
} from "@material-ui/core";
import TextFieldFormik from "../Fields/TextFieldFormik";
// import DisplayValueFormik from './DisplayValueFormik';
// import SelectFieldFormik from './SelectFieldFormik';
// import DateTimeFormik from './DateTimeFormik';
// import CheckboxFormik from './CheckboxFormik';
// import ArrayFieldFormik from './ArrayFieldFormik';
// import ObjectFieldFormik from './ObjectFieldFormik';
// import AutocompleteFieldFormik from "./AutocompleteFieldFormik";
// import AsyncAutocompleteFieldFormik from './AsyncAutocompleteFieldFormik';
// import RichTextEditorFormik from './RichTextEditorFormik';

export default function FormikFieldGenerator({ field, disabled, formFunction }) {

  // let renderGroup = (fieldsData) => {
  //   const { title } = fieldsData;
  //   return (
  //     <div key={title} className={classes.wrapperArrayField + " " + classes.mymd}>
  //       {title &&
  //         <Typography variant="body2" className={(!fieldsData.hint ? classes.mbmd : "")}
  //           color="textSecondary"
  //           component={'div'}>{title}<HintWarning hint={fieldsData.hint} noMargin /></Typography>}
  //       {fieldsData.col ? <Grid container spacing={2}>
  //         {fieldsData.subfields.map((fieldsData, i) => <Grid key={i} item xs={12} md={fieldsData.col}>
  //           {switchTypeRender(disabled ? { ...fieldsData, disabled: true } : fieldsData)}
  //         </Grid>)}
  //       </Grid> :
  //         fieldsData.subfields.map((fieldData, i) => <span key={i}> {switchTypeRender(disabled ? { ...fieldData, disabled: true } : fieldData)}</span>)}
  //     </div>
  //   )
  // };

  let switchTypeRender = (fieldData) => {

    switch (fieldData.typeField) {
      case "textfield":
        return <TextFieldFormik fieldData={fieldData} />;
      // case "group":
      //   return renderGroup(fieldData);
      // case "displayValue":
      //   return <DisplayValueFormik fieldData={fieldData} />;
      // case "select":
      //   return <SelectFieldFormik fieldData={fieldData} />;
      // case "dateTime":
      //   return <DateTimeFormik fieldData={fieldData} />;
      // case "richTextEditor":
      //   return <RichTextEditorFormik fieldData={fieldData} />;
      // case "switch":
      //   return <CheckboxFormik fieldData={fieldData} />;
      // case "objectField":
      //   return <ObjectFieldFormik fieldData={fieldData} />;
      // case "arrayField":
      //   return <ArrayFieldFormik fieldData={fieldData} />;
      // case "autocompleteField":
      //   return <AutocompleteFieldFormik fieldData={fieldData} />;
      // case "asyncAutocompleteField":
      //   return <AsyncAutocompleteFieldFormik fieldData={fieldData} />;
      default:
        return null
    }
  };

  return switchTypeRender(disabled ? { ...field, disabled: true } : field)

}
