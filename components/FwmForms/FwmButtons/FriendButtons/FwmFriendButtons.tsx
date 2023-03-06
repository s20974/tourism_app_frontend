import { useRouter } from 'next/router';
import * as React from "react"

import FwmProcessingButton from "../ProcessingButton/FwmProcessingButton";
import { addFriendRequest, addUserToFriends, deleteUserFriend } from "../../../../api/apiCallUserFriends";
import { PlusIcon, UserSlashIcon, WaitingIcon } from "../../../FwmIcons/FwmIcons";

interface IFriend {
    userId: any,
    friendData: any,
    setFriendData: any,
}

const FriendsButtons: React.FC<IFriend> = (props: IFriend) => {
    const router = useRouter()
    const sendAddFriendRequest = () => {
        addFriendRequest(props.userId, props.friendData.id)
            .then(
                props.setFriendData({ ...props.friendData, action: 'pending_friend_approval' })
            )
    }

    const onClickAddFriend = () => {
        addUserToFriends(props.userId, props.friendData.id)
            .then(
                props.setFriendData({ ...props.friendData, action: 'accepted' })
            )
    }

    const onClickDeleteFriend = () => {
        deleteUserFriend(props.userId, props.friendData.id)
            .then(
                props.setFriendData({ ...props.friendData, action: 'not_friend' })
            )
    }

    return (
        <>
            {props.friendData.action === 'not_friend' && (
                <FwmProcessingButton
                    text={<PlusIcon />}
                    isApiCall={false}
                    onClick={sendAddFriendRequest}
                />
            )}

            {props.friendData.action === 'pending_your_approval' && (
                <>
                    <FwmProcessingButton
                        text='Add'
                        isApiCall={false}
                        onClick={onClickAddFriend}
                    />
                    <FwmProcessingButton
                        text={<UserSlashIcon />}
                        isApiCall={false}
                        onClick={onClickDeleteFriend}
                    />
                </>
            )}

            {props.friendData.action === 'pending_friend_approval' && (
                <FwmProcessingButton
                    text={<WaitingIcon />}
                    isApiCall={false}
                    onClick={onClickDeleteFriend}
                />
            )}

            {props.friendData.action === 'accepted' && (
                <>
                    <FwmProcessingButton
                        text='Message'
                        isApiCall={false}
                        onClick={() => router.push(`/messages?id=${props.friendData.id}`)}
                    />
                    <FwmProcessingButton
                        text={<UserSlashIcon />}
                        isApiCall={false}
                        onClick={onClickDeleteFriend}
                    />
                </>
            )}
        </>
    )
}


export default FriendsButtons