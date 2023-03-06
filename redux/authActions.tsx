import * as apiCalls from '../api/apiCallUserProcessing'

export const loginSuccess = (loginUserData: any) => {
    return {
        type: 'login-success',
        payload: loginUserData
    };
};

export const loginHandler = (credentials: any) => {
    return async function(dispatch: any){
        return apiCalls.login(credentials).then((response) => {
            dispatch(
                loginSuccess({
                    jwt: response.data.jwt,
                    role: response.data.roleSet,
                    email: credentials.email
                })
            );
            return response;
        });
    };
};

export const getUserData = (email: any, jwt: any, role: any) => {
    return async function(dispatch: any){
        return apiCalls.getData(email).then((response) => {
            dispatch(
                loginSuccess({
                    ...response.data,
                    role: role,
                    jwt: jwt,
                    email: email
                })
            );
            return response;
        });
    };
};
