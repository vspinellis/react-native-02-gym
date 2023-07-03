import axios from 'axios';
import { AppError } from '../utils/AppError';

const API = axios.create({
  baseURL: 'http://192.168.10.4:3333'
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    } else {
      return Promise.reject(error);
    }
  }
);

export { API };
