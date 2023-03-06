import { Avatar, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'
import * as React from 'react'

import styles from './message-info.module.scss'

interface IMessage {
    sender: any,
    text: any,
    time: any,
    avatar: any,
    id: any
}

const FwmMessageInfo: React.FC<IMessage> = (props: IMessage) => {
    const {push} = useRouter()
    return (
        <>
            <div className={styles.messageWrapper} onClick={() => {push(`/messages?id=${props.id}`)}}>
                <div className={styles.messageAvatar}>
                    <Avatar src={props.avatar}/>
                </div>
                <div className={styles.messageInfo}>
                    <div className={styles.messageHeader}>
                        <Typography>{props.sender}</Typography>
                    </div>
                    <div className={styles.messageTextWrapper}>
                        <div className={styles.messageText}>
                            <Typography >{props.text}</Typography>
                        </div>
                        <div className={styles.messageTime}>
                            <Typography >At {new Date(props.time).toLocaleDateString()}</Typography>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FwmMessageInfo