import axios from 'axios';
import CONFIG from '../../config/config.json';
import jwt from 'jsonwebtoken';
import { token_expired } from '../actions/user';

let instance = axios.create({
    baseURL: CONFIG.API.ENTRY_POINT,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem(CONFIG.STORAGE.KEY_TOKEN) || 'none'}`,
    },
    // adapter: require('axios/lib/adapters/xhr')
    // adapter: require('axios/lib/adapters/http'),
});

instance.interceptors.request.use((config) => {
    //verify token has expired
    let token = config.headers.Authorization.replace('Bearer ', '') || localStorage.getItem(CONFIG.STORAGE.KEY_TOKEN);
    if (token === 'none') {
        token = localStorage.getItem(CONFIG.STORAGE.KEY_TOKEN);
    }

    if (token !== null) {
        try {
            let decoded = jwt.decode(token);

            if (Date.now() / 1000 > decoded.exp) {
                console.log("token expired");

                token_expired();
            } else {
                console.log("token not expired");
            }
        } catch (err) {
            console.log('token decode', err)
        }
    }

    //encrypt request
    // if (process.env.NODE_ENV !== 'development') {
    //     try {
    //         config.data = {
    //             encrypted: true,
    //             data: jwt.sign(config.data, CONFIG.API.SECRET_ENCRYPTION)
    //         }
    //     } catch (err) {
    //         console.log('error when encrypt request', err);
    //     }
    // }

    return config;
}, (error) => {
    // console.log("axios error", error)
    return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
    if (response.data.encrypted) {
        try {
            response.data = jwt.verify(response.data.data, CONFIG.API.SECRET_ENCRYPTION);
        } catch (err) {
            console.log('error when decrypt response', err);
        }
    }
    return response;
}, (error) => {
    return Promise.reject(error);
});

export const axiosGet = (url) => {
    return instance.get(url);
};

export const axiosPost = (url, data) => {
    return instance.post(url, data);
};

export const axiosPut = (url, data) => {
    return instance.put(url, data);
};

export const axiosDelete = (url, data) => {
    return instance.delete(url, data);
};