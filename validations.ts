import * as Yup from "yup";

export const CreateUserValidation = Yup.object({
  firstName: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  lastName: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
      "Password must be at least 8 characters long and contain 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character"
    ),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password")],
    "Passwords do not match"
  ),
  username: Yup.string()
    .min(10, "Must be at least 10 characters")
    .required("Required"),
});
