const initialState = {
  person: {
    _id: null,
    name: null,
    companyId: null,
    email: null,
    companyName: null
  },
  fetching: false,
  fetched: false,
  error: null,
};

const personReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PERSON": {
      return { ...state, fetching: true };
    }
    case "FETCH_PERSON_REJECTED": {
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    }
    case "FETCH_PERSON_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        person: action.payload
      };
    }
    case "UPDATE_PERSON": {
      return { ...state, fetching: true };
    }
    default: return state;
  } // end of switch cases
  //return state;
};

export default personReducer;