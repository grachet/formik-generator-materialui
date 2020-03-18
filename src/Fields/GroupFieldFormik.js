import React from 'react';
import HintWarning from "../UI/HintWarning"
import FieldGenerator from "../components/FieldGenerator";
import { Typography, Grid } from '@material-ui/core';
import classes from '../index.css'

export default function GroupFieldFormik({ fieldData }) {

  const { title, subfields, col, hint, warning, disabled } = fieldData;

  return (
    <div className={classes.borderContainer}>
      {title && <Typography variant="body2"
        gutterBottom
        color="textSecondary"
        component={'div'}>{title}
        <HintWarning hint={warning} isWarning />
        <HintWarning hint={hint} />
      </Typography>}
      <Grid container spacing={1}>
        {subfields.map((subfieldData, i) => <Grid key={i} item
          xs={12} sm={subfieldData.col || 12}>
          <FieldGenerator fieldData={subfieldData} readOnly={disabled} />
        </Grid>)}
      </Grid>
    </div>
  )
}
