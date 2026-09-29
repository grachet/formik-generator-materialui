# formik-generator-materialui

>  A form generator who use React, Material UI and Formik as dependencies (an some others). A lot of fields types but feel free to install the minimum of dependencies.

[![NPM](https://img.shields.io/npm/v/formik-generator-materialui.svg)](https://www.npmjs.com/package/formik-generator-materialui) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## ONLINE DEMO !!

<a href="https://grachet.github.io/formik-generator-materialui/" target="_blank">https://grachet.github.io/formik-generator-materialui/</a>

## Install

```bash
npm install --save formik-generator-materialui
```

## Install Dependencies

#### Required dependencies :

-  react: ^16.8.0
-  react-dom: ^16.8.0
-  formik: ^2.1.0
-  @material-ui/core: ^4.9.0
-  @material-ui/icons: ^4.9.0
-  prop-types: ^15.5.4

 ```bash
npm install --save formik @material-ui/core @material-ui/icons prop-types
```

#### Other dependencies (important) :

-  @material-ui/lab: ^4.0.0  (autocomplete)
-  @material-ui/pickers: ^3.2.0  (date)
-  @date-io/moment: ^1.3.0  (date)
-  moment: ^2.24.0 (date)
-  yup: ^0.28.1  (field verification)
-  react-quill: ^2.0.0-beta.1 (RTE)

 ```bash
npm install --save @material-ui/lab @material-ui/pickers yup  react-quill@beta  @date-io/moment@1.x moment
```

## Usage FormGenerator

```jsx
import React, { Component } from 'react'
import {FormGenerator} from "formik-generator-materialui";
import * as Yup from "yup";

function Example {

    const formRef = useRef(null);

    return (
          <div>
            <FormGenerator
              onSubmit={(values) => {
                console.log(values) // {fullname : "john", ...}
              }}
              fields={[
                {
                  title: "Full Name",
                  path: ["fullname"],
                  typeField: "text"
                },
                {...},
              ]}
              formRef={formRef}
              initialValues={{
                fullname: "john"
              }}
              validationSchema={Yup.object().shape({
                fullname: Yup.string().required(),
              })}
              readOnly={false}
              isValidateOnlyOnSubmit={false}
            />
            <button onClick={() => formRef.current.submitForm()} />
        </div>
    )
}
```

### Props List :

 - initialValues: object (reinitialize form on change)
 - fields: array of objects
 - getFields: function with form values who return fields props (replace fields props) : (formValues) => [{},...]
 - onSubmit: func
 - readOnly: bool
 - formRef: object.isRequired (to get form functions)
 - validateOnBlur: bool (less validation, less memory) default true
 - validateOnChange: bool (less validation, less memory) default true
 - validateOnMount: bool (less validation, less memory)
 - onError: func
 - shouldTriggerErrors: func


## Usage FormDialogue

```jsx
import React, { Component } from 'react'
import {FormDialogue} from "formik-generator-materialui";
import * as Yup from "yup";

function Example {

    let [open, setOpen] = useState(false);

    return (
          <div>
            <FormDialogue
            open={open}
            onCancel={() => setOpen(false)}
            onOk={(values) => {
              console.log(values)
            }}
            title={"Your title"}
            text={"Your text here"}
            initialValues={{
                fullname: "john"
            }}
            validationSchema={Yup.object().shape({
                fullname: Yup.string().required(),
            })}
            fields={[
              {
                title: "Full Name",
                path: ["fullname"],
                typeField: "text",
              },
              {...},
            ]}
          />
          <button onClick={() => setOpen(true)}>open<button>
        </div>
    )
}
```

### Props List :

  - onOk:  function
  - onCancel:  function
  - disableCancelOnOK:  bool
  - okText:  string
  - title:  string
  - maxWidth:  'xs', 'sm', 'md', 'lg', 'xl', false
  - open:  bool
  - component:  object
  - link: { name: "string",  url: "string"})
  - text:  string
  - readOnly:  bool
  - initialValues: object (reinitialize form on change)
  - fields: array of object
  - validateOnBlur: bool (less validation, less memory) default true
  - validateOnChange: bool (less validation, less memory) default true
  - validateOnMount: bool (less validation, less memory)
  - shouldTriggerErrors: func

## Fields Type :

### group

-  readOnly: bool
-  hint: string
-  warning: string
-  title: string
-  subfields: array of objects

### text

-  path: string (Required)
-  readOnly: bool
-  required: bool
-  hint: string
-  warning: string
-  title: string
-  multiline: bool
-  isLink: bool

### displayValue

-  required: bool
-  hint: string
-  warning: string
-  title: string
-  multiline: bool
-  yup: object
-  transformation: function
-  separator: string
-  display: array
-  isLink: bool

### select

-  path: string (Required)
-  readOnly: bool
-  required: bool
-  hint: string
-  warning: string
-  title: string
-  choices: array

### date

-  path: string (Required)
-  readOnly: bool
-  required: bool
-  hint: string
-  warning: string
-  title: string
-  openTo: string ("year")

### richTextEditor

-  path: string (Required)
-  readOnly: bool
-  required: bool
-  hint: string
-  warning: string
-  title: string
-  placeholder: string

### switch

-  path: string (Required)
-  readOnly: bool
-  required: bool
-  hint: string
-  warning: string
-  title: string

### checkbox

-  path: string (Required)
-  readOnly: bool
-  required: bool
-  hint: string
-  warning: string
-  title: string

### arrayObject

-  path: string (Required)
-  readOnly: bool
-  required: bool
-  hint: string
-  warning: string
-  title: string
-  emptyAddText: string
-  noBorder: bool
-  subfields: array of objects
-  withSwap: bool

### array

-  path: string (Required)
-  readOnly: bool
-  required: bool
-  hint: string
-  warning: string
-  title: string
-  emptyAddText: string
-  noBorder: bool
-  subfield: object
-  renderRightButton: react component (should be material ui IconButton)
-  withSwap: bool

### autocomplete

-  path: string (Required)
-  readOnly: bool
-  required: bool
-  hint: string
-  warning: string
-  title: string
-  freeSolo: bool
-  options: array
-  getOptionLabel: function
-  placeholder: string

### asyncAutocomplete

-  path: string (Required)
-  readOnly: bool
-  required: bool
-  hint: string
-  warning: string
-  title: string
-  freeSolo: bool
-  getOptionLabel: function
-  getAsyncOptions: function required
-  placeholder: string

## To run in localhost :

- npm start
- cd example
- npm start

## To publish to github pages :

- npm run deploy
- go to https://grachet.github.io/formik-generator-materialui

## To publish to NPM :

- new version in package.json
- npm login
- npm publish

## Other

Looking for collaborators to update the tool

## License

MIT © [grachet](https://github.com/grachet/)
