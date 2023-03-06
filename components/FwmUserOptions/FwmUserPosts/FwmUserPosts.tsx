import { Button, Fade, Menu, MenuItem, Typography } from '@material-ui/core'
import * as React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import styles from './user-posts.module.scss'
import FwmInputs from '../../FwmForms/FwmInputs/FwmInput'
import { ImageSlashIcon, SendIcon } from '../../FwmIcons/FwmIcons'
import FwmModal from '../../FwmModal/FwmModal'
import { complaintPost } from '../../../api/apiCallComplaint'
import { addCommentToPost, addLikeToPost, deletePost, getPostDataById } from '../../../api/apiCallUserPosts'

interface IPost {
    userPost: any,
    user?: any,
    isAuthor?: any,
    updatePostsList?: any
}

const FwmUserPosts: React.FC<IPost> = (props: IPost) => {
    const methods = useForm()

    const { handleSubmit, reset } = { ...methods }

    const [showPostModal, setShowPostModal] = React.useState<any>(null)
    const [postData, setPostData] = React.useState<any>(null)

    const onPostModalOpen = (id: any) => {
        getPostDataById(id).then((res: any) => {
            setPostData(res.data)
        })
        setShowPostModal(id)
    }

    const addLikeToPostHandler = () => {
        addLikeToPost(postData.id, props.user.id)
            .then(() => {
                onPostModalOpen(postData.id)
            })
    }

    const onSubmitComment = (values: any, event: any) => {
        event.preventDefault()
        addCommentToPost({
            id: postData.id,
            content: values.comment,
            authorName: props.user.name,
            authorSurname: props.user.surname,
        }).then(() => {
            onPostModalOpen(postData.id)
        }).catch((err: any) => {
            console.log(err)
        })
        reset()
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
        deletePost(id)
        setShowPostModal(false)
        if(props.updatePostsList) {
            props.updatePostsList()
        }
    }

    return (
        <>
            <div className={styles.userPostsWrapper}>
                <div className={styles.userPostsList}>
                    {
                        props.userPost && props.userPost.length !== 0 ? (
                            props.userPost.map((key: any) => {
                                return (
                                    <React.Fragment key={key.photoUrl}>
                                        <div className={styles.userPostWrapper} onClick={() => onPostModalOpen(key.id ?? key.postId)}>
                                            <div className={styles.userPostInfo}>
                                                <div className={styles.header}>
                                                    <Typography>
                                                        {key?.header ?? ''}
                                                    </Typography>
                                                </div>

                                                <div className={styles.description}>
                                                    <Typography>
                                                        {key?.description ?? ''}
                                                    </Typography>
                                                </div>

                                                <div className={styles.likesCommentInfo}>
                                                    <div className={styles.iconInfo}>
                                                        <i className="fa-solid fa-heart"></i>
                                                        <span>{key.likes}</span>
                                                    </div>
                                                    <div className={styles.iconInfo}>
                                                        <i className="fa-solid fa-comment"></i>
                                                        <span>{key?.comment?.length}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={styles.backgroundImage} style={{ backgroundImage: `url(${key.photoUrl ?? key.postPhotoUrl})` }}>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            })
                        ) : (
                            <div className={styles.withoutPost}>
                                <ImageSlashIcon />
                                No posts yet
                            </div>
                        )
                    }
                </div>
            </div>

            <FwmModal
                id="add-user-posts"
                open={showPostModal != null}
                onClose={() => setShowPostModal(null)}
                maxWidth={'md'}
                headertext='Post below'
            >
                <React.Fragment>
                    <div className={styles.imageHeaderWrapper} style={{ backgroundImage: `url(${postData?.photoUrl})` }}>
                        <div className={styles.postOptionsWrapper}>
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
                                <MenuItem onClick={() => {complaintPost(postData?.id); handleClose()}}>Report</MenuItem>
                                {props.isAuthor && <MenuItem onClick={() => handleDeleteClick(postData?.id)}>Delete</MenuItem>}
                            </Menu>
                        </div>
                        <div className={styles.likeButton}>
                            <i className="fa-solid fa-heart" onClick={addLikeToPostHandler}></i>
                            <span>{postData?.likes}</span>
                        </div>
                    </div>
                    <div className={styles.postDataInfo}>
                        <div className={styles.headerWrapper}>
                            <Typography>
                                {postData?.header}
                            </Typography>
                        </div>
                        <div className={styles.descriptionWrapper}>
                            <Typography>
                                {postData?.description}
                            </Typography>
                        </div>
                        <div className={styles.commentsBlockWrapper}>
                            <div className={styles.commentContaner}>
                                {postData?.comment && postData.comment.map((value: any) => {
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
                        </div>
                        <div className={styles.addCommentLikeBlock}>
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
                </React.Fragment>
            </FwmModal>
        </>
    )
}

export default FwmUserPosts