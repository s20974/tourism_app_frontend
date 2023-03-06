import axios from "axios"

axios.defaults.baseURL = 'http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com';
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const complaintPost = (postId: any) => {
    return axios.get(`http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/complaint/post?postId=${postId}`)
}

export const complaintPhoto = (photoId: any) => {
    return axios.get(`http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/complaint/photo?photoId=${photoId}`)
}

export const getAllComplaintPosts = () => {
    return axios.get(`http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/complaint/getAllPostComplaint`)
}

export const getAllComplaintPhotos = () => {
    return axios.get(`http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/complaint/getAllPhotoComplaint`)
}

export const deletePost = (postId: any) => {
    return axios.delete(`http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/complaint/deletePost?postId=${postId}`)
}

export const deletePhoto = (photoId: any) => {
    return axios.delete(`http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/complaint/deletePhoto?photoId=${photoId}`)
}

export const deletePostComplaint= (postId: any) => {
    return axios.delete(`http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/complaint/deleteComplaintPost?postId=${postId}`)
}

export const deletePhotoComplaint = (photoId: any) => {
    return axios.delete(`http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/complaint/deleteComplaintPhoto?photoId=${photoId}`)
}