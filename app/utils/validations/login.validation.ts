import * as Yup from "yup";

export const schema = Yup.object().shape({
  email: Yup.string()
    .matches(/^\S*$/, "Email must not contain spaces")
    .email("Invalid Email!")
    .required("Please enter your email!"),
  password: Yup.string()
    .required("Please enter your password!")
    .matches(/^\S*$/, "Password must not contain spaces")
    .min(6, "Password must be at least 6 characters"),
});
