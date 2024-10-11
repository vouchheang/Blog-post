import axios from "axios";

// Axios Interceptor Instance
const AxiosInstance = axios.create({
    baseURL: "https://students-hackaton.vercel.app/",
    headers: {
        "Content-Type": "application/json"
    }
});

AxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        // If token is present, add it to the request's Authorization Header
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Use the token stored in localStorage
        }
        return config;
    },
    (error) => {
        // Handle request errors here
        return Promise.reject(error);
    }
);

// Axios Interceptor: Response Method
AxiosInstance.interceptors.response.use(
    (response) => {
        // Can be modified response
        return response;
    },
    (error) => {
        // Handle response errors here
        return Promise.reject(error);
    }
);

export default AxiosInstance; // Export the Axios instance
