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
    companyID: '',
    formIsValid: false
  }

  componentDidMount() {
    this.props.fetchCompanyList();
  }

  inputChangedHandler = (e, inputField) => {
    const { employeeForm } = this.state;

    /** Updated Form **/
    const updatedFormElement = updateObject(employeeForm[inputField], {
      value: e.target.value,
      valid: checkValidity(e.target.value, employeeForm[inputField].validation),
      touched: true
    });
    const updatedEmployeeForm = updateObject(employeeForm, {
      [inputField]: updatedFormElement
    });

    let FormIsValid = true;
    for (let inputField in updatedEmployeeForm) {
      FormIsValid = updatedEmployeeForm[inputField].valid && FormIsValid;
    }

    this.setState({ employeeForm: updatedEmployeeForm, formIsValid: FormIsValid });
  }

  addEmployeeHandler = (e) => {
    e.preventDefault();

    const { employeeForm } = this.state;
    const { onAddEmployee, companies } = this.props;

    let id; // companyId
    const formData = {};

    // property -> employeeForm: 'name', 'address', etc.
    for (let property in employeeForm) {
      let userInputVal = employeeForm[property].value;
      formData[property] = userInputVal;
    }

    /** loop thru fetchedCompanies **/
    for (let obj in companies) {
      let company = companies[obj];
      // assign 'companyId' from matching 'companyName'
      if (company.name === formData.companyName) {
        console.log(`company Chosen: ${JSON.stringify(company)}`);
        id = company._id;
        break;
      }
    }
    this.setState({ companyID: id });
    onAddEmployee(formData, id);
  }

  render() {
    const { employeeForm, formIsValid, companyID } = this.state;
    const { addingEmployee, addedEmployee } = this.props;
    const formElementsArray = [];

    let redirect = null;
    if (addedEmployee && !addingEmployee) {
      redirect = <Redirect to={`/companies/${companyID}/people`} />;
    }

    for (let key in employeeForm) {
      formElementsArray.push({
        id: key, // key - 'name', 'address', etc.
        config: employeeForm[key]  // {all parameters}
      });
    }

    let form = (
      <form onSubmit={e => this.addEmployeeHandler(e)}>
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
            changed={e => this.inputChangedHandler(e, formElement.id)} />
        ))}
        <Button btnType="Success" disabled={!formIsValid}>ADD EMPLOYEE</Button>
      </form>
    );

    return (
      <div className={classes.EmployeeData}>
        {redirect}
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
    /** COMPANIES **/
    companies: state.companyList.companies,
    error: state.companyList.error,
    fetchedCompanies: state.companyList.fetched,
    fetchingCompanies: state.companyList.fetching,
    /** EMPLOYEE **/
    addedEmployee: state.employees.added,
    addingEmployee: state.employees.adding
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  // enter methods to use from 'actions' folder
  fetchCompanyList, fetchEmployees, onAddEmployee
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddEmployee);