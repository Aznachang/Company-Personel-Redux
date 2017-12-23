// Update FormData Objects Immutably
export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

// Form Rules
export const checkValidity = (value, rules) => {
  // each of the rules.*property* has to be true
  let isValid = true;
  
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid
  }

  if (rules.isPhone) {
    const pattern = /^\d{3}-\d{3}-\d{4}$/;
    isValid = pattern.test(value) && isValid
  }

  if (rules.isEmail) {
    const pattern = /[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid
  }

  return isValid;
}
