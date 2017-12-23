const initialState = {
  company: {
    _id: null,
    name: null,
    address: null,
    revenue: null,
    phone: null
  },
  // get
  fetching: false,
  fetched: false,
  // post
  adding: false,
  added: false,
  error: null,
};

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_COMPANY": {
      return { ...state, fetching: true };
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
      return { ...state, fetching: true };
    }
    default: return state;
  } // end of switch cases
  //return state;
};

export default companyReducer;