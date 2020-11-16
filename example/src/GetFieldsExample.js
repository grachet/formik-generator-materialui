import { Button, Grid, Paper } from "@material-ui/core";
import React, { useRef, useState } from 'react';
import ReactJson from 'react-json-view';
import { FormGenerator } from 'formik-generator-materialui'
import * as Yup from "yup";
import "./app.css";
import { Fragment } from "react";

export default function GetFieldsExample({ readOnly, displayAllProps }) {

  const formRef = useRef(null);
  let [result, setResult] = useState(null);

  let getFields = ({ typeField } = {}) => [
    {
      title: "Type of second field",
      typeField: "select",
      path: "typeField",
      choices: ["text", "date"]
    },
    typeField === "text" ? {
      title: "Text",
      path: "text",
      typeField: "text",
    } : {
        title: 'Date',
        path: 'date',
        typeField: 'date',
      }
  ]

  let initialValues = {
    typeField: "text",
  }

  return <Fragment>
    <Grid item xs={12} md={6}>
      <Paper className="padding">
        <FormGenerator
          onSubmitWithError={(error) => console.log("error", error)}
          readOnly={readOnly}
          formRef={formRef}
          initialValues={initialValues}
          onSubmit={(values) => {
            setResult(values)
          }}
          getFields={getFields}
          validationSchema={Yup.object().shape({
            text: Yup.number().positive().integer().nullable(),
            date: Yup.date().nullable(),
          })}
        />
        <Button style={{ marginTop: 20 }} variant={"outlined"} onClick={() => {
          formRef.current.submitForm();
        }}>Validate</Button>
        {result && <div style={{ marginTop: 20 }} >
          <ReactJson name={false} displayDataTypes={false} displayObjectSize={false} theme="monokai" src={result} />
        </div>}
      </Paper>
    </Grid>
    <Grid item xs={12} md={6}>
      <Paper className="paper padding">
        {!!displayAllProps && <span>
          {"import { FormGenerator } from 'formik-generator-materialui'"}
          <br />
          {"const formRef = useRef(null);"}
          <br /> <br />
        </span>}
        {"< FormGenerator"}
        <br />
        <div className="indent">
          {!!readOnly && "readOnly={true}"}
          {!!readOnly && <br />}
          {!!displayAllProps && <span>
            {"formRef={formRef}"}
            <br />
            {"initialValues="}
            <ReactJson name={false} collapsed={1} displayDataTypes={false} displayObjectSize={false} theme="monokai"
              src={initialValues} />
            {"onSubmit={(val) => console.log(val)}"}
            <br />
          </span>}
          {"getFields = (values) => {"}
          <br />
          {" return values.typefield === \"text\" ? [...] : [...]"}
          <br />
          {"}"}
        </div>
        {"/>"}
        {!!displayAllProps && <span>
          <br />
          {"<button onClick={() => formRef.current.submitForm()}> Validate </button>"}
          <br /> <br />
        </span>}
      </Paper>
    </Grid>
  </Fragment>
}

