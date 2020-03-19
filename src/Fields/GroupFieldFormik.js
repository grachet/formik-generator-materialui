import React from 'react';
import HintWarning from "../UI/HintWarning"
import FieldGenerator from "../components/FieldGenerator";
import { Typography, Grid } from '@material-ui/core';
import classes from '../index.css';
import PropTypes from 'prop-types';

function GroupFieldFormik({ fieldData: {
  title = "", disabled = false, hint = "", warning = "", subfields = [],
} }) {

  return (
    <div className={classes.borderContainer}>
      {title && <Typography variant="body2"
        gutterBottom
        color="textSecondary"
        component={'div'}>{title}
        <HintWarning text={warning} isWarning />
        <HintWarning text={hint} />
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

GroupFieldFormik.propTypes = {
  fieldData: PropTypes.shape({
    disabled: PropTypes.bool,
    hint: PropTypes.string,
    warning: PropTypes.string,
    title: PropTypes.string,

    subfields: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default GroupFieldFormik
