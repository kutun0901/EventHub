import axiosClient from "./axiosClient"

class AuthAPI {
    HandleAuthentication = async (
        url: string,
        data?: any,
        method?: 'get' | 'put' | 'delete',
    ) => {
        return await axiosClient('')
    }
}
