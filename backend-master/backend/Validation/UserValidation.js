const isEmpty = require('./isEmpty');
const validator = require('validator');


module.exports = function ValidateUser(data) {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.password = !isEmpty(data.password) ? data.password : "";
 
  if (!validator.isEmail(data.email)) {
    errors.email = "Format Email required";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Required Email";
  }
  if (validator.isEmpty(data.lastname)) {
    errors.lastname = "Required Lastname";
  }
  if (validator.isEmpty(data.firstname)) {
    errors.firstname = "Required Firstname";
  }
  if (validator.isEmpty(data.phone)) {
    errors.phone = "Required phone";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Required password";
  }

  return {
      errors,
      isValid: isEmpty(errors)
  }
};