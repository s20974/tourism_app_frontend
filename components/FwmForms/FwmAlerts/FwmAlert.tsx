import { Box, Snackbar, Typography } from "@material-ui/core";
import { Alert } from "@mui/material";
import * as React from 'react'

import styles from './alert.module.scss'

interface IAlert {
    message: any,
    onCloseAlert: any,
}

const FwmAlert: React.FC<IAlert> = (props: IAlert) => {
    return (
        <div className={styles.notificationMessage}>
            <Snackbar open={props.message ? true : false} autoHideDuration={5000} onClose={() => props.onCloseAlert()}>
                <Alert severity="warning" onClose={() => props.onCloseAlert()} icon={false} sx={{ width: '100%', cursor: 'pointer'}} >
                    <Box>
                        <Typography>{props.message}</Typography>
                    </Box>
                </Alert>
            </Snackbar>
        </div>
    )
}

export default FwmAlert