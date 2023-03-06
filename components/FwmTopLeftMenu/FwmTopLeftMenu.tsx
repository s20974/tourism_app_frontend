import { yupResolver } from '@hookform/resolvers/yup'
import { FormControl, InputAdornment, InputLabel, MenuItem, Select, Typography } from '@material-ui/core'
import Link from 'next/link'
import * as React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { connect } from 'react-redux'

import styles from './top-left-menu.module.scss'
import FwmAlert from '../FwmForms/FwmAlerts/FwmAlert'
import FwmProcessingButton from '../FwmForms/FwmButtons/ProcessingButton/FwmProcessingButton'
import FwmInputs from '../FwmForms/FwmInputs/FwmInput'
import FwmLocationField from '../FwmForms/FwmLocationField/FwmLocationField'
import { LocationIcon, NotificationIcon, PasswordIcon, SettingsIcon } from '../FwmIcons/FwmIcons'
import FwmModal from '../FwmModal/FwmModal'
import { updateData } from '../../api/apiCallsUserData'
import { UserEditProfileValidationSchema } from "../../components/FwmForms/YupSchemas/UserEditProfileValidationSchema"

const FwmTopLeftMenu: React.FC = (props: any) => {
    const [isModalSettingsVisible, setModalSettingsVisible] = React.useState<boolean>(false)
    const [isModalEditProfileVisible, setModalEditProfileVisible] = React.useState<boolean>(false)
    const [activeButton, setActiveButton] = React.useState<any>('main')
    const [pendingApiCall, setPendingApiCall] = React.useState(false)
    const [apiError, setApiError] = React.useState<any>(null)
    const [isModalEmailOpen, setModalEmailOpen] = React.useState<any>(null)

    const [isOldPasswordVisible, setOldPasswordVisible] = React.useState<any>(false)
    const [isNewPasswordVisible, setNewPasswordVisible] = React.useState<any>(false)

    const [country, setCountry] = React.useState<any>(props.user.country ?? '')

    const [gender, setGender] = React.useState<any>(props.user.gender ?? '')
    const [status, setStatus] = React.useState<any>(props.user.status ?? '')

    const methods = useForm({
        defaultValues: {
            name: props.user.name,
            surname: props.user.surname,
            email: props.user.email,
            phone: props.user.phone ?? '',
            oldPassword: '',
            newPassword: ''
        },
        resolver: yupResolver(UserEditProfileValidationSchema),
    })

    const { handleSubmit, formState, reset } = { ...methods }

    // const handleNoticiationChange = (event: any, value: any) => {
    //     props.dispatch({
    //         type: 'change-notification',
    //         payload: { value: value },
    //     })
    // }

    const handleGenderChange = (event: any) => {
        setGender(event.target.value)
        console.log(props.user)
    };

    const handleStatusChange = (event: any) => {
        setStatus(event.target.value)
    };

    const LoadPart = (): JSX.Element => {
        if (activeButton == 'main') {
            return (
                <>
                    <div className={styles.formInputs}>
                        <FwmInputs
                            id='name'
                            label='Name.'
                            error={formState.errors.name}
                        />
                        <FwmInputs
                            id='surname'
                            label='Surname.'
                            error={formState.errors.surname}
                        />
                        <FwmInputs
                            id='email'
                            label='Email.'
                            error={formState.errors.email}
                        />
                        <div className={styles.select}>
                            <FormControl>
                                <InputLabel id="country-label">Gender</InputLabel>
                                <Select
                                    className={styles.MuiSelectRoot}
                                    labelId="country-label"
                                    id="country"
                                    name="country"
                                    value={gender || ""}
                                    label="Country"
                                    onChange={handleGenderChange}
                                    error={!!props.error}
                                    disableUnderline
                                    ref={props.ref}
                                >
                                    <MenuItem value="" className={styles.MuiSelectRoot}>
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem key='MA' value='MALE'>Male</MenuItem>
                                    <MenuItem key='FE' value='FEMALE'>Female</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className={styles.select}>
                            <FormControl>
                                <InputLabel id="country-label">Status</InputLabel>
                                <Select
                                    className={styles.MuiSelectRoot}
                                    labelId="country-label"
                                    id="country"
                                    name="country"
                                    value={status || ""}
                                    label="Country"
                                    onChange={handleStatusChange}
                                    error={!!props.error}
                                    disableUnderline
                                    ref={props.ref}
                                >
                                    <MenuItem value="" className={styles.MuiSelectRoot}>
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem key='LF' value='LOOKING_FOR'>Looking for</MenuItem>
                                    <MenuItem key='FO' value='FOUND'>Found</MenuItem>
                                    <MenuItem key='NW' value='NO_WANTING'>No Waiting</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </>
            )
        } else if (activeButton == 'location') {
            return (
                <>
                    <div className={styles.formInputs}>
                        <FwmInputs
                            id='phone'
                            label='Phone.'
                            error={formState.errors.phone}
                        />
                        <FwmLocationField
                            setForm={setCountry}
                            error={''}
                            value={country}
                        />
                    </div>
                </>
            )

        } else {
            return (
                <>
                    <div className={styles.formInputs}>
                        <FwmInputs
                            id='oldPassword'
                            type={!isOldPasswordVisible ? 'password' : 'text'}
                            label='Old Password.'
                            error={formState.errors.oldPassword}
                            inputProps={
                                {
                                    endAdornment: (
                                        <InputAdornment style={{ zIndex: 1 }} position="end">
                                            <PasswordIcon
                                                setPasswordVisibility={setOldPasswordVisible}
                                                isPasswordVisible={isOldPasswordVisible}
                                            />
                                        </InputAdornment>
                                    )
                                }
                            }
                        />
                        <FwmInputs
                            id='newPassword'
                            type={!isNewPasswordVisible ? 'password' : 'text'}
                            label='New Password.'
                            error={formState.errors.newPassword}
                            inputProps={
                                {
                                    endAdornment: (
                                        <InputAdornment style={{ zIndex: 1 }} position="end">
                                            <PasswordIcon
                                                setPasswordVisibility={setNewPasswordVisible}
                                                isPasswordVisible={isNewPasswordVisible}
                                            />
                                        </InputAdornment>
                                    )
                                }
                            }
                        />
                    </div>
                </>
            )
        }
    }

    const onFormSubmit = (values: any, event: any) => {
        event.preventDefault()
        setPendingApiCall(true)

        const user: {
            name: any,
            surname: any,
            email: any,
            phoneNumber: any,
            country: any,
            status: any,
            gender: any,
            password?: '',
            oldPassword?: any
        } = {
            name: values.name,
            surname: values.surname,
            email: values.email,
            phoneNumber: values.phone,
            status: status,
            gender: gender ?? null,
            country: country ?? null,
        }

        if (values.oldPassword !== "" && values.newPassword !== "") {
            user.password = values.newPassword
            user.oldPassword = values.oldPassword
        }

        updateData(props.user.email, user).then((response: any) => {
            setPendingApiCall(false);
            if (user.email !== props.user.email) {

                setTimeout(() => {
                    setModalEmailOpen(true)
                }, 5000)
            }
            props.dispatch({
                type: 'update-user-data',
                payload: response.data,
            })

            setModalEditProfileVisible(false)
            reset()
        }).catch((errors: any) => {
            setPendingApiCall(false);
            if (errors.response?.data?.message === "Incorrect old password") {
                setApiError((previousErrors: any) => {
                    return {
                        ...previousErrors,
                        message: errors.response.data.message
                    };
                });
            }
        })
    }


    return (
        <React.Fragment>
            <FwmAlert message={apiError?.message} onCloseAlert={() => setApiError(null)}/>
            <div className={styles.topLeftMenuWrapper}>
                <div className={styles.infoBlockWrapper}>
                    <div className={styles.locationWrapper}>
                        <div className={styles.location}>
                            {
                                props.user?.country && (<><LocationIcon /><Typography> {props.user.country}</Typography></>)
                            }
                        </div>
                    </div>
                    <div className={styles.buttonsWrapper}>
                        <div className={styles.button} onClick={() => setModalSettingsVisible(true)}>
                            <SettingsIcon />
                        </div>
                        <div className={styles.button}>
                            <NotificationIcon />
                        </div>
                        <Link href='/profile'>
                            <div className={styles.profile} style={props.user.mainPhotoUrl && { backgroundImage: `url(${props.user.mainPhotoUrl})` }}>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <FwmModal
                id="setting"
                open={isModalSettingsVisible}
                onClose={() => { setModalSettingsVisible(false) }}
                maxWidth={'sm'}
                headertext='Settings'
            >
                <React.Fragment>
                    {/* <FormControlLabel
                        value="start"
                        control={<Switch color="primary" />}
                        label="Notification Sound"
                        labelPlacement="start"
                        onChange={handleNoticiationChange}
                    /> */}
                    <FwmProcessingButton text="Edit profile" onClick={() => { setModalEditProfileVisible(true) }} />
                </React.Fragment>
            </FwmModal>
            <FwmAlert message={apiError?.message} onCloseAlert={() => setApiError(null)} />
            <FwmModal
                id="edit"
                open={isModalEditProfileVisible}
                onClose={() => { setModalEditProfileVisible(false); reset() }}
                maxWidth={'md'}
                headertext='Edit Profile'
            >
                <React.Fragment>
                    <div className={styles.userButtonsWrapper}>
                        <div className={styles.userButtonsList}>
                            <div className={styles.button} onClick={() => setActiveButton('main')}>
                                <Typography>Main Info.</Typography>
                                <div className={`${styles.bottomLine} ${activeButton === 'main' ? styles.active : ''}`}></div>
                            </div>
                            <div className={styles.button} onClick={() => setActiveButton('location')}>
                                <Typography>Location.</Typography>
                                <div className={`${styles.bottomLine} ${activeButton === 'location' ? styles.active : ''}`}></div>
                            </div>
                            <div className={styles.button} onClick={() => setActiveButton('credentials')}>
                                <Typography>Credentials.</Typography>
                                <div className={`${styles.bottomLine} ${activeButton === 'credentials' ? styles.active : ''}`}></div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.formWrapper}>
                        <FormProvider {...methods}>
                            <form onSubmit={handleSubmit(onFormSubmit)}>
                                <LoadPart />
                                <FwmProcessingButton text='Update' isApiCall={pendingApiCall} />
                            </form>
                        </FormProvider>
                    </div>
                </React.Fragment>
            </FwmModal>

            <FwmModal
                id='email-sended'
                onClose={() => setModalEmailOpen(false)}
                open={isModalEmailOpen}
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

const mapStateToProps = (state: any) => {
    return {
        user: state,
    };
};

export default connect(mapStateToProps)(FwmTopLeftMenu)