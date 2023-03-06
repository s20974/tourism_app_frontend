import * as yup from "yup";

export const UserPostValidationSchema = yup.object().shape({
        header: yup
                .string()
                .required('Email is reqired'),
        description: yup
                .string()
                .required('Description is reqired'),
});
