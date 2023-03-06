import { Avatar, Box, Snackbar, Typography } from "@material-ui/core";
import { Alert } from "@mui/material"
import { useRouter } from "next/router"
import React from "react"

import styles from './notification.module.scss'

interface INotification {
    notification: any,
    onCloseNotification: any
}

const FwmNotification: React.FC<INotification> = (props: INotification) => {
    const router = useRouter()

    if (props.notification) {
        return (
            <>
                <div className={styles.notificationMessage}>
                    <Snackbar open={props.notification !== undefined} autoHideDuration={5000} onClose={() => props.onCloseNotification()}>
                        <Alert onClose={() => props.onCloseNotification()} severity="success" icon={false} sx={{ width: '100%', cursor: 'pointer' }}
                            onClick={() => { router.push(`/messages?id=${props.notification.id}`); props.onCloseNotification()}}>

                        <Avatar alt={props.notification.name} src={props.notification.profileImage}></Avatar>
                        <Box>
                            <React.Fragment>
                                <Typography className={styles.userNameTypography}>{props.notification.name} {props.notification.surname}</Typography>
                                <Typography>{props.notification.notificationMessage}</Typography>
                            </React.Fragment>
                        </Box>
                    </Alert>
                </Snackbar>
            </div>
            </>
        )
    }   else {
        return (<></>)
    }
}

export default FwmNotification