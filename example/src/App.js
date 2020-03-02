import React, { useRef, useState } from 'react'
import { Grid, Typography, Button, Paper } from "@material-ui/core"
import "./app.css";
import * as Yup from "yup"
import { FormGenerator, FieldGenerator } from 'formik-generator-materialui'
import ReactJson from 'react-json-view'

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


  const fieldsArray = [
    [
      {
        title: "Name",
        path: ["name"],
        typeField: "text",
      },
      {
        title: "Multiline",
        path: ["name"],
        typeField: "text",
        multiline: true,
      },
      {
        title: "Disabled name",
        path: ["name"],
        typeField: "text",
        disabled: true
      }
    ],
    [
      {
        title: "Is Rich ?",
        path: ["isRich"],
        typeField: "checkbox",
      },
      {
        title: "Is disabled ?",
        path: ["isDisabled"],
        typeField: "checkbox",
        disabled: true
      },
      {
        title: "Have an Iphone ?",
        path: ["haveIphone"],
        typeField: "switch",
      },
      {
        title: "Is switch disabled ?",
        path: ["isSwitchDisabled"],
        typeField: "switch",
        disabled: true
      }
    ],
    [
      {
        title: 'Adress',
        path: [
          'adress',
        ],
        subfields: [
          {
            title: "number",
            name: "number",
            typeField: 'text',
          }, {
            title: "street name",
            name: "streetName",
            typeField: 'textfield',
          }, {
            title: "Country",
            name: "country",
            choice: ["France", "USA", "Mexico"],
            typeField: 'select',
          }],
        typeField: 'arrayObject',
        emptyAddText: "Add adress"
      }
    ],
    [
      {
        hint: "Hint text",
        title: "Hint",
        typeField: "text",
        path: ["hint"]
      },
      {
        warning: "Warning text",
        title: "Warning",
        typeField: "text",
        path: ["warning"]
      },
    ],
    [
      {
        title: "Color hexa",
        typeField: "select",
        path: ["color"],
        choice: ["#003fff", "#5dff00", "#ff0000"]
      },
      {
        title: "Color hexa with name",
        typeField: "select",
        path: ["colorNamed"],
        choice: ["#003fff", "#5dff00", "#ff0000"],
        titleChoice: ["blue", "green", "red"]
      },
    ],
    [
      {
        title: "Group",
        typeField: "group",
        hint: "Group hint",
        subfields: [
          {
            title: "Name",
            typeField: "text",
            path: ["group", "name"]
          },
          {
            title: "Adress",
            typeField: "text",
            path: ["group", "adress"]
          },
          {
            title: "Not in group object",
            typeField: "text",
            path: ["obj"]
          },
        ],
      },
    ], [
      {
        title: "First",
        typeField: "text",
        path: ["first"]
      },
      {
        title: "Second",
        typeField: "text",
        path: ["second"]
      },
      {
        title: 'Display first-second',
        separator: "-",
        display: [
          {
            path: [
              "first"
            ]
          },
          {
            path: [
              "second"
            ],
          },
        ],
        typeField: 'displayValue',
      },
      {
        title: 'first.lenght | second.lenght',
        separator: " | ",
        display: [
          {
            path: [
              "first"
            ]
          },
          {
            path: [
              "second"
            ],
          },
        ],
        typeField: 'displayValue',
      },
      {
        title: '(first.lenght + second.lenght)',
        separator: "",
        display: [
          {
            path: [
              "first"
            ],
            transformation: (val) => (val || "").lenght
          },
          {
            path: [
              "second"
            ],
            transformation: (val) => (val || "").lenght
          },
        ],
        transformation: (value) => {
          return "test";
        },
        typeField: 'displayValue',
      },
    ]

    //  case "array":
    // return <ArrayFieldFormik fieldData={fieldData} />;
    // case "autocomplete":
    //   return <AutocompleteFieldFormik fieldData={fieldData} />;
    // case "asyncAutocomplete":
    //   return <AsyncAutocompleteFieldFormik fieldData={fieldData} />;
    // case "richTextEditor":
  ]

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
            <ReactJson name={false} collapsed={1} displayDataTypes={false} displayObjectSize={false} theme="monokai" src={fields} />
            {"} />"}
          </Paper>
        </Grid>
        ])
        }
      </Grid>
    </div>
  )

}


