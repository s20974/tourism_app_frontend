import { Button } from '@material-ui/core';
import * as React from 'react'
import { FormProvider, useForm } from "react-hook-form";
import { connect } from 'react-redux';

import styles from './messages-container.module.scss'
import FwmMessage from '../FwmMessage/FwmMessage'
import FwmInputs from '../../FwmForms/FwmInputs/FwmInput'
import { SendIcon } from '../../FwmIcons/FwmIcons'

interface IMessage {
    user?: any,
    onMessageSubmit: any
}

const FwmMessagesContainer: React.FC<IMessage> = (props: IMessage) => {
    const methods = useForm();
    const { handleSubmit, reset } = methods

    const onMessageSubmit = (values: any, event: any) => {
        event.preventDefault()

        props.onMessageSubmit(values.message)

        reset()
    }

    return (
        <>
            <div className={styles.messagesContainerWrapper}>

                <div className={styles.messageContainer}>
                    {
                        Object.keys(props.user.messages).map(function (msg: any, id: any) {
                            return (
                                <React.Fragment key={id}>
                                    <FwmMessage sender={props.user.messages[msg].senderId == props.user.id} user={{
                                        id: props.user.messages[msg].senderId,
                                        name: props.user.name,
                                        mainPhotoUrl: props.user.messages[msg].senderId == props.user.id ? props.user.mainPhotoUrl : props.user.activeContact.data.mainPhotoUrl
                                    }}
                                        message={props.user.messages[msg].content} />
                                </React.Fragment>
                            )
                        })
                    }

                </div>

                <div className={styles.messagesButtonsWrapper}>
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onMessageSubmit)}>
                            <div className={styles.inputWrapper}>
                                <FwmInputs label='message' id='message' />
                            </div>
                            <div className={styles.sendButton}>
                                <Button type='submit'>
                                    <SendIcon />
                                </Button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </>
    )
}


const mapStateToProps = (state: any) => {
    return {
        user: state
    };
};


export default connect(mapStateToProps)(FwmMessagesContainer)