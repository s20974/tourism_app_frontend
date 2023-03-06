import { Typography } from '@material-ui/core'
import Image from 'next/image'
import { useRouter } from 'next/router'
import * as React from 'react'
import { connect } from 'react-redux'

import styles from './left-menu.module.scss'
import LeftMenuButton from './LeftMenuButton'
import { AdminIcon, AngleIcon, FriendIcon, HomeIcon, HotelIcon, LogoutIcon, MessageIcon, PostsIcon, TripIcon } from '../FwmIcons/FwmIcons'


const FwmLeftMenu: React.FC<{current: any, dispatch:any, user?: any}> = (props: {current: any, dispatch:any, user?: any}) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const router = useRouter()

    const onClickLogout = () => {
        const action = {
            type: 'logout-success',
        };
        props.dispatch(action);
        router.push('/account/login')
    }

    return(
        <React.Fragment>
            <div className={`${styles.leftMenuWrapper} ${isMenuOpen ? styles.open : ''}`}>
                <div className={`${styles.leftMenu}`}>
                    <div className={`${styles.logo} ${isMenuOpen ? styles.open : ''}`}>
                        <div className={styles.iconWrapper}>
                            <Image src='/images/logo/logo-blue.png' alt='logo' width={40} height={40}/>
                        </div>
                        <div className={styles.buttonWrapper}>
                            <Typography>FlyWithMe.</Typography>
                        </div>
                    </div>

                    <div className={styles.menuButtonsWrapper}>
                        <LeftMenuButton href='/home' icon={<HomeIcon/>} text='Home.' currentPage={props.current}/>
                        <LeftMenuButton href='/friends' icon={<FriendIcon/>} text='Friends.' currentPage={props.current}/>
                        <LeftMenuButton href='/messages' icon={<MessageIcon/>} text='Messages.' currentPage={props.current}/>
                        <LeftMenuButton href='/posts' icon={<PostsIcon/>} text='Posts.' currentPage={props.current}/>
                        <LeftMenuButton href='/trips' icon={<TripIcon/>} text='Trips.' currentPage={props.current}/>
                        <LeftMenuButton href='/hotels' icon={<HotelIcon/>} text='Hotels.' currentPage={props.current}/>
                        {
                            props.user.role.includes('ADMIN') && <LeftMenuButton href='/admin' icon={<AdminIcon/>} text='Admin.' currentPage={props.current}/>
                        }
                    </div>

                    <div className={styles.buttonButtonWrapper}>
                        <div className={styles.menuButton} onClick={onClickLogout}>
                            <div className={styles.iconWrapper}>
                                <div className={styles.circleIcon}>
                                    <LogoutIcon/>
                                </div>
                            </div>
                            <div className={styles.buttonWrapper}>
                                <Typography>Logout.</Typography>
                            </div>
                        </div>
                        <div className={styles.menuButton} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <div className={styles.iconWrapper}>
                                <div className={`${styles.circleIcon} ${styles.angle} ${isMenuOpen ? styles.open : ''}`}>
                                    <AngleIcon/>
                                </div>
                            </div>
                            <div className={styles.buttonWrapper} >
                                <Typography>Close.</Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = (state: any) => {
    return {
        user: state,
    };
};


export default connect(mapStateToProps)(FwmLeftMenu)