import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

/** ACTIONS **/
import { updatePerson, fetchPerson, fetchEmployees } from '../../../actions/peopleActions.js';
/** UI Components **/
import Button from '../../../Components/UI/Button/Button';
import Input from '../../../Components/UI/Forms/Input';

/** CSS File **/
import classes from './PersonUpdate.css';

/** Validation - 'Shared' **/
import { updateObject, checkValidity } from '../../../shared/validation';

class PersonUpdate extends Component {
  state = {
    updatedPersonForm: {
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
      }
    },
    formIsValid: false,
  }

  componentDidMount() {
    // '/person/:personId'
    const { fetchPerson } = this.props;
    let params = this.props.match.params;
    const id = params.personId;

    fetchPerson(id);
  }

  inputChangedHandler = (e, inputIdentity) => {
    const { updatedPersonForm } = this.state;

    /** Updated Form **/
    const updatedFormElement = updateObject(updatedPersonForm[inputIdentity], {
      value: e.target.value,
      valid: checkValidity(e.target.value, updatedPersonForm[inputIdentity].validation),
      touched: true
    });
    // create copy of orig Form data, keep track of user-input
    const updatedCompany = updateObject(updatedPersonForm, {
      [inputIdentity]: updatedFormElement
    });

    let FormIsValid = true;
    for (let inputIdentity in updatedCompany) {
      FormIsValid = updatedCompany[inputIdentity].valid && FormIsValid;
    }

    this.setState({ updatedPersonForm: updatedCompany, formIsValid: FormIsValid });
  }

  // triggered upon User clicking on 'Update' Button
  updatePersonHandler = (e) => {
    e.preventDefault();

    const { updatedPersonForm } = this.state;
    const { person, updatePerson } = this.props;

    /** Local Properties **/
    let personData = {};
    let personId = person._id,
      compId = person.companyId,
      compName = person.companyName;

    for (let key in updatedPersonForm) {
      let userInputVal = updatedPersonForm[key].value;
      personData[key] = userInputVal;
    }
    // INFO Needed STILL - personID, companyName, companyId
    // call Action that 'updates an employee's info'
    updatePerson(personId, compId, compName, personData);
  }

  render() {
    const { updatedPersonForm, formIsValid } = this.state;
    const { updatedPerson, updatingPerson, match } = this.props;
    const formElementsArray = [];

    let redirect = null;
    console.log(`match - PERSONUPDATE: ${JSON.stringify(match)}`);
    let id = match.params.compId;
    
    if (updatedPerson && !updatingPerson) {
      redirect = <Redirect to={`/companies/${id}/people`} />;
    }

    for (let key in updatedPersonForm) {
      formElementsArray.push({
        id: key, // key - 'name', 'address', etc.
        config: updatedPersonForm[key]  // {all parameters}
      });
    }

    let form = (
      <form onSubmit={e => this.updatePersonHandler(e)}>
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
      </form>
    );

    return (
      <div className={classes.UpdatedEmployeeData}>
        {redirect}
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title"><b>Update Employee Form</b></h3>
          </div>
          {form}
        </div>
      </div>
    );
  };  // end of render
}; // end of 'Company' Container       


const mapStateToProps = state => {
  return {
    /** Person - UPDATE **/
    updatingPerson: state.person.updating,
    updatedPerson: state.person.updated,

    /** Person **/
    person: state.person.person,
    fetchedPerson: state.person.fetched,
    fetchingPerson: state.person.fetching,
    errorPerson: state.person.error
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  updatePerson, fetchPerson, fetchEmployees
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PersonUpdate);