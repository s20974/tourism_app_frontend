import { Typography } from '@material-ui/core'
import * as React from 'react'

import styles from './user-buttons.module.scss'

interface IButton {
    activeButton: any,
    setActiveButton: any,
}

const FwmUserButtons: React.FC<IButton> = (props: IButton) => {
    return (
        <>
            <div className={styles.userButtonsWrapper}>
                <div className={styles.userButtonsList}>
                    <div className={styles.button} onClick={() => props.setActiveButton('photos')}>
                        <Typography>Photos.</Typography>
                        <div className={`${styles.bottomLine} ${props.activeButton === 'photos' ? styles.active : ''}`}></div>
                    </div>
                    <div className={styles.button} onClick={() => props.setActiveButton('posts')}>
                        <Typography>Posts.</Typography>
                        <div className={`${styles.bottomLine} ${props.activeButton === 'posts' ? styles.active : ''}`}></div>
                    </div>
                    <div className={styles.button} onClick={() => props.setActiveButton('trips')}>
                        <Typography>Trips.</Typography>
                        <div className={`${styles.bottomLine} ${props.activeButton === 'trips' ? styles.active : ''}`}></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FwmUserButtons