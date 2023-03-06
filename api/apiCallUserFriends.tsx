import axios from "axios"

axios.defaults.baseURL = 'http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com';
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const getAllUserFirends = (userId: any) => {
    return axios.get(
        `http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/friends/getAllFriends?id=${userId}`
    )
}

export const getAllUserFirendsRequests = (userId: any) => {
    return axios.get(
        `http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/friends/getAllFriendRequest?id=${userId}`
    )
}

export const deleteUserFriend = (userId: any, friendId: any) => {
    return axios.delete(
        `http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/friends/deleteFriend?userId=${userId}&friendId=${friendId}`
    )
}

export const addUserToFriends = (userId: any, friendId: any) => {
    return axios.get(
        `http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/friends/addFriend?userId=${userId}&friendId=${friendId}`
    )
}

export const getFriendData = (userId: any, friendId: any) => {
    return axios.get(
        `http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/friends/getFriendData?userId=${userId}&friendId=${friendId}`
    )
}

export const addFriendRequest = (userId: any, friendId: any) => {
    return axios.get(
        `http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/friends/addFriendRequest?userId=${userId}&friendId=${friendId}`
    )
}

export const getLastPhotos = (userId: any) => {
    return axios.get(
        `http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/friends/mainPage/photo?id=${userId}`
    )
}

export const getLastPosts = (userId: any) => {
    return axios.get(
        `http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/friends/mainPage/posts?id=${userId}`
    )
}

export const getLastTrips = (userId: any) => {
    return axios.get(
        `http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/friends/mainPage/trip?id=${userId}`
    )
}

export function findFriendsByFilter(params: any){
    return axios.get(`http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com${params}`)
}
