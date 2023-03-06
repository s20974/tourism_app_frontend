import { NextPage } from 'next'
import { useRouter } from 'next/router'
import * as React from 'react'

import { verifyEmail } from '../../api/apiCallUserProcessing'

const Verify: NextPage = () => {
    const router = useRouter()
    const { token } = router.query


    const [valid, setValid] = React.useState(true);
    const [pendingApiCall, setPendingApiCall] = React.useState(true)

    verifyEmail(token).then(
        (response) => {
            setPendingApiCall(false)
            if (response?.status === 200) {
                router.push('/account/login')
            }
        }
    ).catch(
        () => {
            setPendingApiCall(false);
            setValid(false);
        }
    )

    return (
        <>
            {!valid && <div>Mail already verified</div>}
            {pendingApiCall && <div>Preloader Here</div>}
        </>)
}

export default Verify