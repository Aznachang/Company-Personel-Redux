const initialState = {
  company: {
    _id: null,
    name: null,
    address: null,
    revenue: null,
    phone: null
  },
  error: null,

  /**** GET ****/
  fetching: false,
  fetched: false,
  /** UPDATE **/
  updating: false,
  updated: false  
};

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_COMPANY": {
      return { ...state, fetching: true, updating: false, updated: false };
    }
    case "FETCH_COMPANY_REJECTED": {
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    }
    case "FETCH_COMPANY_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        company: action.payload
      };
    }
    case "UPDATE_COMPANY": {
      return { ...state, updating: true };
    }
    case "UPDATE_COMPANY_REJECTED": {
      return {
        ...state,
        updating: false,
        error: action.payload
      };
    }
    case "UPDATE_COMPANY_FULFILLED": {
      return {
        ...state,
        updating: false,
        updated: true,
        company: action.payload
      };
    }
    default: return state;
  } // end of switch cases
  //return state;
};

export default companyReducer;