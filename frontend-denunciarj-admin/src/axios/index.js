import axios from 'axios';
// import router from '@/router';
import router from '../router'


const ax = axios.create({    
        // withCredentials:true ,
         baseURL: 'http://localhost:8000/api/'       
      
});

ax.interceptors.request.use(function (config) {
        const token = localStorage.getItem('_token')      

        if (token) {
                config.headers['Authorization']  = 'Bearer ' + token; 
        }
        return config;
}, function (error) {                
        // Do something with request error
        return Promise.reject(error);
});

ax.interceptors.response.use(null, error => {
        // let path = '/';
        // switch (error.response.status) {
        //   case 401: path = '/login'; break;
        //   case 403: path = '/login'; break;
        //   case 404: path = '/404'; break;
        // }
        // router.push(path);
        if(error.response.status==403){
         router.push('/login');    
        }

        return Promise.reject(error);
      });
      

export default ax;

