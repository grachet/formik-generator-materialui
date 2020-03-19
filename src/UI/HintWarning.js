import React from 'react';
import HintIcon from '@material-ui/icons/Info';
// import WarningIcon from '@material-ui/icons/WarningRounded';
import LinkIcon from '@material-ui/icons/LinkRounded';
import WarningIcon from '@material-ui/icons/Error';
import {
  Tooltip,
  IconButton,
} from "@material-ui/core";
import classes from '../index.css';
import PropTypes from 'prop-types';

function HintWarning({ text = "", isWarning = false, isLink = false, className = "" }) {

  const upperHint = (typeof text === "string") && text.toUpperCase();

  if (upperHint) {
    return <span className={classes.buttonHint + " " + className}>
      <Tooltip title={isLink ? "Go to" : upperHint}>
        <IconButton
          href={isLink ? text : null}
          target={isLink ? "_blank" : null}
          aria-label={upperHint}
        >
          {isWarning ? <WarningIcon className={classes.warningColor} /> :
            isLink ? <LinkIcon color={"primary"} /> :
              <HintIcon color={"primary"} />}
        </IconButton>
      </Tooltip>
    </span >
  } else {
    return null
  }
};

HintWarning.propTypes = {
  text: PropTypes.string,
  isWarning: PropTypes.bool,
  isLink: PropTypes.bool,
  className: PropTypes.string,
};

export default HintWarning
