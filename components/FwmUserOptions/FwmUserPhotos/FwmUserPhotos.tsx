import { Button, Fade, Menu, MenuItem, Typography } from '@material-ui/core'
import * as React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import styles from './user-photos.module.scss'
import FwmInputs from '../../FwmForms/FwmInputs/FwmInput'
import { ImageSlashIcon, SendIcon } from '../../FwmIcons/FwmIcons'
import FwmModal from '../../FwmModal/FwmModal'
import { addComment, addLike, deletePhotoById, getPhotoDataById } from '../../../api/aliCallUserPhotos'
import { complaintPhoto } from '../../../api/apiCallComplaint'

interface IGalery {
    userGallery: any,
    isAuthor?: any,
    updatePhotosList?: any
    user: any,
    currentUserId?: any
}

const FwmUserPhotos: React.FC<IGalery> = (props: IGalery) => {
    const methods = useForm()

    const { handleSubmit, reset } = { ...methods }

    const [showPhotoModal, setShowPhotoModal] = React.useState<any>(null)

    const [photoData, setPhotoData] = React.useState<any>()

    const onPhotoModalOpen = (id: any, url: any) => {
        getPhotoDataById(id).then((res: any) => {
            setPhotoData({
                comments: res.data.commentDtos,
                likes: res.data.likes,
                url: url,
                id: res.data.id
            })
        })
        setShowPhotoModal(id)
    }

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteClick = (id: any) => {
        deletePhotoById(id)
        setShowPhotoModal(false)
        if(props.updatePhotosList) {
            props.updatePhotosList()
        }  
    }

    const onSubmitComment = React.useCallback((values: any, event: any) => {
        event.preventDefault()
        addComment({
            id: photoData.id,
            content: values.comment,
            authorName: props.user.name,
            authorSurname: props.user.surname,
        }).then(() => {
            onPhotoModalOpen(photoData.id, photoData.url)
        }).catch((err: any) => {
            console.log(err)
        })
        reset()
    }, [photoData, props.user.name, props.user.surname, reset])

    const addLikeToPhoto = (photoId: any) => {
        addLike(photoId, props.user.id)
            .then(() => {
                onPhotoModalOpen(photoData.id, photoData.url)
            })
    }

    return (
        <React.Fragment>
            <div className={styles.userPhotosWrapper}>
                <div className={styles.userPhotosList}>
                    {
                        props.userGallery && props.userGallery.length !== 0 ? (
                            props.userGallery.map((value: any) => {
                                return (
                                    <div className={styles.photo} style={{ backgroundImage: `url(${value.url ?? value.photoUrl})` }} key={value.id}
                                        onClick={() => onPhotoModalOpen(value.id ?? value.photoId, value.url ?? value.photoUrl)}>
                                        <div className={styles.photoInfo}>
                                            <div className={styles.bottomIcons}>
                                                <div className={styles.iconInfo}>
                                                    <i className="fa-solid fa-heart"></i>
                                                    <span>{value.likes}</span>
                                                </div>
                                                <div className={styles.iconInfo}>
                                                    <i className="fa-solid fa-comment"></i>
                                                    <span>{value.comments}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className={styles.withoutPhoto}>
                                <ImageSlashIcon />
                                No photos yet
                            </div>
                        )
                    }
                </div>
            </div>
            <FwmModal
                id="add-user-photo"
                open={showPhotoModal != null}
                onClose={() => {setShowPhotoModal(null); props.updatePhotosList && props.updatePhotosList()}}
                maxWidth={'md'}
                headertext='Photo below'
            >
                <React.Fragment>
                    <div className={styles.photoModalWrapper}>
                        <div className={styles.userProfilePhoto} style={{ backgroundImage: `url(${photoData?.url})` }}>
                            <div className={styles.likeButton}>
                                <i className="fa-solid fa-heart" onClick={() => addLikeToPhoto(photoData?.id)}></i>
                                <span>{photoData?.likes}</span>
                            </div>
                        </div>
                        <div className={styles.photoCommentsLikes}>
                            <div className={styles.photoData}>
                                <Button
                                    id="fade-button"
                                    aria-controls={open ? 'fade-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    <i className="fa-solid fa-ellipsis-vertical"></i>
                                </Button>
                                <Menu
                                    id="fade-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'fade-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                >
                                    <MenuItem onClick={() => {complaintPhoto(photoData?.id); handleClose()}}>Report</MenuItem>
                                    {props.isAuthor && <MenuItem onClick={() => handleDeleteClick(photoData?.id)}>Delete</MenuItem>}
                                </Menu>
                            </div>
                            <div className={styles.photoCommentsBlock}>
                                {photoData?.comments && photoData.comments.map((value: any) => {
                                    return (
                                        <>
                                            <div className={styles.commentWrapper}>
                                                <Typography className={styles.name}>{value.authorName}{value.authorSurname}</Typography>
                                                <Typography>{value.content}</Typography>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                            <div className={styles.sendCommentSetLikeContainer}>
                                <FormProvider {...methods}>
                                    <form onSubmit={handleSubmit(onSubmitComment)}>
                                        <div className={styles.inputWrapper}>
                                            <FwmInputs
                                                id='comment'
                                                label="Comment."
                                            />
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
                    </div>
                </React.Fragment>
            </FwmModal>
        </React.Fragment>
    )
}

export default FwmUserPhotos