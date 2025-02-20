import axios from "axios";

export const baseURL = import.meta.env.VITE_API_URL;

const ApiManager = axios.create({
    baseURL: baseURL,
    responseType: 'json'
})

export default ApiManager;