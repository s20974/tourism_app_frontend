import { Typography } from "@material-ui/core";
import { NextPage } from "next";
import React from "react";
import { connect } from "react-redux";

import { getLastPhotos, getLastPosts, getLastTrips } from "../api/apiCallUserFriends";
import FwmLeftMenu from "../components/FwmLeftMenu/FwmLeftMenu";
import FwmTopLeftMenu from "../components/FwmTopLeftMenu/FwmTopLeftMenu";
import FwmUserPhotos from "../components/FwmUserOptions/FwmUserPhotos/FwmUserPhotos"
import FwmUserPosts from "../components/FwmUserOptions/FwmUserPosts/FwmUserPosts";
import FwmUserTrips from "../components/FwmUserOptions/FwmUserTrips/FwmUserTrips";
import styles from '../styles/home.module.scss'

const Home: NextPage = (props: any) => {
    const [photos, setPhotos] = React.useState<any>([])
    const [posts, setPosts] = React.useState<any>([])
    const [trips, setTrips] = React.useState<any>([])
   
    React.useEffect(() => {
        setPhotos([])
        getLastPhotos(props.user.id)
        .then((res: any) => {
            console.log(res.data)
            setPhotos(res.data)
        }).catch(
          (err: any) => {
            console.log(err)
          }
        )
        getLastPosts(props.user.id)
        .then((res: any) => {
            console.log(res.data)
            setPosts(res.data)
        }).catch(
          (err: any) => {
            console.log(err)
          }
        )
        getLastTrips(props.user.id)
        .then((res: any) => {
            console.log(res.data)
            setTrips(res.data)
        }).catch(
          (err: any) => {
            console.log(err)
          }
        )
    }, [props.user])

    return (
        <>
            <FwmLeftMenu current='home' />
            <FwmTopLeftMenu />

            <div className={styles.homeContainer}>
                <Typography>
                    Home.
                </Typography>
                <div className={styles.dataContainer}>
                    <Typography>
                        Photos.
                    </Typography>
                    <div className={styles.listWrapper}>
                        <FwmUserPhotos userGallery={photos} user={props.user}/>
                    </div>
                </div>
                <div className={styles.dataContainer}>
                    <Typography>
                        Posts.
                    </Typography>
                    <div className={styles.listWrapper}>
                        <FwmUserPosts userPost={posts} user={props.user}/>
                    </div>
                </div>
                <div className={styles.dataContainer}>
                    <Typography>
                        Trips.
                    </Typography>
                    <div className={styles.listWrapper}>
                        <FwmUserTrips userTrips={trips} userId={props.user.id}/>
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

export default connect(mapStateToProps)(Home)