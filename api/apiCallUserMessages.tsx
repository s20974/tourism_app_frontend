import axios from "axios"

axios.defaults.baseURL = 'http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com';
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const CHAT_SERVICE = "http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com";

export const findChatMessagesAxios = async (senderId: any, recipientId: any) => {
    return axios.get(CHAT_SERVICE + "/messages/" + senderId + "/" + recipientId);
}

export const findUserMessagesAxios = (id: any) => {
    return axios.get(`${CHAT_SERVICE}/user-chats?id=${id}`);
}

export const findChatMessageAxios = (id: any) => {
    return axios.get(`${CHAT_SERVICE}/messages/${id}`);
}