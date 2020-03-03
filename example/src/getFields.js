
const tmdbkey = "1dc2b196ec51b322a69db96aa1c90dc9";

export default [
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
      title: "Select disabled",
      typeField: "select",
      path: ["colorNamed"],
      choice: ["#003fff", "#5dff00", "#ff0000"],
      disabled: true
    }
  ],
  [
    {
      title: "Rich text editor",
      path: ["richText"],
      fullWidth: true,
      typeField: 'richTextEditor',
    }
  ],
  [
    // {
    //   title: 'Date',
    //   path: [
    //     'date'
    //   ],
    //   typeField: 'date',
    // }
  ],
  [
    {
      title: "Group",
      typeField: "group",
      subfields: [
        {
          title: "Group.name",
          typeField: "text",
          path: ["group", "name"],
        },
        {
          title: "Value not in group object",
          typeField: "select",
          path: ["notInGroup"],
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
          path: ["col1"],
        },
        {
          title: "col2",
          typeField: "text",
          path: ["col2"],
        },
        {
          title: "col3",
          typeField: "text",
          path: ["col3"],
        },
      ],
    },
  ],
  [
    {
      title: 'Array of text fields',
      path: [
        'arrayOfText'
      ],
      typeField: 'array',
      emptyAddText: "Add text fields",
      subfield: {
        multiline: true,
        typeField: 'text',
      },
    },
    {
      title: 'Array of select fields',
      path: [
        'arrayOfSelect'
      ],
      typeField: 'array',
      emptyAddText: "Add select fields",
      subfield: {
        choice: ["Yes", "Two"],
        typeField: 'select',
      },
    }
  ],
  [
    {
      title: 'Array of objects (address) ',
      path: [
        'address',
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
      title: "First Value",
      typeField: "text",
      path: ["first"]
    },
    {
      title: "Second Value",
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
    {
      title: 'Just display a value',
      display: [
        {
          path: [
            "first"
          ]
        }
      ],
      typeField: 'displayValue',
    },
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
      title: 'Autocomplete + freetext',
      freeSolo: true,
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
      title: 'Async Autocomplete (select)',
      typeField: 'asyncAutocomplete',
      path: [
        'user',
      ],
      placeholder: "Search an user",
      getAsyncOptions: (value) => {
        return new Promise(resolve => {
          fetch("https://api.themoviedb.org/3/search/movie?api_key=" + tmdbkey + "&query=" + value)
            .then(r => r.json)
            .then(datas => { console.log(datas); resolve(datas.results || []) })
        });
      },
      getOptionLabel: e => e.Title || ""
    },
    {
      title: 'Async Autocomplete (free text)',
      freeSolo: true,
      typeField: 'asyncAutocomplete',
      path: [
        'user',
      ],
      placeholder: "Search an user",
      getAsyncOptions: (value) => {
        return new Promise(resolve => {
          fetch("https://api.themoviedb.org/3/search/movie?api_key=" + tmdbkey + "&query=" + value)
            .then(r => r.json)
            .then(datas => { console.log(datas); resolve(datas.results || []) })
        });
      },
      getOptionLabel: e => e.Title || ""
    }
  ],
  [
    {
      title: "Select",
      typeField: "select",
      choice: ["Yes", "No"],
      path: ["select"],
      warning: "Warning text",
      hint: "Hint text",
    },
    {
      warning: "Warning Text",
      hint: "Hint text",
      title: "Text",
      typeField: "text",
      path: ["text"]
    },
    {
      title: "Checkbox",
      typeField: "checkbox",
      path: ["checkbox"],
      warning: "Warning text",
      hint: "Hint text",
    },
    {
      title: "Rich text editor",
      path: ["richText"],
      fullWidth: true,
      typeField: 'richTextEditor',
      hint: "hint text",
      warning: "Warning text",
    },
    //todo
    // {
    //   title: 'Date',
    //   path: [
    //     'date'
    //   ],
    //   typeField: 'date',
    // }
    {
      title: 'Just display a value',
      display: [
        {
          path: [
            "first"
          ]
        }
      ],
      typeField: 'displayValue',
      hint: "hint text",
      warning: "Warning text",
    },
    {
      title: 'Autocomplete select',
      path: [
        'country',
      ],
      typeField: 'autocomplete',
      options: [{ name: "France", code: "FR" }, { name: "Spain", code: "ES" }, { name: "Germany", code: "DE" }],
      getOptionLabel: (val) => val.name,
      placeholder: "Search a country",
      warning: "Text warning",
      hint: "Hint text",
    },
    {
      title: 'Async Autocomplete (free text)',
      freeSolo: true,
      typeField: 'asyncAutocomplete',
      warning: "Text warning",
      hint: "Hint text",
      path: [
        'user',
      ],
      placeholder: "Search an user",
      getAsyncOptions: (value) => {
        return new Promise(resolve => {
          fetch("https://api.themoviedb.org/3/search/movie?api_key=" + tmdbkey + "&query=" + value)
            .then(r => r.json)
            .then(datas => { console.log(datas); resolve(datas.results || []) })
        });
      },
      getOptionLabel: e => e.Title || ""
    },
    {
      title: 'Array of text fields',
      path: [
        'arrayOfText'
      ],
      typeField: 'array',
      emptyAddText: "Add text fields",
      subfield: {
        multiline: true,
        typeField: 'text',
      },
      hint: "Hint text",
      warning: "Warning text",
    },
    {
      title: 'Array of objects',
      path: [
        'arrayOfObjects',
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
        }
      ],
      typeField: 'arrayObject',
      emptyAddText: "Add object",
      hint: "Hint text",
      warning: "Warning text",
    },
    {
      title: "Group",
      typeField: "group",
      hint: "Hint text",
      warning: "Warning text",
      col: 4,
      subfields: [
        {
          warning: "Warning text",
          title: "col1",
          typeField: "text",
          path: ["col1"],
        },
        {
          title: "col2",
          typeField: "text",
          path: ["col2"],
          hint: "Hint text"
        },
        {
          title: "col3",
          typeField: "text",
          path: ["col3"],
        },
      ],
    },
  ],
]