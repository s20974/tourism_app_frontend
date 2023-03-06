import { Typography } from '@material-ui/core'
import * as React from 'react'

import styles from './user-header-info.module.scss'
import FwmFriendButtons from '../../FwmForms/FwmButtons/FriendButtons/FwmFriendButtons'
import { LocationIcon } from '../../FwmIcons/FwmIcons'


function readFile(file: any) {
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => resolve(reader.result), false)
        reader.readAsDataURL(file)
    })
}

interface IUserHeader {
    id?: any,
    user: any,
    profile?: any,
    setImageSrc?: any,
    setModalAddImageVisible?: any,
    setUser?: any
}

const FwmUserHeaderInfo: React.FC<IUserHeader> = (props: IUserHeader) => {
    const isUserProfile: any = props.profile === 'user_profile' ? true : false

    const onFileSelect = async (event: any) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0]
            const imageDataUrl = await readFile(file)
            props.setImageSrc(imageDataUrl)
        }

        props.setModalAddImageVisible(true)
    }

    const fileRef = React.useRef<any>();

    return (
        <>
            <div className={styles.userHeaderContainer}>
                <div className={styles.userHeaderWrapper}>
                    <div className={styles.profileInfoWrapper}>
                        <div className={styles.profileInfo}>
                            <div className={styles.profileImage} style={props.user.avatar && { backgroundImage: `url(${props.user.avatar})` }}>
                                {isUserProfile === true &&
                                    <React.Fragment>
                                        <div className={styles.imageUploading} onClick={() => fileRef?.current.click()}>
                                            <i className="fa-solid fa-plus"></i>
                                        </div>
                                        <input
                                            ref={fileRef}
                                            onChange={onFileSelect}
                                            multiple={true}
                                            type="file"
                                            hidden
                                        />
                                    </React.Fragment>
                                }
                            </div>
                            <div className={styles.profile}>
                                <div className={styles.name}>
                                    <Typography>{props.user?.name ?? ''} {props.user?.surname ?? ''}.</Typography>
                                </div>

                                <div className={styles.description}>
                                    <Typography>{props.user?.description ?? ''}</Typography>
                                </div>
                                <div className={styles.location}>
                                    {
                                        props.user?.location && (<><LocationIcon /><Typography> {props.user.location}</Typography></>)
                                    }
                                </div>
                                {                     
                                    <React.Fragment>
                                        <div className={styles.friendButtons}>
                                            <FwmFriendButtons userId={props.id} friendData={props.user} setFriendData={props.setUser}/>
                                        </div>
                                    </React.Fragment>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={styles.backgroundImage}>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FwmUserHeaderInfo