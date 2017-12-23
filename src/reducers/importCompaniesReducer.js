const initialState = {
  importedCompanies: [],
  fetching: false,
  fetched: false,
  error: null,
};

const importCompamiesReducer = (state = initialState, action) => {
  // All Action-Types for companyList!
  switch (action.type) {
    case "IMPORT_COMPANIES": {
      return {
        ...state, fetching: true };
    }
    case "IMPORT_COMPANIES_REJECTED": {
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    }
    case "IMPORT_COMPANIES_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        importedCompanies: action.payload
      };
    }
    default: return state;
  } // end of switch
  //return state;
}
export default importCompamiesReducer;