import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import Spinner from '../../Components/UI/Spinner/Spinner';

/** ACTIONS **/
import { fetchACompany } from '../../actions/companyActions.js';

/** Dummy Components **/
import ACompany from '../../Components/companyList/company/company.js';

import CompanyList from '../CompanyList/company-list';

class Company extends Component {
  componentDidMount() {

    const compID = this.props.match.params.compId;
    this.props.fetchACompany(compID);
  }

  render() {
    const {
      company, error,
      fetchedCompany, fetchingCompany,
      } = this.props;

    let companyDetails = error ?
      <p>Company Details Could Not Be Loaded!</p> :
      <Spinner>Fetching Company Details...</Spinner>;

    if (!fetchingCompany && fetchedCompany && company) {
      companyDetails = (
        <div>
          <h2>Company Details - {company.name}</h2>
          {<ACompany
            compId={company._id}
            name={company.name}
            address={company.address}
            revenue={company.revenue}
            phone={company.phone}
          />}
        </div>
      );
    };

    return (
      <div>
        {companyDetails}
        <Route
          path={'/'}
          component={CompanyList} />
      </div>
    );
  };  // end of render
}; // end of 'Company' Container       


const mapStateToProps = state => {
  return {
    company: state.companyDetail.company,
    fetchedCompany: state.companyDetail.fetched,
    fetchingCompany: state.companyDetail.fetching,
    error: state.companyDetail.error,
    companies: state.companyList.companies,
    fetchedCompanies: state.companyList.fetched,
    fetchingCompanies: state.companyList.fetching
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchACompany
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Company);