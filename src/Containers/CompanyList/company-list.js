import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Spinner from '../../Components/UI/Spinner/Spinner';

/** ACTIONS **/
import { fetchCompanyList, importCompanies } from '../../actions/companyActions.js';

/** Dummy Components **/
// import Companies from '../../Components/companyList/companyList.js';
import Company from '../../Components/companyList/company/company.js';

class CompanyList extends Component {
  componentDidMount() {
    // console.log('[company-List.js] Inside componentDidMount()');
    this.props.fetchCompanyList();
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[company-List.js] Inside shouldComponentUpdate', nextProps, nextState);
  //   console.log(`nextProps: ${JSON.stringify(nextProps)}`);
  //   console.log(`nextProps: ${JSON.stringify(nextState)}`);
  //   return true;
  // }

  // componentDidUpdate() {
  //   console.log('[company-List.js] Inside componentDidUpdate');
  // }

  render() {
    const {
      companies, error,
      fetchedCompanies, fetchingCompanies,
      } = this.props;

    let fetchedCompList = error ?
      <p>List of Companies Could Not Be Loaded!</p> :
      <Spinner>Fetching List of Companies...</Spinner>

    if (!fetchingCompanies && fetchedCompanies && companies) {
      fetchedCompList = (
        <div>
          <h2>List of Companies</h2>
          {companies.map(company =>
            <Company
              key={company._id}
              compId={company._id}
              name={company.name}
              address={company.address}
              revenue={company.revenue}
              phone={company.phone}
            />
          )}
        </div>
      );
      // console.log('fetchCompList: ' + JSON.stringify(companies));
    };
    return (
      <div>
        {fetchedCompList}
      </div>
    );
  };  // end of render
}; // end of company-list Container       

const mapStateToProps = state => {
  return {
    companies: state.companyList.companies,
    error: state.companyList.error,
    fetchedCompanies: state.companyList.fetched,
    fetchingCompanies: state.companyList.fetching
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCompanyList, importCompanies,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CompanyList);