import axios from "axios";

// Axios Interceptor Instance
const AxiosInstance = axios.create({
    baseURL: "https://students-hackaton.vercel.app/", 
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDVlODUyYzI2MjRhMGJmMjgxZWM2ZSIsImVtYWlsIjoidm91Y2hoZWFuZy5tb21AaW5zdGl0dXRlLnBzZS5uZ28iLCJpYXQiOjE3Mjg0NDQ3MDgsImV4cCI6MTczMTAzNjcwOH0.h77BqldXH8k-TP8m9G_t4S6drESJYeMAm9qi0eqPtd8"
}
});

AxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        console.log(token)
        // If token is present, add it to request's Authorization Header
        if (token) {
            // config.headers['Authorization'] = `Bearer ${token}`; // Using Authorization header
            config.headers['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDVlODUyYzI2MjRhMGJmMjgxZWM2ZSIsImVtYWlsIjoidm91Y2hoZWFuZy5tb21AaW5zdGl0dXRlLnBzZS5uZ28iLCJpYXQiOjE3Mjg0NDQ3MDgsImV4cCI6MTczMTAzNjcwOH0.h77BqldXH8k-TP8m9G_t4S6drESJYeMAm9qi0eqPtd8`;
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
