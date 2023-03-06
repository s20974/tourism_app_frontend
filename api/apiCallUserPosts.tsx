import axios from "axios"

axios.defaults.baseURL = 'http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com';
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const setAuthorizationHeader = (props: { jwt:any, isLoggedIn:any  }) => {
    if (props.isLoggedIn) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${props.jwt}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const addPost = (data: any) => {
    return axios.post(`http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/posts/addPost`, data, {
        headers: { 
            "Content-Type": "multipart/form-data",
            "accept": 'application/json', 
        }
    })
}

export const getAllPostByUserId = (id: any) => {
    return axios.get(
        `http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/posts/getAllPostByUserId/${id}`
    )
}

export const getPostDataById = (id: any) => {
    return axios.get(
        `http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/posts/getPostData/${id}`
    )
}


export const addLikeToPost = (id: any, userId: any) => {
    return axios.get(
        `http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/posts/like/${id}/${userId}`
    )
}

export const addCommentToPost = (data: any) => {
    return axios.post(
        `http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/posts/comment`,
        data
    )
}

export const deletePost = (id: any) => {
    return axios.delete(
        `http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/posts/delete/${id}`
    )
}