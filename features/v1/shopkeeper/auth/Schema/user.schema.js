import { object, string } from "yup";

const UserSchema = object({
  name: string("Must be a string").required(),
  email: string().email("Enter a valid Email").required(),
  role: string().oneOf(["customer", "shopkeeper", "admin"]),
  password: string().required(),
});

export default UserSchema;
