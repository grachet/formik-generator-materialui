

import React from "react";
import * as Yup from "yup";
import { constante } from "./App.js";
import { IconButton } from "@material-ui/core";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

let getAllFieldsTypeExample = (title, type) => {

  let isObject = type === "object";
  let isHintWarning = type === "hint";
  let isYup = type === "yup";
  let isRequired = type === "required";
  let isDisabled = type === "disabled";

  let hintWarning = isHintWarning ? {
    warning: "Text warning",
    hint: "Hint text",
  } : {}

  let getPath = (path) => {
    if (isObject) {
      return "arrayExample.0." + path
    } else if (isHintWarning) {
      return path + "Hint"
    } else if (isYup) {
      return path + "Verification"
    } else if (isRequired) {
      return path + "Required"
    } else if (isDisabled) {
      return path + "Disabled"
    } else {
      return path
    }
  }

  return [
    {
      title: "Text " + title,
      path: getPath("text"),
      typeField: "text",
      warning: !isRequired ? "" : "props required = true will just display an * in the title",
      ...hintWarning,
      yup: !isYup ? null : Yup.string().matches(/^[a-zA-Z]{2}[0-9]{3}$/, 'Must be 2 letters + 3 numbers').required().nullable(),
      required: isRequired,
      disabled: isDisabled,
    },
    {
      title: "Switch " + title,
      path: getPath("isSwitch"),
      typeField: "switch",
      warning: !isYup ? "" : "No verification",
      ...hintWarning,
      required: isRequired,
      disabled: isDisabled,
    },
    {
      title: "Select " + title,
      typeField: "select",
      path: getPath("select"),
      choices: ["Yes", "No"],
      ...hintWarning,
      required: isRequired,
      disabled: isDisabled,
      yup: !isYup ? null : Yup.string().required().nullable(),
    },
    {
      title: "RTE " + title,
      path: getPath("richText"),
      typeField: 'richTextEditor',
      warning: !isYup ? "" : "Not return empty string if empty",
      ...hintWarning,
      required: isRequired,
      disabled: isDisabled,
      yup: !isYup ? null : Yup.string().required().nullable(),
    },
    {
      title: 'Date ' + title,
      path: getPath('date'),
      typeField: 'date',
      ...hintWarning,
      required: isRequired,
      disabled: isDisabled,
      yup: !isYup ? null : Yup.date().required().nullable(),
    },
    {
      title: "Group",
      typeField: "group",
      subfields: [
        {
          title: "Text",
          typeField: "text",
          path: getPath("textGroup"),
          yup: !isYup ? "" : Yup.string().required().nullable(),
          ...hintWarning,
          required: isRequired,
          disabled: isDisabled,
          col: 4
        },
        {
          title: "Group 2",
          typeField: "group",
          col: 8,
          subfields: [
            {
              title: "Text2",
              typeField: "text",
              path: getPath("textGroup2"),
              yup: !isYup ? null : Yup.string().required().nullable(),
              ...hintWarning,
              required: isRequired,
              disabled: isDisabled,
            }
          ],
          ...hintWarning,
          required: isRequired,
          disabled: isDisabled,
        },
      ],
      ...hintWarning,
      required: isRequired,
      disabled: isDisabled,
    },
    {
      title: 'Array of text ' + title,
      path: getPath('arrayOfText'),
      typeField: 'array',
      emptyAddText: "Add text fields",
      subfield: {
        typeField: 'text',
      },
      ...hintWarning,
      required: isRequired,
      disabled: isDisabled,
      yup: !isYup ? null : Yup.array().of(Yup.string().required()).required().nullable(),
    },
    {
      title: 'Array of objects ' + title,
      path: getPath('arrayOfObjects'),
      subfields: [
        {
          title: "Street",
          name: "streetName",
          typeField: 'text',
        }, {
          title: "Country",
          name: "country",
          choices: ["France", "USA", "Mexico"],
          typeField: 'select',
        }],
      typeField: 'arrayObject',
      emptyAddText: "Add object",
      ...hintWarning,
      required: isRequired,
      disabled: isDisabled,
      yup: !isYup ? null : Yup.array().of(
        Yup.object().shape({
          streetName: Yup.string().required().nullable(),
          country: Yup.string().required().nullable(),
        })
      ).required().nullable(),
    },
    {
      title: 'Display text ' + title,
      display: [
        {
          path: getPath("text")
        }
      ],
      typeField: 'displayValue',
      warning: !isYup ? "" : "Verification triggered anytime",
      ...hintWarning,
      required: isRequired,
      disabled: isDisabled,
      yup: !isYup ? null : Yup.string().required().nullable(),
    },
    {
      title: 'Autocomplete ' + title,
      path: getPath('autocomplete'),
      typeField: 'autocomplete',
      options: [{ name: "France", code: "FR" }, { name: "Spain", code: "ES" }, { name: "Germany", code: "DE" }],
      getOptionLabel: (val) => val.name,
      placeholder: "Search a country",
      ...hintWarning,
      required: isRequired,
      disabled: isDisabled,
      yup: !isYup ? null : Yup.string().required().nullable(),
    },
    {
      title: 'Async Autocomplete Free ' + title,
      freeSolo: true,
      typeField: 'asyncAutocomplete',
      path: getPath('asyncAutocompleteFree'),
      placeholder: "Search a film title",
      getAsyncOptions: async (value) => {
        if (!value) {
          return []
        }
        let rep = await fetch("https://api.themoviedb.org/3/search/movie?api_key=" + constante + "&query=" + value);
        let datas = await rep.json();
        return (datas && datas.results && datas.results.map(r => r.title)) || []
      },
      getOptionLabel: opt => opt,
      ...hintWarning,
      required: isRequired,
      disabled: isDisabled,
      yup: !isYup ? null : Yup.string().required().nullable(),
    },
  ]
}

