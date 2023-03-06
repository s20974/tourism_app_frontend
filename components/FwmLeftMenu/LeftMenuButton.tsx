import { Typography } from '@material-ui/core'
import Link from 'next/link'
import * as React from 'react'

import styles from './left-menu-button.module.scss'

interface IButton {
    href: any,
    currentPage: any,
    text: any,
    icon: any
}

const LeftMenuButton: React.FC<IButton> = (props: IButton) => {
    return(
        <Link href={props.href}>
            <div className={styles.menuButton}>
                <div className={`${styles.menuButtonStyle} ${'/' + props.currentPage === props.href ? styles.active : ''}`}>
                    <div className={styles.iconWrapper}>
                        <div className={styles.circleIcon}>
                            {props.icon}
                        </div>
                    </div>
                    <div className={styles.buttonWrapper}>
                        <Typography>{props.text}</Typography>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default LeftMenuButton