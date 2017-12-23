import React, { Component } from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';

/**** COMPANY Components ****/
import CompanyList from './Containers/CompanyList/company-list';
import Company from './Containers/Company/company';
import CompanyUpdate from './Containers/CompanyUpdate/company-update';

/**** PEOPLE Components ****/
import Employees from './Containers/People/employees';
import Person from './Containers/Person/person';
import PersonUpdate from './Containers/Person/PersonUpdate/PersonUpdate';

/**** ADD COMPANY && ADD EMPLOYEE FORMS ****/
import AddCompany from './Containers/CompanyList/AddCompany/AddCompany';
import AddEmployee from './Containers/People/AddEmployee/AddEmployee';

/** CSS **/
import classes from './App.css';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route exact path="/" component={CompanyList} />
        {/**** Companies ****/}
        <Route exact path="/companies/:compId" component={Company} />
        <Route exact path='/companies/:compId/edit' component={CompanyUpdate} />
        {/**** Employees ****/}
        <Route exact path="/companies/:compId/people" component={Employees} />
        <Route exact path="/person/:personId" component={Person} />
        <Route exact path='/person/:personId/edit' component={PersonUpdate} />
        <Redirect to="/" />
      </Switch>
    );

    return (
      <div className={classes.App}>
        <header className={classes.Appheader}>
          <Link className={classes.Link} to='/'><h3 className={classes.Apptitle}>Company Personel APP</h3></Link>
        </header>
        <br />
        <div className={classes.ContentWrapper}>
          <div className="col-sm-7">{routes}</div>
          <div className="col-sm-4">
            <AddCompany />
            <AddEmployee />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
