import { Button } from '@material-ui/core'
import * as Reacr from 'react'

import styles from './processing-button.module.scss'
import { PlaneIcon } from '../../../FwmIcons/FwmIcons'

interface IButton {
    text: any,
    isApiCall?: any,
    onClick?: any
}

const FwmProcessingButton: React.FC<IButton> = (props: IButton) => {
    return(
        <Reacr.Fragment>
            <Button className={styles.processingButton} type={props.onClick ? 'button' : 'submit'} onClick={props.onClick ?? null} 
                    disabled={props.isApiCall ?? false}>
                {props.isApiCall && <div className={styles.loadingIcon}><PlaneIcon/></div>} {props.text}
            </Button>
        </Reacr.Fragment>
    )
}

export default FwmProcessingButton