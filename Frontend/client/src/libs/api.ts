import axios from "axios";
import { refreshToken as refresh } from "./apiUrls";



const api = axios.create({
    baseURL: "http://localhost:5000/api"
});



// Add a request interceptor
api.interceptors.request.use(
    async config => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = 'Bearer ' + accessToken;
        }
        return config;
    },
    error => {
        Promise.reject(error)
    }
);



// Add a response interceptor
api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');

            if (refreshToken) {
                const { data } = await refresh(refreshToken);

                if (data.accessToken) {
                    localStorage.setItem('accessToken', data.accessToken);
                    localStorage.setItem('refreshToken', data.refreshToken);
                    api.defaults.headers.common['Authorization'] = 'Bearer ' + data.accessToken;
                    return api(originalRequest);
                }
            }
        }
        return Promise.reject(error);
    }
);



export default api;