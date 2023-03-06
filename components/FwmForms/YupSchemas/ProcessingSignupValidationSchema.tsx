import * as yup from "yup";

export const ProcessingValidationSchema = yup.object().shape({
    email: yup
            .string()
            .required('Email is reqired')
            .email('Email is not valid'),
    password: yup
            .string()
            .required('Password is reqired')
            .matches(/^.*(?=..*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^\-&+=]).*$/i, 'Password incorrect')
            .min(8, 'Min 8 and max 50 chacarcters')
            .max(32, 'Min 8 and max 50 chacarcters'),
    name: yup  
            .string()
            .required('Name is reqired')
            .min(3, 'Min 3 chacarcters')
            .max(50, 'Max 50 chacarcters'),
    surname: yup  
            .string()
            .required('Last name is reqired')
            .min(3, 'Min 3 chacarcters')
            .max(50, 'Max 50 chacarcters')
});
