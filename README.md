# formik-generator-materialui

>  A form generator who use React, Material UI and Formik as dependenties

[![NPM](https://img.shields.io/npm/v/formik-generator-materialui.svg)](https://www.npmjs.com/package/formik-generator-materialui) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save formik-generator-materialui
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

"textfield"

"displayValue"

"select"

"dateTime"
 
"richTextEditor"

"switch"

"objectField"

"arrayField"

"autocompleteField"
 
"asyncAutocompleteField"

## To run in localhost :

- npm start
- cd example
- npm start

## To publish to github pages :

- npm run deploy

## To publish to NPM :

- npm login
- npm publish

## License

MIT © [grachet](https://github.com/grachet/)
