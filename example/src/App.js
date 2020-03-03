import React, { useRef, useState } from 'react'
import { Grid, Typography, Button, Paper } from "@material-ui/core"
import "./app.css";
import * as Yup from "yup"
import { FormGenerator, FieldGenerator } from 'formik-generator-materialui'
import ReactJson from 'react-json-view'

const tmdbkey = "1dc2b196ec51b322a69db96aa1c90dc9";

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
        title: "Text",
        path: ["text"],
        typeField: "text",
      },
      {
        title: "Same Text",
        path: ["text"],
        typeField: "text",
      },
      {
        title: "Multiline text",
        path: ["multiline"],
        typeField: "text",
        multiline: true,
      },
      {
        title: "Disabled text",
        path: ["disabledText"],
        typeField: "text",
        disabled: true
      }
    ],
    [
      {
        title: "Is checkbox ?",
        path: ["isCheckbox"],
        typeField: "checkbox",
      },
      {
        title: "Is checkbox disabled ?",
        path: ["isCheckboxDisabled"],
        typeField: "checkbox",
        disabled: true
      },
      {
        title: "Is switch ?",
        path: ["isSwitch"],
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
        title: "Select (value === displayed)",
        typeField: "select",
        path: ["color"],
        choice: ["#003fff", "#5dff00", "#ff0000"]
      },
      {
        title: "Select (value !== displayed)",
        typeField: "select",
        path: ["colorNamed"],
        choice: ["#003fff", "#5dff00", "#ff0000"],
        titleChoice: ["blue", "green", "red"]
      },
      {
        title: "Select disabled hint",
        typeField: "select",
        path: ["colorNamed"],
        choice: ["#003fff", "#5dff00", "#ff0000"],
        disabled: true
      }
    ],
    [
      {
        title: "Hint select",
        typeField: "select",
        path: ["hintText"],
        choice: ["Yes", "No"],
        hint: "Hint text",
      },
      {
        warning: "Warning text",
        title: "Warning text",
        typeField: "text",
        path: ["warningText"]
      },
      {
        title: "Hint checkbox",
        typeField: "checkbox",
        path: ["hintCheckbox"],
        hint: "Hint text",
      }
    ],
    [
      {
        title: "Group",
        typeField: "group",
        hint: "Group hint",
        subfields: [
          {
            title: "Group.name",
            typeField: "text",
            path: ["group", "name"],
            hint: "path = ['group', 'name']",
          },
          {
            title: "Value not in group object",
            typeField: "select",
            path: ["notInGroup"],
            choice: ["Me", "You"]
          },
        ],
      },
    ],
    [
      {
        title: 'Array of objects (address) ',
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
            typeField: 'text',
          }, {
            title: "Country",
            name: "country",
            choice: ["France", "USA", "Mexico"],
            typeField: 'select',
          }],
        typeField: 'arrayObject',
        emptyAddText: "Add object"
      }
    ],
    [
      {
        title: 'Array of names',
        path: [
          'arrayOfNames'
        ],
        typeField: 'array',
        emptyAddText: "Add array",
        subfield: {
          multiline: true,
          typeField: 'text',
        },
      }
    ],
    [
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
      }
    ],
    [
      {
        title: 'Autocomplete select',
        path: [
          'country',
        ],
        typeField: 'autocomplete',
        options: [{ name: "France", code: "FR" }, { name: "Spain", code: "ES" }, { name: "Germany", code: "DE" }],
        getOptionLabel: (val) => val.name,
        placeholder: "Search a country",
      },
      {
        freeSolo: true,
        title: 'Autocomplete + freetext',
        path: [
          'countryFree',
        ],
        typeField: 'autocomplete',
        options: [{ name: "France", code: "FR" }, { name: "Spain", code: "ES" }, { name: "Germany", code: "DE" }],
        getOptionLabel: (val) => val.name,
        placeholder: "Search a country",
      },
      {
        title: 'Autocomplete + freetext',
        path: [
          'countryFree',
        ],
        typeField: 'autocomplete',
        options: [{ name: "France", code: "FR" }, { name: "Spain", code: "ES" }, { name: "Germany", code: "DE" }],
        getOptionLabel: (val) => val.name,
        placeholder: "Search a country",
      }
    ],
    [
      {
        title: 'Async Autocomplete (users)',
        typeField: 'asyncAutocomplete',
        path: [
          'user',
        ],
        placeholder: "Search an user",
        getAsyncOptions: async (value) => {
          let response = await fetch("https://api.themoviedb.org/3/search/movie?api_key=" + tmdbkey + "&query=" + value);
          let datas = await response.json();
          console.log(datas)
          return datas.results || []
        },
        getOptionLabel: e => e.Title || "test"
      }
    ]


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


