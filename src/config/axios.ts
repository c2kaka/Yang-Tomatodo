import axios from "axios";
const appID = "MnhiLA7MQho41mkngez2DJ57";
const appSecret = "gMyzZ7DeHXEcgLyy2DPXrDKo";

/* tslint:disable:no-string-literal */
const instance = axios.create({
    baseURL: 'https://gp-server.hunger-valley.com/',
    headers: {
        't-app-id': appID,
        't-app-secret': appSecret
    }
});

// Add a request interceptor
instance.interceptors.request.use((config)=>{
    // Do something before request is sent
    const xToken  =  localStorage.getItem("x-token");
    if(xToken ){
        config.headers['Authorization']=`Bearer ${xToken}`;
    }
    return config;
},  (error)=>{
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use( (response)=>{
    // Do something with response data
    if(response.headers['x-token']){
        localStorage.setItem('x-token',response.headers['x-token']);
    }
    return response;
},  (error)=>{
    // Do something with response error
    return Promise.reject(error);
});

/* tslint:enable:no-string-literal */
export  default  instance;