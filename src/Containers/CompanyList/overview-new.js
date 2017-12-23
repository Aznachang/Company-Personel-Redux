import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

/**** COMPANY Components ****/
import CompanyList from './company-list';
import Company from '../Company/company';

// import CompanyUpdate from './Containers/Company/company-update';

/**** PEOPLE Components ****/
//import Employees from './Containers/People/employees';
//import Person from './Containers/People/person';

/**** ADD COMPANY && ADD EMPLOYEE FORMS ****/
import AddCompany from './AddCompany/AddCompany';
import AddEmployee from '../People/AddEmployee/AddEmployee';

/** CSS **/
import classes from '../../App.css';


class Overview extends Component {
  render() {
    // let routes = (
    //   <Switch>
    //     <Route exact path="/" component={Overview} />
    //     <Route exact path="/companies/:compId" component={Company} />
    //     <Route exact path="/companies/:compId/people" component={Employees} />
    //     <Route exact path="/person/:personId" component={Person} /> 
    //     {/* <Route exact path='/companies/:compId/edit' component={CompanyUpdate}/> */}
    //     <Redirect to="/" />
    //   </Switch>
    // );
    let selectedCompany = '';
    return (
      <div className={classes.App}>
        <header className={classes.Appheader}>
          <h3 className={classes.Apptitle}>Company Personel - App.js</h3>
        </header>
        <br />
        <div className="col-sm-7">
          {/* if (selectedCompany) {
           // { }
          } */}
          
          {CompanyList}
        </div>
        <div className="col-sm-4">
          <AddCompany/>
          <AddEmployee/>
        </div>
      </div>
    );
  }
}

export default Overview;