import axios from "axios"

axios.defaults.baseURL = 'http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com';
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const getFriendData = (userId: any, friendId: any) => {
    return axios.get(
        `http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/friends/getFriendData?userId=${userId}&friendId=${friendId}`
    )
}

export const updateData = (email: any, user: any) => {
    return axios.put(
        `http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/user/userUpdate?email=${email}`,
        user
    )
}