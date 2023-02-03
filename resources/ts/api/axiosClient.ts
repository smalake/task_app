import Axios from "axios";

const BASE_URL = "http://localhost";

export const axiosClient = Axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

axiosClient.interceptors.request.use(async (config) => {
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (err) => {
        throw err.response;
    }
);
