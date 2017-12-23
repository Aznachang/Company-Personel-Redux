import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/** SPINNER LOADING ANIMATION **/
import Spinner from '../../Components/UI/Spinner/Spinner';

/** ACTIONS **/
import { fetchEmployees, deletePerson } from '../../actions/peopleActions.js';

/** Dummy Components **/
// import Employees from '../../Components/employees/employeesComp.js';
import Person from '../../Components/employees/person/personComp.js';

class Employees extends Component {
  componentDidMount() {
    console.log('[employees.js] Inside componentDidMount()');
    const compID = this.props.match.params.compId;
    this.props.fetchEmployees(compID);
  }

  deletePerson = (person) => {
    const { deletePerson } = this.props;
    let id = person._id;
    deletePerson(id);
  }

  render() {
    const {
      employees, error,
      fetchedEmployees, fetchingEmployees,
      } = this.props;

    let companyEmployees = error ?
      <p>List of Employees Could Not Be Loaded!</p> :
      <Spinner>Fetching List of Employees...</Spinner>;

    if (!fetchingEmployees && fetchedEmployees && employees) {
      companyEmployees = (
        <div>
          <h2>List of Employees</h2>
          {employees.map(person =>
            <Person
              key={person._id}
              personId={person._id}
              name={person.name}
              companyName={person.companyName}
              email={person.email}
              companyId={person.companyId}
              delete={() => this.deletePerson(person)}
            />
          )}
        </div>
      );
      console.log('fetchEmployees: ' + JSON.stringify(employees));
    };
    return (
      <div>
        {companyEmployees}
      </div>
    );
  };  // end of render
}; // end of company-list Container       

const mapStateToProps = state => {
  return {
    employees: state.employees.employees,
    error: state.employees.error,
    fetchedEmployees: state.employees.fetched,
    fetchingEmployees: state.employees.fetching
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchEmployees, deletePerson
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Employees);