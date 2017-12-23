import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Spinner from '../../Components/UI/Spinner/Spinner';

/** ACTIONS **/
import { fetchPerson } from '../../actions/peopleActions.js';

/** Dummy Components **/
import APerson from '../../Components/employees/person/personComp.js';

class Person extends Component {
  componentDidMount() {
    console.log('[company.js] Inside componentDidMount()');
    // console.log(`Company ID: ${JSON.stringify(this.props.match.params.compId)}`);
    // const compID = JSON.stringify(this.props.match.params.compId);

    const personId = this.props.match.params.personId;
    this.props.fetchPerson(personId);
  }

  render() {
    const {
      person, error,
      fetchedPerson, fetchingPerson,
      } = this.props;

    let personDetails = error ?
      <p>Person Details Could Not Be Loaded!</p> :
      <Spinner>Fetching Person Details...</Spinner>

    if (!fetchingPerson && fetchedPerson && person) {
      personDetails = (
        <APerson
          personId={person._id}
          name={person.name}
          companyName={person.companyName}
          email={person.email}
          companyId={person.companyId}
        />
      );
    };

    return (
      <div>
        {personDetails}
      </div>
    );
  };  // end of render
}; // end of 'Company' Container       


const mapStateToProps = state => {
  return {
    person: state.person.person,
    fetchedPerson: state.person.fetched,
    fetchingPerson: state.person.fetching,
    error: state.person.error
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchPerson
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Person);