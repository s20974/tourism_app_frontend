import { Typography } from "@material-ui/core"
import { NextPage } from "next"
import { useRouter } from 'next/router'
import * as React from 'react'
import { connect } from "react-redux"

import { getAllPhotosByUserId } from "../../api/aliCallUserPhotos"
import { getFriendData } from "../../api/apiCallsUserData"
import { getAllPostByUserId } from "../../api/apiCallUserPosts"
import { getAllTripsByUserId } from "../../api/apiCallUserTrips"
import { UserSlashIcon } from "../../components/FwmIcons/FwmIcons"
import FwmLeftMenu from "../../components/FwmLeftMenu/FwmLeftMenu"
import FwmTopLeftMenu from "../../components/FwmTopLeftMenu/FwmTopLeftMenu"
import FwmUserButtons from "../../components/FwmUserOptions/FwmUserButtons/FwmUserButtons"
import FwmUserHeaderInfo from "../../components/FwmUserOptions/FwmUserHeaderInfo/FwmUserHeaderInfo"
import FwmUserPhotos from "../../components/FwmUserOptions/FwmUserPhotos/FwmUserPhotos"
import FwmUserPosts from "../../components/FwmUserOptions/FwmUserPosts/FwmUserPosts"
import FwmUserTrips from "../../components/FwmUserOptions/FwmUserTrips/FwmUserTrips"
import styles from '../../styles/user.module.scss'

const User: NextPage = (props: any) => {
    const router = useRouter()
    const { id } = router.query

    const [friendData, setFriendData] = React.useState<any>();
    const [isApiError, setIsApiError] = React.useState();
    const [activeButton, setActiveButton] = React.useState('photos')
    const [photos, setPhotos] = React.useState<any>([])
    const [posts, setPosts] = React.useState<any>([])
    const [trips, setTrips] = React.useState([])

    React.useEffect(() => {
        getFriendData(props.user.id, id)
            .then((friend: any) => {
                if (friend.data.id === props.user.id) {
                    router.push('/profile')
                }
                setFriendData({
                    name: friend.data.name,
                    surname: friend.data.surname,
                    location: friend.data.country,
                    avatar: friend.data.mainPhotoUrl,
                    action: friend.data.action,
                    id: friend.data.id,
                    userGalleries: friend.data.userGalleries
                })
            })
            .catch((error: any) => {
                console.log(error)
                setIsApiError(error.response.data.message)
            })
    }, [id, props.user.id, router])

    React.useEffect(() => {
        if (activeButton === 'photos') {
            getAllPhotosByUserId(id)
                .then((res: any) => {
                    setPhotos(res.data)
                }).catch(
                    (err: any) => {
                        console.log(err)
                    }
                )
        }

        if (activeButton === 'posts') {
            getAllPostByUserId(id)
                .then((res: any) => {
                    setPosts(res.data)
                }).catch(
                    (err: any) => {
                        console.log(err)
                    }
                )
        }

        if (activeButton === 'trips') {
            getAllTripsByUserId(id)
                .then((res: any) => {
                    setTrips(res.data)
                }).catch(
                    (err: any) => {
                        console.log(err)
                    }
                )
        }

    }, [activeButton, id])

    const LoadPart = (): JSX.Element => {
        if (activeButton === 'photos') {
          return (
            <FwmUserPhotos 
                userGallery={photos} 
                user={{
                    id: friendData.id,
                    surname: friendData.name,
                    name: friendData.surname,
                    avatar: props.user.avatar
                }}/>
          )
        } else if (activeButton === 'posts') {
          return (
            <FwmUserPosts 
                userPost={posts} 
                user={friendData}/>
          )
        } else {
    
          return (<FwmUserTrips userTrips={trips} userId={props.user.id}/>)
        }
    }

    return (
        <React.Fragment>
            <FwmLeftMenu current='' />
            <FwmTopLeftMenu />
            {
                friendData ? (
                    <React.Fragment>
                        <FwmUserHeaderInfo
                            user={friendData}
                            setUser={setFriendData}
                            id={props.user.id}
                        />
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <div className={styles.userDontExists}>
                            <UserSlashIcon />
                            <Typography>{isApiError}</Typography>
                        </div>
                    </React.Fragment>
                )
            }


            <FwmUserButtons
                activeButton={activeButton}
                setActiveButton={setActiveButton}
            />

            {
                friendData && <LoadPart/>
            }
            
        </React.Fragment>
    )
}

const mapStateToProps = (state: any) => {
    return {
        user: state,
    };
};


export default connect(mapStateToProps)(User)