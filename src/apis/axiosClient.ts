import axios from "axios";
import queryString from 'query-string' //is a method from the query-string library. It converts an object into a URL query string.
import { appInfo } from "../constants/appInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getAccessToken = async () => {
    const res = await AsyncStorage.getItem('auth');

    return res ? JSON.parse(res).accesstoken : '';
  };

const axiosClient = axios.create({
    baseURL: appInfo.BASE_URL, // Setting the base URL for all requests made by this axios instance.
    paramsSerializer: params => queryString.stringify(params) // Custom serializer for query string parameters using queryString library.
});

axiosClient.interceptors.request.use(async (config: any) => {
    const accesstoken = await getAccessToken();

    config.headers = {
      Authorization: accesstoken ? `Bearer ${accesstoken}` : '',
      Accept: 'application/json',
      ...config.headers,
    };

    config.data;
    return config;
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
