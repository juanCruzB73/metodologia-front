import * as yup from 'yup';
export const formSchema = yup.object().shape({
    name:yup.string()
    .min(3,"you must enter at least three characters")
    .required("name is required")
    ,
    email:yup.string()
    .email("Enter a valid email")
    .required("email is required")
    ,
    password:yup.string()
    .min(6, "You must enter at least 6 characters.")
    .required("Password is Required")
    ,
    confirPassword:yup.string()
    .oneOf([yup.ref('password')], "Passwords must match.")
    .required("confirm password is required.")
    ,
})
