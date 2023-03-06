import { Typography } from "@material-ui/core"
import { NextPage } from "next"
import React from "react"

import { deletePhoto, deletePhotoComplaint, deletePost, deletePostComplaint, getAllComplaintPhotos, getAllComplaintPosts } from "../api/apiCallComplaint"
import FwmLeftMenu from "../components/FwmLeftMenu/FwmLeftMenu"
import FwmTopLeftMenu from "../components/FwmTopLeftMenu/FwmTopLeftMenu"
import styles from '../styles/admin.module.scss'

const Posts: NextPage = () => {
    const [postsList, setPostsList] = React.useState([])
    const [photosList, setPhotosList] = React.useState([])

    React.useEffect(() => {
        getAllComplaintPosts()
            .then((res: any) => {
                setPostsList(res.data)
            })

        getAllComplaintPhotos()
            .then((res: any) => {
                setPhotosList(res.data)
            })
    }, [])

    const updateData = () => {
        getAllComplaintPosts()
            .then((res: any) => {
                setPostsList(res.data)
            })

        getAllComplaintPhotos()
            .then((res: any) => {
                setPhotosList(res.data)
            })
    }


    return (
        <>
            <FwmLeftMenu current='admin' />
            <FwmTopLeftMenu />

            <div className={styles.adminPanelWrapper}>
                <div className={styles.adminBlocks}>
                    <Typography>
                        Admin.
                    </Typography>
                </div>
                <div className={styles.adminBlocks}>
                    <div className={styles.listWrapper}>
                        <Typography>
                            Photos.
                        </Typography>
                        <div className={styles.cardsListWrapper}>
                            {
                                photosList.map((val: any) => {
                                    return (
                                        <React.Fragment key={val.id}>
                                            <div className={styles.photo} style={{ backgroundImage: `url(${val.url})` }}>
                                                <div className={styles.photoInfo}>
                                                    <div className={styles.bottomIcons}>
                                                        <div className={styles.iconInfo}>
                                                            <i className="fa-solid fa-trash" onClick={() => {deletePhoto(val.id); updateData()}}></i>
                                                            <span>Delete Photo</span>
                                                        </div>
                                                        <div className={styles.iconInfo}>
                                                            <i className="fa-solid fa-trash" onClick={() => {deletePhotoComplaint(val.id); updateData()}}></i>
                                                            <span>Delete Complaint</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.listWrapper}>
                        <Typography>
                            Posts.
                        </Typography>
                        <div className={styles.cardsListWrapper}>
                            {
                                postsList.map((val: any) => {
                                    return (
                                        <React.Fragment key={val.photoUrl}>
                                            <div className={styles.userPostWrapper}>
                                                <div className={styles.userPostInfo}>
                                                    <div className={styles.header}>
                                                        <Typography>
                                                            {val?.header ?? ''}
                                                        </Typography>
                                                    </div>

                                                    <div className={styles.description}>
                                                        <Typography>
                                                            {val?.description ?? ''}
                                                        </Typography>
                                                    </div>

                                                    <div className={styles.likesCommentInfo}>
                                                        <div className={styles.iconInfo}>
                                                            <i className="fa-solid fa-trash" onClick={() => {deletePost(val.id); updateData()}}></i>
                                                            <span>Delete Post</span>
                                                        </div>
                                                        <div className={styles.iconInfo}>
                                                            <i className="fa-solid fa-trash" onClick={() => {deletePostComplaint(val.id); updateData()}}></i>
                                                            <span>Delete Complaint</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={styles.backgroundImage} style={{ backgroundImage: `url(${val.photoUrl ?? val.postPhotoUrl})` }}>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Posts