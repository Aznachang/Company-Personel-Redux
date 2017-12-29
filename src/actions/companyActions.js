import axios from "axios";

export function fetchCompanyList() {
  return (dispatch) => {
    dispatch({ type: "FETCH_COMPANIES" });
    axios.get("/companies")
      .then((res) => {
        dispatch({ type: "FETCH_COMPANIES_FULFILLED", payload: res.data })
      })
      .catch((err) => {
        dispatch({ type: "FETCH_COMPANIES_REJECTED", payload: err })
      })
  }
}

export function importCompanies() {
  return (dispatch) => {
    dispatch({ type: "IMPORT_COMPANIES" });
    console.log('importCompanies - Before Axios');
    axios.get("/importCompanies")
      .then((res) => {
        console.log('Before IMPORT_COMPANIES_FULFILLED');
        dispatch({ type: "IMPORT_COMPANIES_FULFILLED", payload: res.data })
      })
      //call fetch_Companies again
      .then(() => {
        dispatch({ type: "FETCH_COMPANIES" });
        axios.get("/companies")
          .then((res) => {
            dispatch({ type: "FETCH_COMPANIES_FULFILLED", payload: res.data })
          })
          .catch((err) => {
            dispatch({ type: "FETCH_COMPANIES_REJECTED", payload: err })
          })
      })
      .catch((err) => {
        dispatch({ type: "IMPORT_COMPANIES_REJECTED", payload: err })
      })
  }
}

/** FETCH ONE COMPANY'S DETAILS **/
export function fetchACompany(id) {
  return (dispatch) => {
    // console.log(`**** action-fetchACompanyROUTE: /companies/${id}`);
    dispatch({ type: "FETCH_COMPANY" });
    axios.get(`/companies/${id}`)
      .then((res) => {
        // console.log(`fetchACompany: ${JSON.stringify(res.data)}`);
        dispatch({ type: "FETCH_COMPANY_FULFILLED", payload: res.data })
      })
      .catch((err) => {
        dispatch({ type: "FETCH_COMPANY_REJECTED", payload: err })
      })
  }
}

// STILL NEED TO FIGURE OUT LOGIC
export function updateCompany(id, company) {
  return (dispatch) => {
    // console.log(`**** action-updateCompanyROUTE: /companies/${id}/edit`);
    dispatch({ type: "UPDATE_COMPANY" });
    // axios.put(url,{body},{headers})
    axios.put(`/companies/${id}`, company)
      .then((res) => {
        dispatch({ type: "UPDATE_COMPANY_FULFILLED", payload: res.data })
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_COMPANY_REJECTED", payload: err })
      })
  }
}

export function onAddCompany(company) {
  return (dispatch) => {
    dispatch({ type: "ADD_A_COMPANY" });
    // axios.post(url,{body})
    axios.post("/companies", company)
      .then((res) => {
        dispatch({ type: "ADD_A_COMPANY_FULFILLED", payload: res.data })
      })
      .catch((err) => {
        dispatch({ type: "ADD_A_COMPANY_REJECTED", payload: err })
      })
  }
}
