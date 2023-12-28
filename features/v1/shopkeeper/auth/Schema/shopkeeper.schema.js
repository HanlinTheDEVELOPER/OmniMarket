import { object, string } from "yup";

const shopkeeperSchema = object({
  name: string("Must be a string").required(),
  email: string().email("Enter a valid Email").required(),
  password: string().required(),
});

export default shopkeeperSchema;
