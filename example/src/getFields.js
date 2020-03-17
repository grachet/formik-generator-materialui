import * as Yup from "yup";
import { constante } from "./App.js";

let getAllFieldsTypeExample = (title, type) => {

  let isObject = type === "object";
  let isHintWarning = type === "hint";
  let isYup = type === "yup";
  let isRequired = type === "required";

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
    } else {
      return path
    }
  }

  return [
    {
      title: "Text " + title,
      path: getPath("text"),
      typeField: "text",
      warning: isRequired && "props required = true will just display an * in the title",
      ...hintWarning,
      yup: isYup && Yup.string().matches(/^[a-zA-Z]{2}[0-9]{3}$/, 'Must be 2 letters + 3 numbers').required(),
      required: isRequired,
    },
    {
      title: "Switch " + title,
      path: getPath("isSwitch"),
      typeField: "switch",
      warning: isYup && "No verification",
      ...hintWarning,
      required: isRequired,
    },
    {
      title: "Select " + title,
      typeField: "select",
      path: getPath("select"),
      choices: ["Yes", "No"],
      ...hintWarning,
      required: isRequired,
      yup: isYup && Yup.string().required(),
    },
    {
      title: "RTE " + title,
      path: getPath("richText"),
      typeField: 'richTextEditor',
      isSmallIcons: true,
      ...hintWarning,
      required: isRequired,
      yup: isYup && Yup.string().required(),
      saveOnEdit: true,
      warning: isYup && "Not return empty string if empty",
    },
    {
      title: 'Date ' + title,
      path: getPath('date'),
      typeField: 'date',
      ...hintWarning,
      required: isRequired,
      yup: isYup && Yup.date().required(),
    },
    {
      title: "Group",
      typeField: "group",
      col: 6,
      subfields: [
        {
          title: "Text",
          typeField: "text",
          path: getPath("textGroup"),
          yup: isYup && Yup.string().required(),
          ...hintWarning,
          required: isRequired,
        },
        {
          title: "Group 2",
          typeField: "group",
          subfields: [
            {
              title: "Text2",
              typeField: "text",
              path: getPath("textGroup2"),
              yup: isYup && Yup.string().required(),
              ...hintWarning,
              required: isRequired,
            }
          ],
          ...hintWarning,
          required: isRequired,
        },
      ],
      ...hintWarning,
      required: isRequired,
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
      yup: isYup && Yup.array().of(Yup.string().required()).required(),
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
      yup: isYup && Yup.array().of(
        Yup.object().shape({
          streetName: Yup.string().required(),
          country: Yup.string().required(),
        })
      ).required(),
    },
    {
      title: 'Display text ' + title,
      display: [
        {
          path: getPath("text")
        }
      ],
      typeField: 'displayValue',
      warning: isYup && "Verification triggered anytime",
      ...hintWarning,
      required: isRequired,
      yup: isYup && Yup.string().required(),
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
      yup: isYup && Yup.string().required(),
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
      yup: isYup && Yup.string().required(),
    },
  ]
}

export default [
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
      title: "Disabled text",
      path: "disabledText",
      typeField: "text",
      disabled: true
    },
  ],
  [
    {
      title: "Is checkbox ?",
      path: "isCheckbox",
      typeField: "checkbox",
    },
    {
      title: "Is checkbox disabled ?",
      path: "isCheckboxDisabled",
      typeField: "checkbox",
      disabled: true
    },
    {
      title: "Is switch ?",
      path: "isSwitch",
      typeField: "switch",
    },
    {
      title: "Is switch disabled ?",
      path: "isSwitchDisabled",
      typeField: "switch",
      disabled: true
    },

  ],
  [
    {
      title: "Select (value === displayed)",
      typeField: "select",
      path: "color",
      choices: ["#003fff", "#5dff00", "#ff0000"]
    },
    {
      title: "Select (value !== displayed)",
      typeField: "select",
      path: "colorNamed",
      choices: ["#003fff", "#5dff00", "#ff0000"],
      titleChoices: ["blue", "green", "red"]
    },
    {
      title: "Select disabled",
      typeField: "select",
      path: "colorNamed",
      choices: ["#003fff", "#5dff00", "#ff0000"],
      disabled: true
    },
    {
      title: "Select with null value",
      typeField: "select",
      path: "nullValueSelect",
      choices: [null, "", 0, "value"]
    },
    {
      title: "Select with categories",
      typeField: "select",
      path: "categories",
      choices: [
        {
          category: 'General',
          values: [
            'Fundamentals',
            'Description',
          ],
        },
        {
          category: 'Administration',
          values: [
            'Installation',
            'Commissioning',
          ],
        }
      ]
    },
  ],
  [
    {
      title: "Rich text editor",
      path: "richText",
      typeField: 'richTextEditor',
      hint: "You must click on save button",
    },
    {
      title: "RTE small icons ",
      path: "richTextSmall",
      typeField: 'richTextEditor',
      isSmallIcons: true
    },
    {
      title: "RTE save on edit ",
      path: "richTextSaveOnEdit",
      typeField: 'richTextEditor',
      saveOnEdit: true
    },
  ],
  [
    {
      title: 'Date',
      path: 'date',
      typeField: 'date',
    },
    {
      title: 'Date (openTo year)',
      openTo: "year",
      path: 'dateYear',
      typeField: 'date',
    },
    {
      title: 'Date disabled',
      path: 'dateDisabled',
      typeField: 'date',
      disabled: true
    },
  ],
  [
    {
      title: "Group",
      typeField: "group",
      subfields: [
        {
          title: "Group.name",
          typeField: "text",
          path: "group.name",
        },
        {
          title: "Value not in group object",
          typeField: "select",
          path: "notInGroup",
          choices: ["Me", "You"]
        },
      ],
    },
    {
      title: "Group in 3 column",
      typeField: "group",
      col: 4,
      subfields: [
        {
          title: "col1",
          typeField: "text",
          path: "col1",
        },
        {
          title: "col2",
          typeField: "text",
          path: "col2",
        },
        {
          title: "col3",
          typeField: "text",
          path: "col3",
        },
      ],
    },
    {
      title: "Group (Array of objects)",
      typeField: "group",
      subfields: [
        {
          title: 'Array of objects',
          path:
            'address',
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
      ],
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
      title: 'Array of select fields',
      path: 'arrayOfSelect',
      typeField: 'array',
      emptyAddText: "Add select fields",
      subfield: {
        choices: ["Yes", "Two"],
        typeField: 'select',
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
      title: 'Array of objects (more than 3 subfields) ',
      path: 'addressMoreThan3',
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
    },
    {
      title: 'Autocomplete disabled',
      disabled: true,
      path: 'countryDisabled',
      typeField: 'autocomplete',
      options: [{ name: "France", code: "FR" }, { name: "Spain", code: "ES" }, { name: "Germany", code: "DE" }],
      getOptionLabel: (val) => val.name,
      placeholder: "Search a country",
    },
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
]
