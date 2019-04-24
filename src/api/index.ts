import axios from 'axios';
import { BASE_URL } from '../common/constants';

  export const initApi = () => {
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = BASE_URL;
}