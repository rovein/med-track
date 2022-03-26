import axios from 'axios';
import {SERVER_URL} from "./Constants";
import delay from "./DelayUtil";

const instance = axios.create({
    baseURL: SERVER_URL
})
instance.interceptors.request.use(async config => {
    await delay();
    console.log("REQUEST")
    console.log(config)
    if (localStorage.getItem("Token") != null) {
        const token = localStorage.getItem("Token");
        config.headers.common.Authorization = `Bearer ${token}`;
        config.headers['Accept'] = "application/json";
        config.headers['Content-Type'] = "application/json";
    }
    return config;
}, error => Promise.reject(error));

instance.interceptors.response.use(config => {
    console.log("RESPONSE")
    console.log(config)
    return config;
}, error => Promise.reject(error))

export default instance;

export const authInstance = axios.create({
    baseURL: SERVER_URL
});

authInstance.interceptors.request.use(async (request) => {
    await delay();
    return request;
});
