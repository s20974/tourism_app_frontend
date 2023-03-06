import * as yup from "yup";

export const UserEditProfileValidationSchema = yup.object().shape({
        name: yup
                .string()
                .required('Name is reqired')
                .min(3, 'Min 3 chacarcters')
                .max(50, 'Max 50 chacarcters'),
        surname: yup
                .string()
                .required('Last name is reqired')
                .min(3, 'Min 3 chacarcters')
                .max(50, 'Max 50 chacarcters'),
        email: yup
                .string()
                .required('Email is reqired')
                .email('Email is not valid'),
        phone: yup
                .string()
                .matches(/^(|[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6})$/, 'Invalid phone number format'),
        oldPassword: yup
                .string()
                .matches(/^(|.*(?=..*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^\-&+=]).*)$/, 'Invalid password format'),
        newPassword: yup
                .string()
                .when('oldPassword', {
                        is: true,
                        then: yup.string()
                                .matches(/^(|.*(?=..*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^\-&+=]).*)$/, 'Invalid password format'),
                })
                
});
