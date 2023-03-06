import { Avatar } from "@material-ui/core";
import * as React from "react";

import styles from './message.module.scss'

interface IMessage {
    sender: any,
    user: {
        id: any,
        name: any,
        mainPhotoUrl: any,
    },
    message: any
}

const FwmMessage: React.FC<IMessage> = (props: IMessage) => {
    return (
        <>
            <div className={`${styles.rowMessageStyle} ${props.sender ? styles.sender : ''}` }>
                <Avatar alt={props.user.name} src={props.user.mainPhotoUrl} 
                        className={`${styles.avatar} ${props.sender === true ? styles.sender : ''}`} 
                        />

                <div className={styles.message}>
                        {props.message}
                </div>
            </div>
        </>
    )
}

export default FwmMessage