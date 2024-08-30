import axios from "axios";
import { refreshToken as refresh } from '../services/apiUrls';



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

        console.log('Error response:', error.response);

        if (error.response.status === 401) {
            if (originalRequest._retry) {
                console.log('Retrying the original request failed, redirecting to login.');
                return Promise.reject(error);
            }

            originalRequest._retry = true;

            const refreshToken = localStorage.getItem('refreshToken');
            console.log('Attempting to refresh token with:', refreshToken);

            if (refreshToken) {
                try {
                    const { data } = await axios.post('http://localhost:5000/api/auth/admin/token', { token: refreshToken });

                    if (data.accessToken) {
                        console.log('New tokens received:', data);
                        localStorage.setItem('accessToken', data.accessToken);
                        localStorage.setItem('refreshToken', data.refreshToken);
                        api.defaults.headers.common['Authorization'] = 'Bearer ' + data.accessToken;

                        return api(originalRequest);
                    }
                } catch (err) {
                    console.error('Failed to refresh token:', err);
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    // window.location.href = '/login';
                    return Promise.reject(err);
                }
            } else {
                console.log('No refresh token found, redirecting to login.');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                // window.location.href = '/login';
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);



export default api;