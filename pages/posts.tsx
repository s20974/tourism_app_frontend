import { Typography } from "@material-ui/core";
import { NextPage } from "next";
import React from "react";
import { connect } from "react-redux";

import { getLastPosts } from "../api/apiCallUserFriends";
import FwmLeftMenu from "../components/FwmLeftMenu/FwmLeftMenu";
import FwmTopLeftMenu from "../components/FwmTopLeftMenu/FwmTopLeftMenu";
import FwmUserPosts from "../components/FwmUserOptions/FwmUserPosts/FwmUserPosts";
import styles from '../styles/posts.module.scss'

const Posts: NextPage = (props: any) => {
    const [posts, setPosts] = React.useState<any>([])

    React.useEffect(() => {
        getLastPosts(props.user.id)
        .then((res: any) => {
            setPosts(res.data)
        }).catch(
          (err: any) => {
            console.log(err)
          }
        )
    }, [props.user])

    return(
        <>
            <FwmLeftMenu current='posts'/>
            <FwmTopLeftMenu/>

            <div className={styles.postsContainerWrapper}>
                <Typography>Posts.</Typography>

                <div className={styles.postsContainerWrapper}>
                    <FwmUserPosts userPost={posts} user={props.user}/>
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

export default connect(mapStateToProps)(Posts)