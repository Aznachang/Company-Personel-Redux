const initialState = {
  /**** GET ****/
  companies: [],
  fetching: false,
  fetched: false,
  error: null,
  /**** POST ****/
  adding: false,
  added: false
};

const companyListReducer = (state = initialState, action) => {
  switch (action.type) {
     /**** FETCH COMPANY LIST ****/
    case "FETCH_COMPANIES": {
      return { ...state, fetching: true };
    }
    case "FETCH_COMPANIES_REJECTED": {
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    }
    case "FETCH_COMPANIES_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        companies: action.payload
      };
    }
    /**** ADD A COMPANY ****/
    case "ADD_A_COMPANY": {
      return Object.assign({}, state, { fetching: true, adding: true });
    }
    case "ADD_A_COMPANY_REJECTED": {
      return Object.assign({}, state, { added: true, adding: false, error: action.payload });
    }
    case "ADD_A_COMPANY_FULFILLED": {
      return Object.assign({}, state, {
        //fetching: false,
        //fetched: true,
        adding: false,
        added: true,
        company: action.payload,
      });
    }
    default: return state;
  } // end of switch cases
  //return state;
};

export default companyListReducer;