import React from 'react';
import HintIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/WarningRounded';
import LinkIcon from '@material-ui/icons/LinkRounded';
import classNames from 'classnames';
import {
    Tooltip,
    IconButton,
    makeStyles,
} from "@material-ui/core";
import styles from './styles/formStyle';

const useStyles = makeStyles(styles);
export default function HintWarning({ hint, isWarning, isLink, isLeft }) {
    const classes = useStyles();
    const upperHint = (typeof hint === "string") && hint.toUpperCase();
    return upperHint ? <div className={classNames(isLeft ? classes.leftButtonHint : classes.buttonHint)}>
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
        </Tooltip></div > : null
};