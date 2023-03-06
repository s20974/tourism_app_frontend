import { yupResolver } from "@hookform/resolvers/yup";
import { InputAdornment } from "@material-ui/core";
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from "next/router";
import * as React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import SignUpWithButtons from './Components/SignUpWithButtons'
import UserProcessingWindow from './Components/UserProcessingWindow'
import styles from './index.module.scss'
import { signup } from "../../../api/apiCallUserProcessing";
import FwmProcessingButton from '../../../components/FwmForms/FwmButtons/ProcessingButton/FwmProcessingButton'
import FwmInputs from '../../../components/FwmForms/FwmInputs/FwmInput'
import { ProcessingValidationSchema } from "../../../components/FwmForms/YupSchemas/ProcessingSignupValidationSchema";
import { PasswordIcon } from "../../../components/FwmIcons/FwmIcons";
import FwmModal from "../../../components/FwmModal/FwmModal";

const Login: NextPage = () => {
    const router = useRouter()

    const [passwordVies, setPasswordView] = React.useState(false)
    const [isModalOpen, setModalOpen] = React.useState(false)
    const [pendingApiCall, setPendingApiCall] = React.useState(false)

    const methods = useForm({
        defaultValues: {
            name: '',
            surname: '',
            email: '',
            password: '',
        },
        resolver: yupResolver(ProcessingValidationSchema),
    })

    const { handleSubmit, formState, reset } = { ...methods }

    const onSubmitHandler = (values: any, event: any) => {
        event.preventDefault()
        setPendingApiCall(true)
        
        signup(values).then(() => {
                setModalOpen(true)
                setPendingApiCall(false)
                reset()
                setTimeout(
                    () => {
                        router.push('/user/login')
                    }, 5000
                )
            }
        ).catch(() => {
            setPendingApiCall(false)
        })
    }

    return (
        <React.Fragment>
            <div className={styles.signupConatinerWrapper}>
                <UserProcessingWindow>
                    <React.Fragment>
                        <div className={styles.signupFormWrapper}>
                            <div className={styles.signupForm}>
                                <div className={styles.signupText}>
                                    <p>Create New Accout.</p>
                                    <span>Already have an account ? <Link href='/account/login'>Log in.</Link></span>
                                </div>
                                <FormProvider {...methods}>
                                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                                        <div className={styles.signUpFields}>
                                            <div className={styles.userNamingWrapper}>
                                                <div className={styles.userNaming}>
                                                    <FwmInputs
                                                        id='name'
                                                        label='First name.'
                                                        error={formState.errors.name}
                                                    />
                                                </div>
                                                <div className={styles.userNaming}>
                                                    <FwmInputs
                                                        id='surname'
                                                        label='Last name.'
                                                        error={formState.errors.surname}
                                                    />
                                                </div>
                                            </div>

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
                                                            <InputAdornment style={{zIndex: 1}} position="end">
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
                                                isApiCall={pendingApiCall} 
                                                text='Create Account' />
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

            <FwmModal
                id='email-sended'
                onClose={() => setModalOpen(false)}
                open={isModalOpen}
                headertext='Email Was Sended.'
                maxWidth='sm'
            >
                <React.Fragment>
                    <div className={styles.emailVerifyContent}>
                        <p>Please cheack your email address to </p>
                        <p>activate your account.</p>
                    </div>
                </React.Fragment>
            </FwmModal>
        </React.Fragment>
    )
}

export default Login