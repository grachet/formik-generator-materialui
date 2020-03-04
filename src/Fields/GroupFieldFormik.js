import React from 'react';
import HintWarning from "../UI/HintWarning"
import FieldGenerator from "../components/FieldGenerator";
import { Typography, Grid } from '@material-ui/core';
import classes from '../index.css'

export default function GroupFieldFormik({ fieldData }) {

  const { title, subfields, col } = fieldData;

  return (
    <div key={title} className={classes.wrapperArrayField}>
      {title && <Typography variant="body2"
        className={(!fieldData.hint ? classes.mbmd : "")}
        color="textSecondary"
        component={'div'}>{title}
        <HintWarning hint={fieldData.hint} noMargin />
        <HintWarning hint={fieldData.warning} noMargin isWarning />
      </Typography>}
      {!!col && <Grid container spacing={2}>
        {subfields.map((subfieldData, i) => <Grid key={i} item xs={12} sm={col}>
          <FieldGenerator fieldData={subfieldData} disabled={subfieldData.disabled} />
        </Grid>)}
      </Grid>}
      {!col && subfields.map((subfieldData, i) =>
        <span key={i}>
          <FieldGenerator fieldData={subfieldData} disabled={subfieldData.disabled} />
        </span>)
      }
    </div>
  )
}
