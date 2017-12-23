import React from 'react';
import Company from './company/company.js';

const companyList = props => (
  <div className="company-list">
    <ul>
    {
      props.companies.map(company=>{
        <li key={company._id}>
          <Company 
            compId={company._id}
            name={company.name}
            address={company.address}
            revenue={company.revenue}
            phone={company.phone}  
          /> 
        </li>   
      })
    }
    </ul>
  </div>
)

export default companyList;
