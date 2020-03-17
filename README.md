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
-  draft-js: ^0.11.0  (rich text editor)

 ```bash
npm install --save @material-ui/lab @material-ui/pickers yup draft-js @date-io/moment@1.x moment
```

## Usage

```jsx
import React, { Component } from 'react'
import {FormGenerator} from "formik-generator-materialui";
import * as Yup from "yup";

import MyComponent from 'formik-generator-materialui'

const formRef = useRef(null);

class Example extends Component {
  render () {
    return (
          <div>
          <FormGenerator
            fields={[
              {
                title: "Full Name",
                path: ["fullname"],
                typeField: "textfield",
                yup: Yup.string().required(),
              },
              { ...},
            ]}
            onSubmit={(values) => {
              console.log(values) // {fullname : "john", ...}
            }}
            formRef={formRef}
            data={{
              fullname: "john"
            }}
            readOnly={false}
          />
          <button onClick={() => formRef.current.submitForm()} />
        </div>
    )
  }
}
```

## Props List :

- data
- fields
- onSubmit
- readOnly
- formRef

## Fields Type :

"group"

title, subfields, col, hint, warning, disabled

"text"

 title, path, disabled, value, hint, warning, required, multiline, link

"displayValue"

yup, title, multiline, value, hint, warning

"select"

title, path, choices, titleChoices, disabled, value, hint, warning, required

"date"

required, title, hint, value, openTo, warning, disabled, path

"richTextEditor"

title, path, warning, hint

"switch"

title, path, disabled, hint, warning

"checkbox"

title, path, disabled, hint, warning

"arrayObject"

title, path, disabled, value, emptyAddText, noBorder, hint, warning

 path, value, subfields, dense, disabled

"array"

 title, path, value, emptyAddText, subfield, disabled, hint, warning, noBorder, renderLeftButton

"autocomplete"

 freeSolo, options, getOptionLabel, title, path, placeholder, disabled, hint, warning

"asyncAutocomplete"

 path, getAsyncOptions, hint, placeholder, disabled, freeSolo, title, warning, getOptionLabel

## To run in localhost :

- npm start
- cd example
- npm start

## To publish to github pages :

- npm run deploy
- go to https://grachet.github.io/formik-generator-materialui

## To publish to NPM :

- npm login
- npm publish

## Other

Looking for collaborators to update the tool

## License

MIT © [grachet](https://github.com/grachet/)
