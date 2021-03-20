import Axios from "axios";
import {getCurrentUser} from '../index'
export const AxiosInstance = Axios.create();
AxiosInstance.interceptors.request.use(async config => {
    const user = getCurrentUser();
    if (user){
        config.headers = {
            Authorization: `Bearer ${user.access_token}`,
        }
    }
    return config;
});


