import { yupResolver } from "@hookform/resolvers/yup";
import { InputAdornment } from "@material-ui/core";
import { NextPage } from 'next'
import Link from 'next/link'
//import { useRouter } from "next/router";
import * as React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { connect } from 'react-redux'

import UserProcessingWindow from './Components/UserProcessingWindow'
import styles from './index.module.scss'
import SignUpWithButtons from '../signup/Components/SignUpWithButtons'
import FwmAlert from "../../../components/FwmForms/FwmAlerts/FwmAlert";
import FwmProcessingButton from '../../../components/FwmForms/FwmButtons/ProcessingButton/FwmProcessingButton'
import FwmInputs from '../../../components/FwmForms/FwmInputs/FwmInput'
import { ProcessingValidationSchema } from "../../../components/FwmForms/YupSchemas/ProcessingLoginValidationSchema";
import { PasswordIcon } from "../../../components/FwmIcons/FwmIcons";
import * as authActions from "../../../redux/authActions";

const Login: NextPage = (props: any) => {
    //const router = useRouter()

    const [passwordVies, setPasswordView] = React.useState(false)
    const [pendingApiCall, setPendingApiCall] = React.useState(false)
    const [apiError, setApiError] = React.useState<any>(null)

    const methods = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(ProcessingValidationSchema),
    })

    const { handleSubmit, formState } = { ...methods }

    const onSubmitHandler = (values: any, event: any) => {
        event.preventDefault()
        setPendingApiCall(true);
    
        props.actions.postLogin(values)
            .then((res: any) => {
                setPendingApiCall(false);
                props.actions.getUserData(values.email, res.data.jwt, res.data.roleSet).then(() => {
                    //router.push('/profile')
                    location.replace('/profile')
                })
            })
            .catch((apiError: any) => {
                if(apiError.response.data.validationErrors){
                    setApiError(() => {
                        return {
                            message: apiError.response.data.validationErrors
                        };
                    });
                } else if(apiError.response.data){
                    setApiError(() => {
                        return {
                          message: apiError.response.data.message
                        };
                    });
                }   
                setPendingApiCall(false);
            });
    }

    return (
        <React.Fragment>
            <FwmAlert message={apiError?.message} onCloseAlert={() => setApiError(null)}/>
            <div className={styles.loginConatinerWrapper}>
                <UserProcessingWindow>
                    <React.Fragment>
                        <div className={styles.loginFormWrapper}>
                            <div className={styles.loginForm}>
                                <div className={styles.loginText}>
                                    <p>LogIn To Your Account</p>
                                    <span>Dont have an account ? <Link href='/account/signup'>Sign up.</Link></span>
                                </div>
                                <FormProvider {...methods}>
                                    <form onSubmit={handleSubmit(onSubmitHandler)} onChange={() => setApiError(null)}>
                                        <div className={styles.logInFields}>
                                            <FwmInputs
                                                id='email'
                                                label='Email.'
                                                error={formState.errors.email}
                                            />
                                            <FwmInputs
                                                id='password'
                                                type={!passwordVies ? 'password' : 'text'}
                                                label='Password.'
                                                error={formState.errors.password}
                                                inputProps={
                                                    {
                                                        endAdornment: (
                                                            <InputAdornment style={{ zIndex: 1 }} position="end">
                                                                <PasswordIcon
                                                                    setPasswordVisibility={setPasswordView}
                                                                    isPasswordVisible={passwordVies}
                                                                />
                                                            </InputAdornment>
                                                        )
                                                    }
                                                }
                                            />
                                        </div>

                                        <div className={styles.processButton}>
                                            <FwmProcessingButton 
                                                text="Let's travel" 
                                                isApiCall={pendingApiCall} 
                                            />
                                        </div>
                                    </form>
                                </FormProvider>

                                <div className={styles.brandsProcessingButtons}>
                                    <SignUpWithButtons />
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                </UserProcessingWindow>
            </div>
        </React.Fragment>
    )
}

const mapDispatchToProps= (dispatch: any) => {
    return {
        actions: {
            postLogin: (body: any) => dispatch(authActions.loginHandler(body)),
            getUserData: (email: any, jwt: any, role: any) => dispatch(authActions.getUserData(email, jwt, role)),
        }
    };
};

export default connect(null, mapDispatchToProps)(Login)