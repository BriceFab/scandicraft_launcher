import axios from 'axios';
import CONFIG from '../../config/config.json';
const Store = require('electron-store');
import { token_expired } from '../../src-react/actions/user';
import hasExpired from './token';

const store = new Store();

let instance = axios.create({
    baseURL: CONFIG.API.ENTRY_POINT,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${getToken() || 'none'}`,
    },
    responseType: 'json',
    validateStatus: false
    // adapter: require('axios/lib/adapters/xhr')
    // adapter: require('axios/lib/adapters/http'),
});

instance.interceptors.request.use((config) => {
    //verify token has expired
    let token = config.headers.Authorization.replace('Bearer ', '') || getToken();
    if (token === 'none') {
        token = getToken();
    }

    if (token && hasExpired(token)) {
        token_expired();
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
    if (response.status >= 200 && response.status < 300) {
        // console.log('axios intercept response ok', response.data)
        return response;
    } else {
        // console.log('axios intercept response err', response.data)
        return Promise.reject(response);
    }
}, (error) => {
    return Promise.reject(error);
});

export const axiosGet = (url) => {
    return instance.get(url);
};

export const axiosPost = (url, data) => {
    return instance.post(url, data);
};

export const axiosPostWithConfig = (url, data, config) => {
    return instance.post(url, data, config);
};

export const axiosPut = (url, data) => {
    return instance.put(url, data);
};

export const axiosDelete = (url, data) => {
    return instance.delete(url, data);
};

function getToken() {
    return store.get(CONFIG.STORAGE.KEY_TOKEN);
}