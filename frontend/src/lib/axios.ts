import baseAxios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const axios = baseAxios.create({ baseURL: `${BASE_URL}/api/v1`, timeout: 60000, withCredentials: true });

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject({
            status: error?.response?.status || 500,
            message: error?.response?.data?.message || "Something went wrong",
        });
    }
);

export default axios;
