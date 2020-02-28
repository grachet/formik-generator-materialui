import React, { Component } from 'react'

import FormGenerator2, { FormGenerator, FieldGenerator } from 'formik-generator-materialui'

export default class App extends Component {
  render() {
    return (
      <div>
        <FormGenerator text='1' />
        <FieldGenerator text='2' />
        <FormGenerator2 text='32' />
      </div>
    )
  }
}
