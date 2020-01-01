import Axios from 'axios'
import {logOut} from './index'
let AxiosInstance = Axios.create({
  headers: {
    'Content-Type': 'application/json',
  },

});

AxiosInstance.interceptors.request.use(
  config => {
      const token = window.localStorage.getItem('Nili');
      console.log("axios")
      if (token) {
        console.log("token")
        config.headers['Authorization'] = token;
      }
      return config;
  },
  error => {
      return error
  });

AxiosInstance.interceptors.response.use(
    (response) => response,
  (error) => {
    if (error.response.status === 401) {
      console.log("STATUS CODE 401");
      logOut()
    }
    return error;
  }
)

export default AxiosInstance