import axios from "axios"

axios.defaults.baseURL = 'http://';
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const uploadUserGalaryFile = (email: any, data: any) => {
    return axios({
        method: "put",
        url: `http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/user/addToGallery?email=${email}`,
        data: data,
        headers: { "Content-Type": "multipart/form-data" }
    })
}

export const uploadUserProfileImage = (email: any, data: any) => {
    return axios({
        method: "put",
        url: `http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/user/mainPhoto?email=${email}`,
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
        transformRequest: (d) => d
    })
}

export const getAllPhotosByUserId = (id: any) => {
    return axios.get(`http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/user/userGallery/${id}`)
}

export const getPhotoDataById = (id: any) => {
    return axios.get(
        `http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/user/photo/${id}`
    )
}

export const deletePhotoById = (id: any) => {
    return axios.delete(
        `http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/user/photo/${id}`
    )
}

export const addComment = (payload: any) => {
    return axios.post(
        `http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/user/comment`,
        payload
    )
}

export const addLike = (photoId: any, userId: any) => {
    return axios.get(
        `http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/user/like/${photoId}/${userId}`
    )
}