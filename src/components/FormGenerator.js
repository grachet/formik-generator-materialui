import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Paper,
} from '@material-ui/core';

export default class FormGenerator extends Component {
  static propTypes = {
    text: PropTypes.string
  };

  render() {
    const { text } = this.props;

    return <Paper>{text}</Paper>;
  }
}
