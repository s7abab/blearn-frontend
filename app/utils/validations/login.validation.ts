import * as Yup from "yup";

export const schema = Yup.object().shape({
  email: Yup.string()
    .matches(/^\S*$/, "Email must not contain spaces")
    .email("Invalid Email!")
    .required("Please enter your email!"),
  password: Yup.string()
    .required("Please enter your password!")
    // .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
    .min(6, "Password must be at least 8 characters"),
});
