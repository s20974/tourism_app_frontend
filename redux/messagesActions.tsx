import { findChatMessagesAxios, findUserMessagesAxios } from "../api/apiCallUserMessages";

export const sendMessage = (messageData: any) => {
    return {
        type: 'send-message',
        payload: messageData
    };
};

export const sendMessageData = (data: any, message: any) => {
    return async function (dispatch: any) {
        const userData = {
            ...data,
            messages: message
        }
        dispatch(
            sendMessage(userData)
        );
        return userData
    };
};

export const findChatMessages = (data: any, senderId: any, receiverId: any) => {
    return async function (dispatch: any) {
        return findChatMessagesAxios(senderId, receiverId).then((resonse: any) => {
            console.log(resonse.data)
            dispatch(
                sendMessage({
                    ...data,
                    messages: resonse.data
                })
            );
            return resonse
        })
    };
};

export const findUserMessages = (data: any, userId: any) => {
    return async function (dispatch: any) {
        return findUserMessagesAxios(userId).then((resonse: any) => {
            dispatch({
                type: 'set-user-chats',
                payload: {
                    ...data,
                    userChats: resonse.data
                }
            });
            return resonse
        })
    };
};

export const setActiveContact = (data: any, activeContact: any) => {
    return async function (dispatch: any) {
        dispatch({
            type: 'set-active-contact',
            payload: {
                ...data,
                activeContact: activeContact
            }
        });
    };
};
