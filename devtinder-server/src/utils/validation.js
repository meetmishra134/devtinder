const validator = require("validator");
function signupValidation(req) {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Invalid name");
  } else if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(password + " is a weak password");
  }
}
function profileEditValidation(req) {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "skills",
    "About",
    "photoUrl",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    field.includes(allowedEditFields)
  );
  return isEditAllowed;
}
module.exports = { signupValidation, profileEditValidation };
