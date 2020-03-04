import React from 'react';
import HintIcon from '@material-ui/icons/Info';
// import WarningIcon from '@material-ui/icons/WarningRounded';
import LinkIcon from '@material-ui/icons/LinkRounded';
import WarningIcon from '@material-ui/icons/Error';
import {
  Tooltip,
  IconButton,
} from "@material-ui/core";
import classes from '../index.css'

export default function HintWarning({ hint, isWarning, isLink, className }) {

  const upperHint = (typeof hint === "string") && hint.toUpperCase();

  if (upperHint) {
    return <span className={classes.buttonHint + " " + className}>
      <Tooltip title={isLink ? "Go to" : upperHint}>
        <IconButton
          href={isLink ? hint : null}
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
