const initialState = {
  /**** GET ****/
  employees: [],
  fetching: false,
  fetched: false,
  error: null,
  /**** POST ****/
  adding: false,
  added: false
};

const employeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_EMPLOYEES": {
      return { ...state, fetching: true };
    }
    case "FETCH_EMPLOYEES_REJECTED": {
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    }
    case "FETCH_EMPLOYEES_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        employees: action.payload
      };
    }
    case "DELETE_AN_EMPLOYEE": {
      return { ...state, fetching: true };
    }
    case "DELETE_AN_EMPLOYEE_FULFILLED": {
      const employees = [...state.employees];
      let len = employees.length;

      for (let i=0; i<len; i++) {
        let curr = employees[i]._id;
        if (curr === action.payload) {
          employees.splice(i, 1);
          break;
        }
      }

      return {
        ...state,
        fetching: false,
        fetched: true,
        employees: employees 
      };
    }
    case "DELETE_AN_EMPLOYEE_REJECTED": {
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    }
    case "ADD_AN_EMPLOYEE": {
      return { ...state, adding: true };
    }
    case "ADD_AN_EMPLOYEE_FULFILLED": {
      return {
        ...state,
        adding: false,
        added: true,
        employees: [...state.employees, action.payload]
      };
    }
    case "ADD_AN_EMPLOYEE_REJECTED": {
      return {
        ...state,
        adding: false,
        error: action.payload
      };
    }
    default: return state;
  } // end of switch cases
  //return state;
};

export default employeesReducer;