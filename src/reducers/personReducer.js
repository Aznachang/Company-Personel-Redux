const initialState = {
  person: {
    _id: null,
    name: null,
    companyId: null,
    email: null,
    companyName: null
  },
  error: null,

  /** GET **/
  fetching: false,
  fetched: false,
  /** UPDATE **/
  updating: false,
  updated: false
};

const personReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PERSON": {
      return { ...state, fetching: true, updating: false, updated: false };
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
      return { ...state, updating: true };
    }
    case "UPDATE_PERSON_REJECTED": {
      return {
        ...state,
        updating: false,
        error: action.payload
      };
    }
    case "UPDATE_PERSON_FULFILLED": {
      return {
        ...state,
        updating: false,
        updated: true,
        person: action.payload
      };
    }
    default: return state;
  } // end of switch cases
  //return state;
};

export default personReducer;