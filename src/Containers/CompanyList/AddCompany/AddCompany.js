/** REDUX **/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

/** ACTIONS **/
import { fetchCompanyList, onAddCompany } from '../../../actions/companyActions.js';

/** UI Components **/
import Button from '../../../Components/UI/Button/Button';
import Input from '../../../Components/UI/Forms/Input';
// import InputForm from '../../../Components/InputForm/InputForm';

/** CSS File **/
import classes from './AddCompany.css';

/** Validation - 'Shared' **/
import { updateObject, checkValidity } from '../../../shared/validation';

class AddCompany extends Component {
  state = {
    companyForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Company Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      address: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: '369 Damn You Fine St.'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      revenue: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: '666'
        },
        value: '',
        validation: {
          required: true,
          isNumeric: true
        },
        valid: false,
        touched: false
      },
      phone: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: '111-222-3333'
        },
        value: '',
        validation: {
          required: true,
          isPhone: true
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false
  }

  inputChangedHandler = (event, inputIdentity) => {
    const { companyForm, formIsValid } = this.state;

    /** Updated Form **/
    const updatedFormElement = updateObject(companyForm[inputIdentity], {
      value: event.target.value,
      valid: checkValidity(event.target.value, companyForm[inputIdentity].validation),
      touched: true
    });
    // create copy of orig Form data, keep track of user-input
    const updatedCompanyForm = updateObject(companyForm, {
      [inputIdentity]: updatedFormElement
    });

    let FormIsValid = true;
    for (let inputIdentity in updatedCompanyForm) {
      FormIsValid = updatedCompanyForm[inputIdentity].valid && FormIsValid;
    }

    this.setState({ companyForm: updatedCompanyForm, formIsValid: FormIsValid });
  }

  addCompanyHandler = (event) => {
    event.preventDefault();

    const { companyForm } = this.state;
    const { onAddCompany, addedCompany, addingCompany } = this.props;
    const formData = {};

    // formProperty -> companyForm: 'name', 'address', etc.
    for (let formProperty in companyForm) {
      let userInputVal = companyForm[formProperty].value;
      formData[formProperty] = userInputVal;
    }

    onAddCompany(formData);
    if (addedCompany && !addingCompany) {
      {<Redirect to= {`/`} />}
    }
  }

  render() {
    const { companyForm, formIsValid } = this.state;
    const formElementsArray = [];

    for (let key in companyForm) {
      formElementsArray.push({
        id: key, // key - 'name', 'address', etc.
        config: companyForm[key]  // {all parameters}
      });
    }

    let form = (
      <form onSubmit={this.addCompanyHandler}>
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
        <Button btnType="Success" disabled={!formIsValid}>ADD COMPANY</Button>
      </form>
    );

    return (
      <div className={classes.CompanyData}>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title"><b>New Company Form</b></h3>
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
    addedCompany: state.companyList.added,
    addingCompany: state.companyList.adding
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  // enter methods to use from 'actions' folder
  fetchCompanyList, onAddCompany
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddCompany);