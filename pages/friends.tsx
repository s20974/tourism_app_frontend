import { Checkbox, FormControlLabel, FormGroup, Typography } from "@material-ui/core";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { connect } from "react-redux";

import { addUserToFriends, deleteUserFriend, findFriendsByFilter, getAllUserFirends, getAllUserFirendsRequests } from "../api/apiCallUserFriends";
import FwmProcessingButton from "../components/FwmForms/FwmButtons/ProcessingButton/FwmProcessingButton";
import FwmLocationField from "../components/FwmForms/FwmLocationField/FwmLocationField";
import { FilterIcon, FriendIcon, LocationIcon, PlusIcon, UserSlashIcon } from "../components/FwmIcons/FwmIcons";
import FwmLeftMenu from "../components/FwmLeftMenu/FwmLeftMenu";
import FwmTopLeftMenu from "../components/FwmTopLeftMenu/FwmTopLeftMenu";
import styles from '../styles/friends.module.scss'

const Friends: NextPage = (props: any) => {
    const router = useRouter()

    const [isAllFriendShow, setAllFriendShow] = React.useState(true)
    const [isFilterActive, setIsFilterActive] = React.useState(false)

    const [isFilterSeach, setIsFilterSearch] = React.useState(false)

    const [countries, setCountries] = React.useState<any>('')

    const [filterGender, setFilterGender] = React.useState<any>({
    });

    const [filterStatus, setFilterStatus] = React.useState<any>({
    });

    const [userFriendsList, setUserFriendsList] = React.useState<any>()
    const [userFriendsRequestsList, setUserFriendsRequestsList] = React.useState<any>()

    const [page, setPage] = React.useState(0)

    React.useEffect(() => {
        getAllUserFirends(props.user.id)
            .then((friends: any) => {
                setUserFriendsList([...friends.data])
            })
        getAllUserFirendsRequests(props.user.id)
            .then((friends: any) => {
                setUserFriendsRequestsList([...friends.data])
            })
    }, [props.user.id])

    const onClickDeleteFriend = (friendId: any) => {
        deleteUserFriend(props.user.id, friendId)
            .then(() => {
                const filter = userFriendsList.filter((user: any) => { user.id !== friendId })
                setUserFriendsList(filter)
            }
            )
    }

    const onClickAddFriend = (friendId: any) => {
        addUserToFriends(props.user.id, friendId).then(() => {
            setUserFriendsRequestsList(userFriendsRequestsList.filter((user: any) => { user.id !== friendId }))
        }
        )
    }

    const onClickDontAcceptRequest = (friendId: any) => {
        deleteUserFriend(props.user.id, friendId)
            .then(() => {
                const filter = userFriendsRequestsList.filter((user: any) => { user.id !== friendId })
                setUserFriendsRequestsList(filter)
            }
            )
    }


    const fetchFriendsData = async () => {
        const url = `/api/v1/friends/getUsers?gender=${Object.keys(filterGender)[0] ?? null}&status=${Object.keys(filterStatus)[0] ?? null}&country=${countries}&page=${page}&size=30&sort=name`
        findFriendsByFilter(url)
            .then((res: any) => {
                setUserFriendsList([...res.data]);
            })
        if (!isFilterSeach) {
            setIsFilterSearch(true)
            setAllFriendShow(true)
        }
    };

    const FriendOption = (): JSX.Element => {
        if (isAllFriendShow) {

            return userFriendsList ? userFriendsList.map(function (friend: any) {
                return (<React.Fragment key={friend}>
                    <div className={styles.firendCard}>
                        <div className={styles.friendAvatar} style={friend.mainPhotoUrl && { backgroundImage: `url(${friend.mainPhotoUrl})` }} onClick={() => router.push(`/user/${friend.id}`)}>
                        </div>

                        <div className={styles.userName}>
                            <Typography>{friend.name}{friend.surname}</Typography>
                        </div>

                        <div className={styles.userPosistion}>
                            <LocationIcon /><Typography>{friend.country}</Typography>
                        </div>

                        <div className={styles.userButtons}>
                            {
                                !isFilterSeach ? (<>
                                    <FwmProcessingButton onClick={() => router.push(`/messages?id=${friend.id}`)} text='Message' />
                                    <FwmProcessingButton onClick={() => onClickDeleteFriend(friend.id)} text={<UserSlashIcon />} />
                                </>) : (
                                    <>
                                    <FwmProcessingButton onClick={() => router.push(`/user/${friend.id}`)} text="More info" />
                                    </>
                                )
                            }

                        </div>
                    </div>
                </React.Fragment>)
            }) : (<UserSlashIcon />)
        } else {
            return userFriendsRequestsList ? userFriendsRequestsList.map(function (friend: any) {
                return (<React.Fragment key={friend}>
                    <div className={styles.firendCard}>
                        <div className={styles.friendAvatar} style={friend.mainPhotoUrl && { backgroundImage: `url(${friend.mainPhotoUrl})` }} onClick={() => router.push(`/user/${friend.id}`)}>
                        </div>

                        <div className={styles.userName}>
                            <Typography>{friend.name}{friend.surname}</Typography>
                        </div>

                        <div className={styles.userPosistion}>
                            <LocationIcon /><Typography>{friend.country}</Typography>
                        </div>

                        <div className={styles.userButtons}>
                            <FwmProcessingButton onClick={() => onClickAddFriend(friend.id)} text={<PlusIcon />} />
                            <FwmProcessingButton onClick={() => onClickDontAcceptRequest(friend.id)} text={<UserSlashIcon />} />
                        </div>
                    </div>
                </React.Fragment>)
            }) : (<UserSlashIcon />)
        }
    }

    return (
        <>
            <FwmLeftMenu current='friends' />
            <FwmTopLeftMenu />

            <div className={styles.friendsContainerWrapper}>
                <div className={styles.friendBlocks}>
                    <Typography>
                        {isAllFriendShow ? <>All Friends.</> : <>Request Friends.</>}
                    </Typography>

                    <div className={styles.icons}>
                        <div className={styles.filterIcon} onClick={() => setIsFilterActive(!isFilterActive)}>
                            <FilterIcon />
                        </div>
                        <div className={styles.filterIcon} onClick={() => setAllFriendShow(!isAllFriendShow)}>
                            <FriendIcon />
                        </div>
                    </div>
                </div>
                <div className={`${styles.filtersContainerWrapper} ${isFilterActive ? styles.active : ''}`}>
                    <div className={`${styles.filtersContainer} ${isFilterActive ? styles.active : ''}`}>
                        <div className={`${styles.filterBlock} ${isFilterActive ? styles.active : ''}`}>
                            <Typography>
                                Country
                            </Typography>
                            <FwmLocationField
                                setForm={setCountries}
                                value={countries}
                            />
                        </div>
                        <div className={`${styles.filterBlock} ${isFilterActive ? styles.active : ''}`}>
                            <Typography>
                                Gender
                            </Typography>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox checked={filterGender.MALE ?? false}
                                    onChange={(event) => setFilterGender({ [event.target.name]: event.target.checked })} name='MALE' />} label="Male" />
                                <FormControlLabel control={<Checkbox checked={filterGender.FEMALE ?? false}
                                    onChange={(event) => setFilterGender({ [event.target.name]: event.target.checked })} name='FEMALE' />} label="Female" />
                            </FormGroup>
                        </div>
                        <div className={`${styles.filterBlock} ${isFilterActive ? styles.active : ''}`}>
                            <Typography>
                                Status
                            </Typography>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox checked={filterStatus.LOOKING_FOR ?? false}
                                    onChange={(event) => setFilterStatus({ [event.target.name]: event.target.checked })} name='LOOKING_FOR' />} label="Looking For" />

                                <FormControlLabel control={<Checkbox checked={filterStatus.FOUND ?? false}
                                    onChange={(event) => setFilterStatus({ [event.target.name]: event.target.checked })} name='FOUND' />} label="Found" />

                                <FormControlLabel control={<Checkbox checked={filterStatus.NO_WANTING ?? false}
                                    onChange={(event) => setFilterStatus({ [event.target.name]: event.target.checked })} name='NO_WANTING' />} label="No Wanting" />
                            </FormGroup>
                        </div>
                    </div>
                    <FwmProcessingButton
                        text='Search'
                        onClick={() => { fetchFriendsData(); }}
                    />
                </div>
                <div className={styles.friendsListWrapper}>
                    <div className={styles.friendsList}>
                        <FriendOption />
                    </div>
                </div>
                <div className={styles.showMore}>
                    {userFriendsList?.length == 30 && <FwmProcessingButton onClick={() => { setPage(page + 1); fetchFriendsData(); }} text="Find More" />}
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

export default connect(mapStateToProps)(Friends)