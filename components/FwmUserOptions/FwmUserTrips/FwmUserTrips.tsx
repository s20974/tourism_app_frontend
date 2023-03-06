import { Avatar, Typography } from '@material-ui/core'
import { AvatarGroup } from '@mui/material'
import Link from 'next/link'
import * as React from 'react'

import styles from './user-trips.module.scss'
import FwmProcessingButton from '../../FwmForms/FwmButtons/ProcessingButton/FwmProcessingButton'
import { ImageSlashIcon, LocationIcon } from '../../FwmIcons/FwmIcons'
import { joinTrip } from '../../../api/apiCallUserTrips'

interface ITrip {
    userTrips: any,
    userId?: any
}

const FwmUserTrips: React.FC<ITrip> = (props: ITrip) => {
    const onClickJoinTrip = (tripId: any) => {
        if(props.userId) {
            joinTrip(props.userId, tripId)
        }
    }

    return (
        <React.Fragment>
            <div className={styles.userTripsWrapper}>
                <div className={styles.userTripsList}>
                    {
                        props.userTrips && props.userTrips.length !== 0 ? (
                            props.userTrips.map((velue: any) => {
                                return(
                                        <div className={styles.userTripWrapper} key={velue}>
                                            <div className={styles.userTripInfo}>
                                                <div className={styles.tripHeader}>
                                                    <Typography>
                                                        {velue.header ?? ''}
                                                    </Typography>
                                                </div>
                    
                                                <div className={styles.tripDescription}>
                                                    <Typography>
                                                        {velue.description ?? ''}
                                                    </Typography>
                                                </div>
                    
                                                <div className={styles.tripMembersWrapper}>
                                                    <div className={styles.tripMembers}>
                                                        <AvatarGroup max={4}>
                                                            {
                                                            velue.joinedUsers && velue.joinedUsers.map((image: any) => {
                                                                    return (
                                                                        <Link href={`/user/${image.id}`} key={image.id}>
                                                                            <Avatar alt="alt" src={image.photoUrl} />
                                                                        </Link>
                                                                    )
                                                                })
                                                            }
                                                            
                                                        </AvatarGroup>
                                                    </div>
                                                    <div className={styles.joinTrip}>
                                                        <FwmProcessingButton text="Join" onClick={() => onClickJoinTrip(velue.id ?? velue.tripId )}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.backgroundImage}>
                                            </div>
                    
                                            <div className={styles.infoBlock}>
                                                <div className={styles.dateInfo}>
                                                    <Typography>Date From: {new Date(velue.dateFrom).toLocaleDateString() ?? ''}</Typography>
                                                    <Typography>Date To: {new Date(velue.dateTo).toLocaleDateString() ?? ''}</Typography>
                                                </div>
                                                <div className={styles.locationInfo}>
                                                    <LocationIcon /><Typography>{velue.country ?? ''}</Typography>
                                                </div>
                                            </div>
                                    </div>
                                )
                            })
                            ) : (
                                <div className={styles.withoutTrips}>
                                    <ImageSlashIcon/>
                                    No trips yet
                                </div>
                            )
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default FwmUserTrips