import React, { useRef, useState } from 'react'
import { Grid, Typography, Button, Paper } from "@material-ui/core"
import "./app.css";
import { FormGenerator } from 'formik-generator-materialui'
import ReactJson from 'react-json-view'
import fieldsArray from './getFields'

function Rows({ fields }) {

  const formRef = useRef(null);

  let [result, setResult] = useState(null);

  return <div>
    <FormGenerator
      formRef={formRef}
      defaultValue={{
        // name: "john"
      }}
      onSubmit={(values) => {
        setResult(values)
      }}
      fields={fields}
    />
    <Button style={{ marginTop: 20 }} variant={"outlined"} onClick={() => {
      formRef.current.submitForm(); //.isSubmitting() .setFieldTouched() ...
    }}>Validate</Button>
    {result && <div style={{ marginTop: 20 }} >
      <ReactJson name={false} displayDataTypes={false} displayObjectSize={false} theme="monokai" src={result} />
    </div>}
  </div>
}


export default function App() {

  return (
    <div className="root">
      <Typography variant="h4" className="title" gutterBottom>
        formik-generator-materialui
        </Typography>

      <Grid container spacing={6}>
        {fieldsArray.map((fields, i) => [<Grid key={i + "1"} item xs={12} md={6}>
          <Paper className="padding">
            <Rows fields={fields} />
          </Paper>
        </Grid>,
        <Grid key={i + "2"} item xs={12} md={6}>
          <Paper className="paper padding">
            {"< FormGenerator"}
            <br />
            {"fields = {"}
            <ReactJson name={false} collapsed={1} displayDataTypes={false} displayObjectSize={false} theme="monokai"
              src={fields} />
            {"} />"}
          </Paper>
        </Grid>
        ])
        }
      </Grid>
    </div>
  )

}


