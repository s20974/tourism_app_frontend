import axios from "axios"

axios.defaults.baseURL = 'http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com';
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export function addTrip(body: any){
    return axios.post(`http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/trip/add`, body)
}

export const getAllTripsByUserId = (id: any) => {
    return axios.get(
        `http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/trip/byUserId/?id=${id}`
    )
}

export const joinTrip = (userId: any, tripId: any) => {
    return axios.post(
        `http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/api/v1/trip/join?userId=${userId}&tripId=${tripId}`
    )
}

export function findTripsByFilter(params: any){
    return axios.get(`http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com${params}`)
}