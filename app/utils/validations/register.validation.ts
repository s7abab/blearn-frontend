import * as Yup from "yup";

export const schema = Yup.object().shape({
  name: Yup.string()
    .matches(/^\S*$/, "Name must not contain spaces")
    .required("Please enter your name!"),
  email: Yup.string()
    .matches(/^\S*$/, "Email must not contain spaces")
    .email("Invalid Email!")
    .required("Please enter your email!"),
  password: Yup.string()
    .required("Please enter your password!")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Password requires at least one uppercase, one lowercase, one number, and one special character"
    )
    .min(8, "Password must be at least 8 characters"),
  confirmpassword: Yup.string()
    .required("Please confirm your password!")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
