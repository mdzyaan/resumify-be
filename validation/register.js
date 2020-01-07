const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.repeatPassword = !isEmpty(data.repeatPassword) ? data.repeatPassword : "";
  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.message =
      !errors.message
        ? "Name field is required"
        : "and Name field is required";
  }
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.message =
      !errors.message
        ? "Email field is required"
        : errors.message + " and Email field is required";
  } 
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.message =
      !errors.message  ? "Password field is required" : errors.message + " and Password field is required";
  }
  if (Validator.isEmpty(data.repeatPassword)) {
    errors.message =
      !errors.message
        ? "Confirm password field is required"
        : errors.message + " and Confirm password field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.message =
      !errors.message 
        ? "Password must be at least 6 characters."
        : errors.message + " and Password must be at least 6 characters.";
  }

  if (!Validator.equals(data.password, data.repeatPassword)) {
        errors.message =
          !errors.message 
            ? "Passwords must match."
            : errors.message + " and Passwords must match.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
