import axiosClient from "./axiosClient"

class AuthAPI {
    HandleAuthentication = async (
        url: string,
        data?: any,
        method?: 'get' | 'put' | 'delete' | 'post',
    ) => {
        return await axiosClient(`/auth${url}`, {
            method: method ?? 'get',
            data,
        })
    }
}

const authenticationAPI = new AuthAPI();
export default authenticationAPI;

// untrack file
