import { Typography } from "@material-ui/core"
import { useRouter } from 'next/router';
import * as React from 'react'
import { connect } from "react-redux";

import { getFriendData } from "../api/apiCallUserFriends";
import FwmLeftMenu from "../components/FwmLeftMenu/FwmLeftMenu";
import FwmMessageInfo from "../components/FwmMessages/FwmMessageInfo/FwmMessageInfo";
import FwmMessagesContainer from "../components/FwmMessages/FwmMessagesContainer/FwmMessagesContainer";
import FwmTopLeftMenu from "../components/FwmTopLeftMenu/FwmTopLeftMenu";
import { findChatMessages, findUserMessages, sendMessageData, setActiveContact } from "../redux/messagesActions";
// import { store } from "../redux/configurStore";
import styles from '../styles/messages.module.scss'

interface IMessage {
    stompClient?: any,
    user?: any,
    dispatch?: any,
    actions?: any,
}

const Messages: React.FC<IMessage> = (props: IMessage) => {
    const router = useRouter()
    const { id } = router.query

    React.useEffect(() => {
        props.actions.findUserMessages(props.user, props.user.id)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        if (id) {
            getFriendData(props.user.id, id)
                .then((res: any) => {
                    if(res.data) {
                        props.actions.setActiveContact(props.user, {
                            data: res.data,
                            isActive: true
                        })
                    }
                })

            props.actions.findChatMessages(props.user, props.user.id, id)

            return () => {
                props.actions.setActiveContact(props.user, {
                    data: props.user.activeContact,
                    isActive: false
                })
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const sendMessage = (msg: any) => {
        if (msg.trim() !== "") {
            const message = {
                senderId: props.user.id,
                recipientId: props.user.activeContact.data.id,
                content: msg,
                timestamp: new Date(),
            };

            if (props.stompClient) {
                props.stompClient.send("/app/chat", {}, JSON.stringify(message));

                const newMessages = props.user.messages;
                newMessages.push(message);
                props.actions.sendMessageData(props.user, newMessages)
            }
        }
    };

    return (
        <>
            <FwmLeftMenu current='messages' />
            <FwmTopLeftMenu />

            <div className={styles.messagesContainerWrapper}>
                <Typography>
                    Messages.
                </Typography>

                <div className={styles.messagesContainer}>
                    <div className={styles.messagesList}>
                        {
                            props.user.userChats.map((value: any) => {
                                return (
                                    <React.Fragment key={value.sender}>
                                        <FwmMessageInfo
                                            sender={`${value.recipientName} ${value.recipientSurname}`}
                                            avatar={value.recipientMainPhoto}
                                            id={value.userId}
                                            text={value.content}
                                            time={value.timestamp}
                                        />
                                    </React.Fragment>
                                )
                            })
                        }
                    </div>
                    <div className={styles.messagesBlock}>
                        {
                            id && <FwmMessagesContainer
                                onMessageSubmit={sendMessage}
                            />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state: any) => {
    return {
        user: state,
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        actions: {
            sendMessageData: (data: any, message: any) => dispatch(sendMessageData(data, message)),
            findChatMessages: (data: any, senderId: any, receiverId: any) => dispatch(findChatMessages(data, senderId, receiverId)),
            findUserMessages: (data: any, userId: any) => dispatch(findUserMessages(data, userId)),
            setActiveContact: (data: any, activeContact: any) => dispatch(setActiveContact(data, activeContact))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Messages)