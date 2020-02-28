import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
} from '@material-ui/core';

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
        <Button variant={"outlined"}>test {text} </Button>
      </div>
    )
  }
}
