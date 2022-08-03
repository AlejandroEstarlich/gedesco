import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables();
const tableApi = axios.create({
    baseURL: VITE_API_URL
})
// Interceptors
tableApi.interceptors.request.use( config => {
    config.headers = {
        ...config.headers,
        // We could add a x-token here
    }
    return config;
})

export default tableApi;