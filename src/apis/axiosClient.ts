import axios from "axios";
import queryString from 'query-string' //is a method from the query-string library. It converts an object into a URL query string.
import { appInfo } from "../constants/appInfo";

const axiosClient = axios.create({
    baseURL: appInfo.BASE_URL, // Setting the base URL for all requests made by this axios instance.
    paramsSerializer: params => queryString.stringify(params) // Custom serializer for query string parameters using queryString library.
});

axiosClient.interceptors.request.use(async (config: any) => {
    // Interceptor to modify the request configuration before the request is sent.
    config.headers = {
        Authorization: '', // Setting the Authorization header (usually for tokens, though it's empty here).
        Accept: 'application/json', // Setting the Accept header to expect JSON responses.
        ...config.headers // Merging any other headers that may already be set in the config.
    };

    config.data;

    return config; // Returning the modified config.
});

axiosClient.interceptors.response.use(res => {
    // Interceptor to handle the response.
    if (res.data && res.status === 200) { // Checking if the response contains data and has a 200 (OK) status.
        return res.data; // Returning the data from the response.
    }

    throw new Error('Error'); // Throwing an error if the response does not meet the criteria.
}, error => {
    // Handling errors from the response.
    console.log(`Error api ${JSON.stringify(error)}`); // Logging the error to the console.
    throw new Error(error.response); // Throwing an error with the response details.
});

export default axiosClient
