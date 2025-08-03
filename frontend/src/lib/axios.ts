import baseAxios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const axios = baseAxios.create({ baseURL: `${BASE_URL}/api/v1`, timeout: 60000, withCredentials: true });

axios.interceptors.response.use(
    (response) => {
        if (response?.data?.data?.token) {
            document.cookie = `token=${response.data.data.token}; path=/; expires=${new Date(Date.now() + 60 * 60 * 24 * 7).toUTCString()}`;
        }

        return response;
    },
    (error) => {
        return Promise.reject({
            status: error?.response?.status || 500,
            message: error?.response?.data?.message || "Something went wrong",
        });
    }
);

export default axios;