export default [
  [
    {
      title: "Text",
      path: "a.text",
      typeField: "text",
      yup: Yup.string().required()
    }
  ],
  [
    {
      title: "Text",
      path: "text",
      typeField: "text",
    },
    {
      title: "Same Text",
      path: "text",
      typeField: "text",
    },
    {
      title: "Multiline text",
      path: "multiline",
      typeField: "text",
      multiline: true,
    },
    {
      title: "Display Link icon to value",
      path: "link",
      typeField: "text",
      isLink: true
    },
    {
      path: "noTitle",
      typeField: "text"
    },
  ],
  [
    {
      title: "Is checkbox ?",
      path: "isCheckbox",
      typeField: "checkbox",
    },
    {
      title: "Is switch ?",
      path: "isSwitch",
      typeField: "switch",
    },
  ],
  [
    {
      title: "Select (value === displayed value)",
      typeField: "select",
      path: "color",
      choices: ["#003fff", "#5dff00", "#ff0000"]
    },
    {
      title: "Select (value !== displayed value)",
      typeField: "select",
      path: "colorNamed",
      choices: [
        { value: "#003fff", title: "blue" },
        { value: "#5dff00", title: "green" },
        { value: "#ff0000", title: "red" },
      ],
    },
    {
      title: "Select with empty value",
      typeField: "select",
      path: "emptyValueSelect",
      choices: ["", 0, "value"]
    },
    {
      title: "Select with categories",
      typeField: "select",
      path: "categories",
      choices: [
        { value: "General", disabled: true },
        { value: "Fundamentals" },
        { value: "Description" },
        { value: "Administration", disabled: true },
        { value: "Installation" },
        { value: "Commissioning" },
      ],
    },
  ],
  [
    {
      title: "Rich text editor",
      path: "richText",
      typeField: 'richTextEditor',
    },
  ],
  [
    {
      title: 'Date',
      path: 'date',
      typeField: 'date',
    },
    {
      title: 'Date (simple = true)',
      path: 'dateSimple',
      typeField: 'date',
      simple: true
    },
    {
      title: 'Date (openTo = year)',
      openTo: "year",
      path: 'dateYear',
      typeField: 'date',
    },
  ],
  [
    {
      title: "Group",
      typeField: "group",
      subfields: [
        {
          title: "col1",
          typeField: "text",
          path: "col1",
          col: 3
        },
        {
          title: "col2",
          typeField: "text",
          path: "col2",
          col: 7
        },
        {
          title: "col3",
          typeField: "text",
          path: "col3",
          col: 9
        },
        {
          title: "col4",
          typeField: "text",
          path: "col4",
          col: 3
        },
        {
          title: 'Array of objects',
          path:
            'address',
          subfields: [
            {
              title: "Street",
              name: "streetName",
              typeField: 'text',
            },
            {
              title: "Country",
              name: "country",
              choices: ["France", "USA", "Mexico"],
              typeField: 'select',
            }],
          typeField: 'arrayObject',
          emptyAddText: "Add object"
        },
      ]
    },
    {
      title: "DisplayField in Group in Group in Group",
      typeField: "group",
      subfields: [
        {
          title: "Text",
          typeField: "text",
          path: "text",
        },
        {
          title: "2nd group",
          typeField: "group",
          subfields: [
            {
              title: "Select",
              typeField: "select",
              choices: ["Yes", "No"],
              path: "select"
            },
            {
              title: "3rd group",
              typeField: "group",
              subfields: [
                {
                  title: 'Display text + select',
                  separator: " + ",
                  display: [
                    {
                      path: "text"
                    },
                    {
                      path: "select"
                    },
                  ],
                  typeField: 'displayValue',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  [
    {
      title: 'Array of text fields multiline',
      path: 'arrayOfText',
      typeField: 'array',
      emptyAddText: "Add text fields",
      subfield: {
        multiline: true,
        typeField: 'text',
      },
    },
    {
      title: 'Array of select fields (+ custom button)',
      renderRightButton: <IconButton
        onClick={() => alert("Custom function")}
      >
        <AddShoppingCartIcon />
      </IconButton>,
      path: 'arrayOfSelect',
      typeField: 'array',
      emptyAddText: "Add select fields",
      subfield: {
        choices: ["Yes", "Two"],
        typeField: 'select',
      },
    },
    {
      title: 'Array of Rich text editor',
      path: 'arrayOfRTE',
      typeField: 'array',
      emptyAddText: "Add RTE",
      subfield: {
        typeField: 'richTextEditor',
      },
    }
  ],
  [
    {
      title: 'Array of objects',
      path: 'address',
      subfields: [
        {
          title: "Street",
          name: "streetName",
          typeField: 'text',
        }, {
          title: "Country",
          name: "country",
          choices: ["France", "USA", "Mexico"],
          typeField: 'select',
        }],
      typeField: 'arrayObject',
      emptyAddText: "Add object"
    },
    {
      title: 'Array of objects (custom column)',
      path: 'colObject',
      subfields: [
        {
          title: "col1",
          typeField: "text",
          path: "col1",
          col: 2
        },
        {
          title: "col2",
          typeField: "text",
          path: "col2",
          col: 7
        },
        {
          title: "col3",
          typeField: "text",
          path: "col3",
          col: 3
        }
      ],
      typeField: 'arrayObject',
      emptyAddText: "Add object"
    },
    {
      title: 'Array of objects (more than 3 subfields) ',
      path: 'addressMoreThan3Fields',
      subfields: [
        {
          title: "Name",
          name: "name",
          typeField: 'text',
        }, {
          title: "Last name",
          name: "lastName",
          typeField: 'text',
        },
        {
          title: "Number",
          name: "number",
          typeField: 'text',
        }, {
          title: "Street name ",
          name: "streetName",
          typeField: 'text',
        }, {
          title: "Country",
          name: "country",
          choices: ["France", "USA", "Mexico"],
          typeField: 'select',
        }],
      typeField: 'arrayObject',
      emptyAddText: "Add object"
    }
  ],
  [
    {
      title: "First Value",
      typeField: "text",
      path: "first"
    },
    {
      title: "Second Value",
      typeField: "text",
      path: "second"
    },
    {
      title: 'Display first-second',
      separator: "-",
      display: [
        {
          path: "first"
        },
        {
          path: "second"
        },
      ],
      typeField: 'displayValue',
    },
    {
      title: 'first.lenght | second.lenght',
      separator: " | ",
      display: [
        {
          path: "first",
          transformation: (val) => (val || "").length
        },
        {
          path: "second",
          transformation: (val) => (val || "").length
        },
      ],
      typeField: 'displayValue',
    },
    {
      title: '(first.lenght + second.lenght)',
      separator: "+",
      display: [
        {
          path: "first",
          transformation: (val) => (val || "").length
        },
        {
          path: "second",
          transformation: (val) => (val || "").length
        },
      ],
      transformation: (value) => {
        let [a, b] = value.split("+");
        return parseInt(a, 10) + parseInt(b, 10);
      },
      typeField: 'displayValue',
    },
    {
      title: 'Just display a value',
      separator: " ",
      display: [
        "constante",
        0,
        null
      ],
      typeField: 'displayValue',
    },
    {
      title: 'Mix const/editable value',
      separator: " ",
      display: [
        "constante",
        {
          path: "second"
        },
      ],
      typeField: 'displayValue'
    },
    {
      title: 'Display link value',
      separator: "",
      display: [
        "https://www.npmjs.com/package/formik-generator-materialui",
      ],
      isLink: true,
      typeField: 'displayValue'
    },
  ],
  [
    {
      title: 'Autocomplete freetext',
      freeSolo: true,
      path: 'countryFree',
      typeField: 'autocomplete',
      options: ["France", "Spain", "Germany"],
      getOptionLabel: (opt) => opt,
      placeholder: "Search a country",
      hint: "Options with freesolo must be string"
    },
    {
      title: 'Autocomplete select',
      path: 'country',
      typeField: 'autocomplete',
      options: [{ name: "France", code: "FR" }, { name: "Spain", code: "ES" }, { name: "Germany", code: "DE" }],
      getOptionLabel: (val) => val.name,
      placeholder: "Search a country",
    }
  ],
  [
    {
      title: 'Async Autocomplete (free text)',
      freeSolo: true,
      typeField: 'asyncAutocomplete',
      path: 'filmTitle',
      placeholder: "Search a film title",
      getAsyncOptions: async (value) => {
        if (!value) {
          return []
        }
        let rep = await fetch("https://api.themoviedb.org/3/search/movie?api_key=" + constante + "&query=" + value);
        let datas = await rep.json();
        return (datas && datas.results && datas.results.map(r => r.title)) || []
      },
      hint: "Options with freesolo must be string",
      getOptionLabel: opt => opt
    },
    {
      title: 'Async Autocomplete (select)',
      typeField: 'asyncAutocomplete',
      path: 'film',
      placeholder: "Search a film",
      getAsyncOptions: async (value) => {
        if (!value) {
          return []
        }
        let rep = await fetch("https://api.themoviedb.org/3/search/movie?api_key=" + constante + "&query=" + value);
        let datas = await rep.json();
        return (datas && datas.results) || []
      },
      getOptionLabel: opt => (opt.title) ? (opt.title + " (" + opt.release_date + ")") : "",
      hint: "For async call on input change (not just 1 time on launch)"
    },
  ],
  getAllFieldsTypeExample("(in array in object)", "object"),
  getAllFieldsTypeExample("(hint and warning)", "hint"),
  getAllFieldsTypeExample("(with verification)", "yup"),
  getAllFieldsTypeExample("(required)", "required"),
  getAllFieldsTypeExample("(disabled)", "disabled"),
]
