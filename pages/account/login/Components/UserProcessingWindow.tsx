import Image from 'next/image'
import * as React from 'react'

import styles from './user-processing-block.module.scss'

interface IUserProcessingWindow {
    children: JSX.Element
}

const UserProcessingWindow: React.FC<IUserProcessingWindow> = (props: IUserProcessingWindow) => {
    return(
        <React.Fragment>
            <div className={styles.processingBlockWrapper}>
                <div className={styles.processingBlock}>
                    <div className={styles.leftSideImage}>
                        <div className={styles.logoWrapper}>
                            <div className={styles.logoImage}>
                                <Image width={30} height={30} alt='logo' src='/images/logo/logo-white.png'/>
                            </div>
                            <div className={styles.logoText}>
                                <p>FlyWithMe.</p>
                                <span>
                                    Look for people and go on the journey of your dreams.
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.rightInputsContainer}>
                        {props.children}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default UserProcessingWindow