import { Box, DialogContent, IconButton, Typography } from '@material-ui/core'
import Dialog from '@mui/material/Dialog';
import * as React from 'react'

import styles from './modal-dialog.module.scss'
import { XMarkIcon } from '../FwmIcons/FwmIcons'

interface IModal {
    id: any,
    onClose: any,
    open: any,
    maxWidth?: any,
    headertext?: string,
    children: JSX.Element
}

const FwmModal: React.FC<IModal> = (props: IModal) => {
    return (
        <Dialog
            onClose={props.onClose}
            open={props.open}
            scroll='body'
            className={styles.modal}
            fullWidth
            maxWidth={props.maxWidth ?? '300px'}
        >
            <Box>
                <Typography>{props.headertext}</Typography>
                {props.onClose ? (
                    <>
                        <IconButton
                            onClick={props.onClose}
                        >
                            <XMarkIcon onClose={undefined}/>
                        </IconButton>
                    </>
                ) : null}
            </Box>
            <DialogContent>
                {props.children}
            </DialogContent>
        </Dialog>
    )
}

export default FwmModal