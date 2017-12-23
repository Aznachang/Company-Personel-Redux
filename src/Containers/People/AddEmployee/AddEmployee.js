/** REDUX **/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

/** ACTIONS **/
import { fetchEmployees, onAddEmployee } from '../../../actions/peopleActions.js';
import { fetchCompanyList } from '../../../actions/companyActions.js';

/** UI Components **/
import Button from '../../../Components/UI/Button/Button';
import Input from '../../../Components/UI/Forms/Input';

/** CSS File **/
import classes from './AddEmployee.css';

/** Validation - 'Shared' **/
import { updateObject, checkValidity } from '../../../shared/validation';

class AddEmployee extends Component {
  state = {
    employeeForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Employee Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Aznachang@gmail.com'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      companyName: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'Amazon', displayValue: 'Amazon' },
            { value: 'Microsoft', displayValue: 'Microsoft' },
          ]
        },
        value: 'Amazon',  // first company
        validation: {},
        valid: true
      }
    },  // end of employeeForm
    formIsValid: false
  }

  componentDidMount() {
    // const { companyNames } = this.state;
    // let companiesFound = this.props.fetchCompanyList();
    // console.log(`companiesFound: ${JSON.stringify(companiesFound)}`)
    this.props.fetchCompanyList();
  }

  inputChangedHandler = (event, inputIdentity) => {
    const { employeeForm, formIsValid } = this.state;

    /** Updated Form **/
    const updatedFormElement = updateObject(employeeForm[inputIdentity], {
      value: event.target.value,
      valid: checkValidity(event.target.value, employeeForm[inputIdentity].validation),
      touched: true
    });
    const updatedEmployeeForm = updateObject(employeeForm, {
      [inputIdentity]: updatedFormElement
    });

    let FormIsValid = true;
    for (let inputIdentity in updatedEmployeeForm) {
      FormIsValid = updatedEmployeeForm[inputIdentity].valid && FormIsValid;
    }

    this.setState({ employeeForm: updatedEmployeeForm, formIsValid: FormIsValid });
  }

  addEmployeeHandler = (event) => {
    event.preventDefault();

    const { employeeForm } = this.state;
    const { onAddEmployee, companies, 
      addingEmployee, addedEmployee } = this.props;

    let id; // companyId
    const formData = {};

    // formProperty -> employeeForm: 'name', 'address', etc.
    for (let formProperty in employeeForm) {
      let userInputVal = employeeForm[formProperty].value;
      formData[formProperty] = userInputVal;
    }

    // console.log(`Employee Form Data: ${JSON.stringify(formData)}`);
    // console.log(`Companies: ${JSON.stringify(companies)}`);
    //debugger;
    for (let obj in companies) {
      let company = companies[obj];
      console.log(`company: ${JSON.stringify(company)}`);
      if (company.name === formData.companyName) {
        console.log(`company Chosen: ${JSON.stringify(company)}`);
        id = company._id;
        break;
      }
    }
    onAddEmployee(formData, id);
    if (addedEmployee && !addingEmployee) {
      {<Redirect to= {`/companies/${id}/people`} />}
    }
  }

  render() {
    const { employeeForm, formIsValid } = this.state;
    const formElementsArray = [];

    for (let key in employeeForm) {
      formElementsArray.push({
        id: key, // key - 'name', 'address', etc.
        config: employeeForm[key]  // {all parameters}
      });
    }

    let form = (
      <form onSubmit={this.addEmployeeHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            label={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ))}
        <Button btnType="Success" disabled={!formIsValid}>ADD EMPLOYEE</Button>
      </form>
    );

    return (
      <div className={classes.EmployeeData}>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title"><b>New Employee Form</b></h3>
          </div>
          {form}
        </div>
      </div>
    );
  } // end of render()
}

const mapStateToProps = state => {
  // check index.js for 'reducer' Definitions
  // state.reducer.state_property
  return {
    companies: state.companyList.companies,
    error: state.companyList.error,
    fetchedCompanies: state.companyList.fetched,
    fetchingCompanies: state.companyList.fetching,
    addedEmployee: state.employees.added, 
    addingEmployee: state.adding
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  // enter methods to use from 'actions' folder
  fetchCompanyList, fetchEmployees, onAddEmployee
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddEmployee);