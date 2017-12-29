import React from 'react';
import classes from './companyComponent.css';
import { Link } from 'react-router-dom';

const company = props => (
  <div className="panel panel-default">
    <div className="panel-heading">
      <h3 className="panel-title">
        <Link className="pull-center" to={`/companies/${props.compId}/`}>
          <b>{props.name}</b>
        </Link>
        <Link className="pull-right" to={`/companies/${props.compId}/edit`}>
          <span className={classes.edit}><b>edit</b></span>
        </Link>
      </h3>
    </div>
    <div className="panel-body">
      <p><b>Address</b></p>
      <p>{props.address}</p>
      <p><b>Revenue</b></p>
      <p>{props.revenue}</p>
      <p><b>Phone</b></p>
      <p>{props.phone}</p>
    </div>
    <div className="panel-footer">
      <Link to={`/companies/${props.compId}/people`}>
        <b>People who work here</b>
      </Link>
    </div>
  </div>
)

export default company;
