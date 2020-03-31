import React, { useState, Fragment } from 'react'
import { Grid, Button, Paper } from "@material-ui/core"
import "./app.css";
import { FormDialogue } from 'formik-generator-materialui'
import ReactJson from 'react-json-view';
import * as Yup from "yup";

export default function FormDialogueExample({ readOnly }) {

  let [open, setOpen] = useState(false);
  let [result, setResult] = useState(null);

  return <Fragment>
    <Grid item xs={12} sm={6}>
      <Paper className="padding">
        <div >
          <Button style={{ margin: 5 }} variant={"outlined"} onClick={() => setOpen(1)}>Form Dialogue</Button>
          <Button style={{ margin: 5 }} variant={"outlined"} onClick={() => setOpen(2)}>Form Dialogue Large</Button>
          <Button style={{ margin: 5 }} variant={"outlined"} onClick={() => setOpen(3)}>Form Dialogue Custom</Button>
          <Button style={{ margin: 5 }} variant={"outlined"} onClick={() => setOpen(4)}>Form Dialogue ReadOnly</Button>
        </div>
        <FormDialogue
          readOnly={readOnly}
          open={open === 1}
          onCancel={() => setOpen(false)}
          onOk={(values) => {
            setResult(values)
          }}
          title={"Your title"}
          text={"Your text here"}
          initialValues={{
            user: {
              name: "john"
            }
          }}
          validationSchema={Yup.object().shape({
            user: Yup.object().shape({
              name: Yup.string().required().nullable(),
            }),
          })}
          fields={[
            {
              title: "Name",
              path: "user.name",
              typeField: "text",
            },
          ]}
        />
        <FormDialogue
          readOnly={readOnly}
          open={open === 2}
          onCancel={() => setOpen(false)}
          onOk={(values) => {
            setResult(values)
          }}
          title={"Large dialogue"}
          initialValues={{
            user: {
              name: "mark"
            }
          }}
          fields={[
            {
              title: "Name",
              path: "user.name",
              typeField: "text",
            },
          ]}
          maxWidth={"lg"}
          validationSchema={Yup.object().shape({
            user: Yup.object().shape({
              name: Yup.string().required().nullable(),
            }),
          })}
        />
        <FormDialogue
          readOnly={readOnly}
          open={open === 3}
          onCancel={() => setOpen(false)}
          onOk={(values) => {
            setResult(values)
          }}
          title={"Customize"}
          initialValues={{
            user: {
              name: "lucas"
            }
          }}
          fields={[
            {
              title: "Name",
              path: "user.name",
              typeField: "text",
            },
          ]}
          component={<div style={{ backgroundColor: "green", margin: "10px 0 10px 0" }}>Custom component</div>}
          okText={"Custom Text"}
          validationSchema={Yup.object().shape({
            user: Yup.object().shape({
              name: Yup.string().required().nullable(),
            }),
          })}
          link={{ name: "Link to npmjs.com", url: "https://www.npmjs.com/package/formik-generator-materialui" }}
        />
        <FormDialogue
          readOnly={readOnly}
          open={open === 4}
          onCancel={() => setOpen(false)}
          onOk={(values) => {
            setResult(values)
          }}
          title={"Read Only"}
          initialValues={{
            user: {
              name: "lucy"
            }
          }}
          fields={[
            {
              title: "Name",
              path: "user.name",
              typeField: "text",
            },
          ]}
          validationSchema={Yup.object().shape({
            user: Yup.object().shape({
              name: Yup.string().required().nullable(),
            }),
          })}
          readOnly={true}
        />
        {result && <div style={{ marginTop: 20 }} >
          <ReactJson name={false} displayDataTypes={false} displayObjectSize={false} theme="monokai" src={result} />
        </div>}
      </Paper>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Paper className="paper padding">
        {"import { FormDialogue } from 'formik-generator-materialui'"}
        <br />
        {"let [open, setOpen] = useState(false);"}
        <br /><br />
        {"< FormGenerator"}
        <br />
        <div className="indent">
          {"open={open]"}
          <br />
          {"onCancel={() => setOpen(false)}"}
          <br />
          {"onOk={(val) => console.log(val)}"}
          <br />
          {"title={'Your title'}"}
          <br />
          {"component={<div className='green'>custom component</div>}"}
          <br />
          {"okText={'Custom Text'}"}
          <br />
          {"link = {"}
          <ReactJson name={false} collapsed={1} displayDataTypes={false} displayObjectSize={false} theme="monokai"
            src={{
              name: "Link to npmjs.com",
              url: "https://www.npmjs.com/package/formik-generator-materialui",
            }} />
          {"}"}
          <br />
          {"initialValues={name : 'john lucy...'}"}
          <br />
          {"fields = {"}
          <ReactJson name={false} collapsed={1} displayDataTypes={false} displayObjectSize={false} theme="monokai"
            src={{
              title: "Name",
              path: "user.name",
              typeField: "text",
            }} />
          {"}"}
          <br />
          {"validationSchema={ Yup.object().shape({"}
          <br />
          {"    user: Yup.object().shape({"}
          <br />
          {"        name: Yup.string().required().nullable(),"}
          <br />
          {"   })"}
          <br />
          {"})}"}
          <br />
          {"readOnly={false]"}
        </div>
        {"/>"}
        <br />
        {"<button onClick={() => setOpen(true)}> Form Dialogue </button>"}
        <br />
      </Paper>
    </Grid >
  </Fragment>
}
