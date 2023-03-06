import * as React from 'react'

import styles from './sign-up-with-buttons.module.scss'

const SignUpWithButtons: React.FC = () => {
    return (
        <React.Fragment>
            <div className={styles.brandsButtonsWrapper}>
                <div className={styles.lineWrapper}>
                    <span className={styles.spacer}></span>
                    <p>OR</p>
                    <span className={styles.spacer}></span>
                </div>
                <div className={styles.buttonsList}>
                    <div className={styles.processButton}>
                        <i className="fa-brands fa-google"></i>
                        Google
                    </div>
                    <div className={styles.processButton}>
                        <i className="fa-brands fa-apple"></i>
                        Apple Id
                    </div>
                    <div className={styles.processButton}>
                        <i className="fa-brands fa-facebook"></i>
                        Facebook
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SignUpWithButtons