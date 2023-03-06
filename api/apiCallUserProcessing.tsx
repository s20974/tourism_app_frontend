import axios from "axios"

axios.defaults.baseURL = 'http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com';
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const signup = (user: any) => {
    delete axios.defaults.headers.common['Authorization'];
    return axios.post('http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/user/register', user);
}

export const verifyEmail = (code: any) => {
    delete axios.defaults.headers.common['Authorization'];
    return axios.get("http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/user/verify?code=" + code);
}

export const login = (user: any) => {
    delete axios.defaults.headers.common['Authorization'];
    return axios.post('http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/login', user);
}

export const setAuthorizationHeader = (props: { jwt:any, isLoggedIn:any  }) => {
    if (props.isLoggedIn) {  
        axios.defaults.headers.common['Authorization'] = `Bearer ${props.jwt}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const getData = (email: any) => {
    return axios.get(
        `http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/user/getData?email=${email}`
    )
}