import React, { Component } from './node_modules/react'
import PropTypes from './node_modules/prop-types'

export default class FieldGenerator extends Component {
  static propTypes = {
    text: PropTypes.string
  }

  render() {
    const {
      text
    } = this.props

    return (
      <div >
        Field test : {text}
      </div>
    )
  }
}
