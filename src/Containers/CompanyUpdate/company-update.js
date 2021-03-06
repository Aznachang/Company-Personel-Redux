import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

/** ACTIONS **/
import { fetchACompany, updateCompany, fetchCompanyList } from '../../actions/companyActions.js';

/** UI Components **/
import Button from '../../Components/UI/Button/Button';
import Input from '../../Components/UI/Forms/Input';

/** CSS File **/
import classes from './UpdateCompany.css';

/** Validation - 'Shared' **/
import { updateObject, checkValidity } from '../../shared/validation';

class CompanyUpdate extends Component {
  state = {
    updatedCompanyForm: {
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
    formIsValid: false,
  }

  inputChangedHandler = (e, inputIdentity) => {
    const { updatedCompanyForm } = this.state;

    /** Updated Form **/
    const updatedFormElement = updateObject(updatedCompanyForm[inputIdentity], {
      value: e.target.value,
      valid: checkValidity(e.target.value, updatedCompanyForm[inputIdentity].validation),
      touched: true
    });
    // create copy of orig Form data, keep track of user-input
    const updatedCompany = updateObject(updatedCompanyForm, {
      [inputIdentity]: updatedFormElement
    });

    let FormIsValid = true;
    for (let inputIdentity in updatedCompany) {
      FormIsValid = updatedCompany[inputIdentity].valid && FormIsValid;
    }

    this.setState({ updatedCompanyForm: updatedCompany, formIsValid: FormIsValid });
  }

  // triggered upon User clicking on 'Update' Button
  updateCompanyHandler = (e) => {
    e.preventDefault();

    const { updatedCompanyForm } = this.state;
    const { updateCompany } = this.props;

    /** Local Properties **/
    const compID = this.props.match.params.compId;
    const formData = {};

    // formProperty -> companyForm: 'name', 'address', etc.
    for (let key in updatedCompanyForm) {
      let userInputVal = updatedCompanyForm[key].value;
      formData[key] = userInputVal;
    }

    // call Action that 'updates A company's info'
    updateCompany(compID, formData);
  }

  render() {
    const { updatedCompanyForm, formIsValid } = this.state;
    const { updatingCompany, updatedCompany, match } = this.props;
    const formElementsArray = [];

    let redirect = null;
    let id = match.params.compId;
    console.log(`company-update - compID: ${id}`);

    if (updatedCompany && !updatingCompany) {
      redirect = <Redirect to={`/companies/${id}`} />;
    }

    for (let key in updatedCompanyForm) {
      formElementsArray.push({
        id: key, // key - 'name', 'address', etc.
        config: updatedCompanyForm[key]  // {all parameters}
      });
    }

    let form = (
      <form onSubmit={e => this.updateCompanyHandler(e)}>
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
            changed={(e) => this.inputChangedHandler(e, formElement.id)} />
        ))}

        <Button btnType="Success" disabled={!formIsValid}>UPDATE</Button>
        {/* <Button btnType="Success">Update</Button> */}
      </form>
    );

    return (
      <div className={classes.UpdatedCompanyData}>
        {redirect}
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title"><b>Update Company Form</b></h3>
          </div>
          {form}
        </div>
      </div>
    );
  };  // end of render
}; // end of 'Company' Container       


const mapStateToProps = state => {
  return {
    /** Company - UPDATE **/
    updatingCompany: state.companyDetail.updating,
    updatedCompany: state.companyDetail.updated,

    /** Company **/
    company: state.companyDetail.company,
    fetchedCompany: state.companyDetail.fetched,
    fetchingCompany: state.companyDetail.fetching,
    errorCompany: state.companyDetail.error
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  updateCompany, fetchACompany, fetchCompanyList
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CompanyUpdate);