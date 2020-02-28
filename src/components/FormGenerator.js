import React, { Component } from "react";
import PropTypes from "prop-types";

export default class FormGenerator extends Component {
  static propTypes = {
    text: PropTypes.string
  };

  render() {
    const { text } = this.props;

    return <div>Form sfdfdstest: {text}</div>;
  }
}
