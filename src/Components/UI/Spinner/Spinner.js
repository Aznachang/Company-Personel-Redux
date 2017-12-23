import React from 'react';
import classes from './Spinner.css';

const spinner = (props) => (
  <div className={classes.Loader}><b>{props.children}</b></div>
);

export default spinner;