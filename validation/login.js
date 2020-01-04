const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateLoginInput(data) {
  let errors = {};
  let message = ''
  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  // Email checks
  if (Validator.isEmpty(data.email)) {
    message = "Email field is required";
    errors.success = false;
    errors.message = message;
  } else if (!Validator.isEmail(data.email)) {
    message = "Email is invalid"
    errors.success = false;
    errors.message = message;
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    message =  message === '' ? "Password field is required" : message + ' and Password field is required';
    errors.success = false;
    errors.message = message;
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
