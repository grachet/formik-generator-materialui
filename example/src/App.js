import React, { useRef, useState } from 'react'
import { Grid, Typography, Switch, FormControlLabel, Button, Paper } from "@material-ui/core"
import "./app.css";
import { FormGenerator } from 'formik-generator-materialui'
import ReactJson from 'react-json-view'
import fieldsArray from './getFields'

function Rows({ fields, readOnly }) {

  const formRef = useRef(null);

  let [result, setResult] = useState(null);

  return <div>
    <FormGenerator
      readOnly={readOnly}
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

  const [readOnly, setReadOnly] = useState(false);

  return (
    <div className="root">
      <div className="center">
        <Typography variant="h4" className="title" gutterBottom component="span">
          formik-generator-materialui
        </Typography>
      </div>

      <div>
        <FormControlLabel
          control={
            <Switch
              checked={!!readOnly} onChange={() => setReadOnly(v => !v)}
            />
          }
          label={"Formgenerator readOnly ?"}
        />
      </div>

      <Grid container spacing={6}>
        {fieldsArray.map((fields, i) => [<Grid key={i + "1"} item xs={12} md={6}>
          <Paper className="padding">
            <Rows fields={fields} readOnly={readOnly} />
          </Paper>
        </Grid>,
        <Grid key={i + "2"} item xs={12} md={6}>
          <Paper className="paper padding">
            {"< FormGenerator"}
            <br />
            <div className="indent">
              {!!readOnly && "readOnly={true}"}
              {!!readOnly && <br />}
              {"fields = {"}
              <ReactJson name={false} collapsed={1} displayDataTypes={false} displayObjectSize={false} theme="monokai"
                src={fields} />
              {"}"}
            </div>
            {"/>"}
          </Paper>
        </Grid>
        ])
        }
      </Grid>
    </div>
  )

}


