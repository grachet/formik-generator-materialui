import React, { useState, Fragment } from 'react'
import { Grid, Button, Paper } from "@material-ui/core"
import "./app.css";
import { FormDialogue } from 'formik-generator-materialui'
import ReactJson from 'react-json-view'

export default function FormDialogueExample() {

  let [open, setOpen] = useState(false);
  let [result, setResult] = useState(null);

  return <Fragment>
    <Grid item xs={12} sm={6}>
      <Paper className="padding">
        <div >
          <Button style={{ margin: 5 }} variant={"outlined"} onClick={() => setOpen(1)}>Form Dialogue</Button>
          <Button style={{ margin: 5 }} variant={"outlined"} onClick={() => setOpen(2)}>Form Dialogue Large</Button>
          <Button style={{ margin: 5 }} variant={"outlined"} onClick={() => setOpen(3)}>Form Dialogue Custom</Button>
          <Button style={{ margin: 5 }} variant={"outlined"} onClick={() => setOpen(4)}>Form Dialogue Readonly</Button>
        </div>
        <FormDialogue
          open={open === 1}
          onCancel={() => setOpen(false)}
          onOk={(values) => {
            setResult(values)
          }}
          title={"Your title"}
          text={"Your text here"}
          initialValues={{
            name: "john"
          }}
          fields={[
            {
              title: "Name",
              path: "name",
              typeField: "text",
            },
          ]}
        />
        <FormDialogue
          open={open === 2}
          onCancel={() => setOpen(false)}
          onOk={(values) => {
            setResult(values)
          }}
          title={"Large dialogue"}
          initialValues={{
            name: "mark"
          }}
          fields={[
            {
              title: "Name",
              path: "name",
              typeField: "text",
            },
          ]}
          maxWidth={"lg"}
        />
        <FormDialogue
          open={open === 3}
          onCancel={() => setOpen(false)}
          onOk={(values) => {
            setResult(values)
          }}
          title={"Customize"}
          initialValues={{
            name: "lucas"
          }}
          fields={[
            {
              title: "Name",
              path: "name",
              typeField: "text",
            },
          ]}
          component={<div style={{ backgroundColor: "green", margin: "10px 0 10px 0" }}>Custom component</div>}
          okText={"Custom Text"}
          link={{ name: "Link to npmjs.com", url: "https://www.npmjs.com/package/formik-generator-materialui" }}
        />
        <FormDialogue
          open={open === 4}
          onCancel={() => setOpen(false)}
          onOk={(values) => {
            setResult(values)
          }}
          title={"Read Only"}
          initialValues={{
            name: "lucy"
          }}
          fields={[
            {
              title: "Name",
              path: "name",
              typeField: "text",
            },
          ]}
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
              path: "name",
              typeField: "text",
            }} />
          {"}"}
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
