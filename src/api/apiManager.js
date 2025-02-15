import axios from "axios";

export const baseURL = "http://localhost:8888/api"

const ApiManager = axios.create({
    baseURL: baseURL,
    responseType: 'json'
})

export default ApiManager;