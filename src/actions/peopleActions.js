import axios from "axios";

export function onAddEmployee(employee, id) {
  return (dispatch) => {
    // console.log(`Added Employee: ${JSON.stringify(employee)}`);

    let finalEmployee = { ...employee, "companyId": `${id}` };
    // console.log(`Added Final Employee:${JSON.stringify(finalEmployee)}`);

    dispatch({ type: "ADD_AN_EMPLOYEE" });
    axios.post("/person", finalEmployee)
      .then((res) => {
        dispatch({ type: "ADD_AN_EMPLOYEE_FULFILLED", payload: res.data })
      })
      .catch((err) => {
        dispatch({ type: "ADD_AN_EMPLOYEE_REJECTED", payload: err })
      })
  }
}

// 'person/:id'
export function deletePerson(id) {
  return (dispatch) => {
    // console.log(`Delete Employee - ID:${id}`);
    
    dispatch({ type: "DELETE_AN_EMPLOYEE" });
    axios.delete(`/person/${id}`)
      .then((res) => {
        // console.log(`deleted Person: ${JSON.stringify(res.data)}`);  // NOTHING - ""
        dispatch({ type: "DELETE_AN_EMPLOYEE_FULFILLED", payload: id })
      })
      .catch((err) => {
        dispatch({ type: "DELETE_AN_EMPLOYEE_REJECTED", payload: err })
      })
  }
}

export function importEmployees(id) {
  return (dispatch) => {
    dispatch({ type: "IMPORT_EMPLOYEES" });
    axios.get(`importPeopleForCompany/${id}`)
      .then((res) => {
        dispatch({ type: "IMPORT_EMPLOYEES_FULFILLED", payload: res.data })
      })
      //call fetch_Employees
      .then(() => {
        dispatch({ type: "FETCH_EMPLOYEES" });
        axios.get("/companies/" + id + "/people")
          .then((res) => {
            dispatch({ type: "FETCH_EMPLOYEES_FULFILLED", payload: res.data, empCompanyId: id })
          })
          .catch((err) => {
            dispatch({ type: "FETCH_EMPLOYEES_REJECTED", payload: err })
          })
      })
      .catch((err) => {
        dispatch({ type: "IMPORT_EMPLOYEES_REJECTED", payload: err })
      })
  }
}

export function fetchEmployees(id) {
  return (dispatch) => {
    dispatch({ type: "FETCH_EMPLOYEES" });
    // console.log(`**** fetchEmployees compid: ${id}`);
    axios.get(`/companies/${id}/people`)
      .then((res) => {
        // console.log(`**** fetchEmployees Data: ${JSON.stringify(res.data)}`);
        dispatch({ type: "FETCH_EMPLOYEES_FULFILLED", payload: res.data })
      })
      .catch((err) => {
        dispatch({ type: "FETCH_EMPLOYEES_REJECTED", payload: err })
      })
  }
}

export function fetchPerson(id) {
  return (dispatch) => {
    dispatch({ type: "FETCH_PERSON" });
    console.log(`fetchPerson - personId: ${id}`);
    axios.get(`/person/${id}`)
      .then((res) => {
        // console.log(`fetchAPerson: ${JSON.stringify(res.data)}`);
        dispatch({ type: "FETCH_PERSON_FULFILLED", payload: res.data })
      })
      .catch((err) => {
        dispatch({ type: "FETCH_PERSON_REJECTED", payload: err })
      })
  }
}

export function updatePerson(id, compId, compName, person) {
  return (dispatch) => {
    let finalPerson = {
      ...person,
      "_id": `${id}`, "companyName": `${compName}`, "companyId": `${compId}`
    };
    // console.log(`updatePerson - finalPerson: ${JSON.stringify(finalPerson)}`);

    dispatch({ type: "UPDATE_PERSON" });
    // axios.put(url,{body},{headers})
    axios.put(`/person/${id}`, finalPerson)
      .then((res) => {
        dispatch({ type: "UPDATE_EMPLOYEES_FULFILLED", payload: res.data })
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_EMPLOYEE_REJECTED", payload: err })
      })
  }
}
