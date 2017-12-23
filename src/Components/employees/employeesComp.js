import React from 'react';
import Person from './employees/personComp.js';

const companyList = props => (
  <div className="company-list">
    <ul>
    {
      props.employees.map(person=>{
        <li key={person._id}>
          <Person 
            compId={person._id}
            companyName={person.companyName}
            name={person.name}
            email={person.email}
          /> 
        </li>   
      })
    }
    </ul>
  </div>
)

export default companyList;
