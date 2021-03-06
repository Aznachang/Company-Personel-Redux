import React from 'react';
import { Link } from 'react-router-dom';
import classes from   './personComp.css';

const person = props => (
  <div className="panel panel-default">
    <div className="panel-heading">
      <h3 className="panel-title">
        <Link to={`/person/${props.personId}`}>
          <b>{props.name}</b>
        </Link>
        <Link className="pull-left" to={`/person/${props.personId}/edit`}>
          <span className={classes.edit}><b>edit</b></span>
        </Link>
        <Link onClick={props.delete} className="pull-right" to={`/companies/${props.companyId}/people`}>
          <span className="{classes.delete}" delete><b>x</b></span>
        </Link>
      </h3>
    </div>
    <div className="panel-body">
      <p className="text-bold">Name</p>
      <p>{props.name}</p>
      <p>Email</p>
      <p className="text-bold">{props.email}</p>
    </div>
    <div className="panel-footer">
      <Link to={`/`}>
        <b>Go Back Company List</b>
      </Link>
    </div>
  </div>
)

export default person;
