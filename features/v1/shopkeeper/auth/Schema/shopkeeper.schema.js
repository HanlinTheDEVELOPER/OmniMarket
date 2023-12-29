import { object, string, ref } from "yup";

const getCharacterValidationError = (str) => {
  return `Your password must have at least 1 ${str} character`;
};

const shopkeeperSchema = object({
  name: string("Must be a string").required(),
  email: string().email("Enter a valid Email").required(),
  password: string()
    .required("Please enter a password")
    // check minimum characters
    .min(8, "Password must have at least 8 characters")
    // different error messages for different requirements
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
  confirmPassword: string()
    .required("Please re-type your password")
    // use oneOf to match one of the values inside the array.
    // use "ref" to get the value of passwrod.
    .oneOf([ref("password")], "Passwords does not match"),
});

export default shopkeeperSchema;
