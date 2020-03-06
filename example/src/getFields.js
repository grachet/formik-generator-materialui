import * as Yup from "yup";
import { constante } from "./App.js";

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
    {
      title: "Text in object in array",
      path: "object.array.0",
      typeField: "text",
    }
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
    {
      title: "Switch in object",
      path: "object.isSwitch",
      typeField: "switch",
    }
  ],
  [
    {
      title: "Select (value === displayed)",
      typeField: "select",
      path: "color",
      choice: ["#003fff", "#5dff00", "#ff0000"]
    },
    {
      title: "Select (value !== displayed)",
      typeField: "select",
      path: "colorNamed",
      choice: ["#003fff", "#5dff00", "#ff0000"],
      titleChoice: ["blue", "green", "red"]
    },
    {
      title: "Select disabled",
      typeField: "select",
      path: "colorNamed",
      choice: ["#003fff", "#5dff00", "#ff0000"],
      disabled: true
    },
    {
      title: "Select with null value",
      typeField: "select",
      path: "nullValueSelect",
      choice: [null, "", 0, "value"]
    },
    {
      title: "Select with categories",
      typeField: "select",
      path: "categories",
      choice: [
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
    {
      title: "Select in object",
      typeField: "select",
      path: "object.select",
      choice: ["Yes", "No"]
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
    {
      title: "RTE in object ",
      path: "object.richText",
      typeField: 'richTextEditor'
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
    {
      title: 'Date in object',
      path: 'object.date',
      typeField: 'date',
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
          choice: ["Me", "You"]
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
              choice: ["France", "USA", "Mexico"],
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
              choice: ["Yes", "No"],
              path: "object.select"
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
                      path: "object.select"
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
        choice: ["Yes", "Two"],
        typeField: 'select',
      },
    },
    {
      title: 'Array of text in object',
      path: 'object.arrayOfText',
      typeField: 'array',
      emptyAddText: "Add text fields",
      subfield: {
        typeField: 'text',
      },
    },
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
          choice: ["France", "USA", "Mexico"],
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
          choice: ["France", "USA", "Mexico"],
          typeField: 'select',
        }],
      typeField: 'arrayObject',
      emptyAddText: "Add object"
    },
    {
      title: 'Array of objects in object',
      path: 'object.address',
      subfields: [
        {
          title: "Street",
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
    },
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
    {
      title: 'Autocomplete in object',
      path: 'object.country',
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
        let rep = await fetch("https://api.themoviedb.org/3/search/movie?api_key=" + constante + "&query=" + value);
        let datas = await rep.json();
        return (datas && datas.results) || []
      },
      getOptionLabel: opt => (opt.title) ? (opt.title + " (" + opt.release_date + ")") : "",
      hint: "For async call on input change (not just 1 time on launch)"
    },
    {
      title: 'Async Autocomplete in object',
      typeField: 'asyncAutocomplete',
      path: 'object.film',
      placeholder: "Search a film",
      getAsyncOptions: async (value) => {
        let rep = await fetch("https://api.themoviedb.org/3/search/movie?api_key=" + constante + "&query=" + value);
        let datas = await rep.json();
        return (datas && datas.results) || []
      },
      getOptionLabel: opt => (opt.title) ? (opt.title + " (" + opt.release_date + ")") : "",
      hint: "For async call on input change (not just 1 time on launch)"
    },
  ],
  //   [
  //     {
  //       warning: "Warning Text",
  //       hint: "Hint text",
  //       title: "Text",
  //       typeField: "text",
  //       isLink: true,
  //       path: "text"]
  //     },
  //     {
  //       title: "Select",
  //       typeField: "select",
  //       choice: ["Yes", "No"],
  //       path: "select"],
  //       warning: "Warning text",
  //       hint: "Hint text",
  //     },
  //     {
  //       title: "Checkbox",
  //       typeField: "checkbox",
  //       path: "checkbox"],
  //       warning: "Warning text",
  //       hint: "Hint text",
  //     },
  //     {
  //       title: "Rich text editor",
  //       path: "richText"],
  //       fullWidth: true,
  //       typeField: 'richTextEditor',
  //       hint: "hint text",
  //       warning: "Warning text",
  //       isSmallIcons: true
  //     },
  //     {
  //       title: 'Date',
  //       path:
  //         'date'
  //       ],
  //       typeField: 'date',
  //       hint: "hint text",
  //       warning: "Warning text",
  //     },
  //     {
  //       title: 'Just display a value',
  //       display: [
  //         "constante",
  //       ],
  //       typeField: 'displayValue',
  //       hint: "hint text",
  //       warning: "Warning text",
  //     },
  //     {
  //       title: 'Autocomplete select',
  //       path:
  //         'country',
  //       ],
  //       typeField: 'autocomplete',
  //       options: [{ name: "France", code: "FR" }, { name: "Spain", code: "ES" }, { name: "Germany", code: "DE" }],
  //       getOptionLabel: (val) => val.name,
  //       placeholder: "Search a country",
  //       warning: "Text warning",
  //       hint: "Hint text",
  //     },
  //     {
  //       title: 'Async Autocomplete (select)',
  //       warning: "Text warning",
  //       hint: "Hint text",
  //       typeField: 'asyncAutocomplete',
  //       path:
  //         'film',
  //       ],
  //       placeholder: "Search a film",
  //       getAsyncOptions: async (value) => {
  //         let rep = await fetch("https://api.themoviedb.org/3/search/movie?api_key=" + constante + "&query=" + value);
  //         let datas = await rep.json();
  //         return (datas && datas.results) || []
  //       },
  //       getOptionLabel: opt => (opt.title) ? (opt.title + " (" + opt.release_date + ")") : "",
  //     },
  //     {
  //       title: 'Array of text fields',
  //       path:
  //         'arrayOfText'
  //       ],
  //       typeField: 'array',
  //       emptyAddText: "Add text fields",
  //       subfield: {
  //         multiline: true,
  //         typeField: 'text',
  //       },
  //       hint: "Hint text",
  //       warning: "Warning text",
  //     },
  //     {
  //       title: 'Array of objects',
  //       path:
  //         'arrayOfObjects',
  //       ],
  //       subfields: [
  //         {
  //           title: "number",
  //           name: "number",
  //           typeField: 'text',
  //         }, {
  //           title: "street name",
  //           name: "streetName",
  //           typeField: 'text',
  //         }
  //       ],
  //       typeField: 'arrayObject',
  //       emptyAddText: "Add object",
  //       hint: "Hint text",
  //       warning: "Warning text",
  //     },
  //     {
  //       title: "Group",
  //       typeField: "group",
  //       hint: "Hint text",
  //       warning: "Warning text",
  //       col: 4,
  //       subfields: [
  //         {
  //           warning: "Warning text",
  //           title: "col1",
  //           typeField: "text",
  //           path: "col1"],
  //         },
  //         {
  //           title: "col2",
  //           typeField: "text",
  //           path: "col2"],
  //           hint: "Hint text"
  //         },
  //         {
  //           title: "col3",
  //           typeField: "text",
  //           path: "col3"],
  //         },
  //       ],

  //     },
  //   ],
  //   [
  //     {
  //       title: "Text (number)",
  //       typeField: "text",
  //       path: "text"],
  //       yup: Yup.number().required(),
  //       yupStringForExample: "Yup.number().required()"
  //     },
  //     {
  //       title: "Text (2 letters + 3 numbers)",
  //       typeField: "text",
  //       path: "text2"],
  //       yup: Yup.string().matches(/^[a-zA-Z]{2}[0-9]{3}$/, 'Must be 2 letters + 3 numbers').required(),
  //       yupStringForExample: "Yup.string().matches(/^[a-zA-Z]{2}[0-9]{3}$/, 'Must be 2 letters + 3 numbers').required()"
  //     },
  //     {
  //       title: "Select (not null)",
  //       typeField: "select",
  //       choice: ["Yes", "No"],
  //       path: "select"],
  //       yup: Yup.string().required(),
  //       yupStringForExample: "Yup.string().required()"
  //     }
  //   ]
]
