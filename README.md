# formik-generator-materialui

>  A form generator who use React, Material UI and Formik as dependencies

[![NPM](https://img.shields.io/npm/v/formik-generator-materialui.svg)](https://www.npmjs.com/package/formik-generator-materialui) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## DEMO

https://grachet.github.io/formik-generator-materialui

## Install

```bash
npm install --save formik-generator-materialui
```

## Install Dependencies

# Required dependencies :

-  react: ^16.8.0
-  react-dom: ^16.8.0

-  formik: ^2.1.0
-  @material-ui/core: ^4.9.0
-  @material-ui/icons: ^4.9.0
-  prop-types: ^15.5.4

 ```bash
npm install --save formik @material-ui/core @material-ui/icons prop-types
```

# Other dependencies (important) :

-  @material-ui/lab: ^4.0.0  (autocomplete)
-  @material-ui/pickers: ^3.2.0  (datetime)
-  yup: ^0.28.1  (field verification)
-  draft-js: ^0.11.0  (rich text editor)

 ```bash
npm install --save @material-ui/lab @material-ui/pickers yup draft-js
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

"text"

"displayValue"

"select"

"dateTime"

"richTextEditor"

"switch"

"arrayObject"

"array"

"autocomplete"

"asyncAutocomplete"

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

## License

MIT © [grachet](https://github.com/grachet/)
