import { ACTIONS } from "./actions_types";
import routes from '../routes/routes.json';
import { axiosPost } from "../../common/services/axios";
const Store = require('electron-store');
import CONFIG from '../../config/config.json';
import { toast } from "react-toastify";

const store = new Store();

export const setToken = (token) => (dispatch) => {
    dispatch({
        type: ACTIONS.USER.SET_TOKEN,
        payload: token
    });
}

export const register = (user) => (dispatch) => {
    return axiosPost(`register`, user).then((res) => {
        dispatch({
            type: ACTIONS.API.SUCCESS,
            payload: {
                response: res,
                messages: 'Compte créer avec succès. Confirmez votre adresse email'
            }
        });
        dispatch({
            type: ACTIONS.USER.REGISTER,
            payload: res.data
        });
        return res.data;
    }, (error) => {
        dispatch({
            type: ACTIONS.API.ERROR,
            payload: error
        });
    });
};

export const login = (user) => dispatch => {
    return axiosPost(`login_check`, user).then((res) => {
        // console.log('res', res)
        dispatch({
            type: ACTIONS.USER.SET_TOKEN,
            payload: res.data.token
        });
        dispatch({
            type: ACTIONS.USER.LOGIN,
            payload: res.data,
            param: user
        });
        dispatch({
            type: ACTIONS.API.SUCCESS,
            payload: {
                response: res,
                messages: 'Vous êtes connecté'
            }
        });

        if (user.remember && JSON.parse(user.remember) === true) {
            store.set(CONFIG.STORAGE.REMEMBER_ME.KEY, true)
            store.set(CONFIG.STORAGE.REMEMBER_ME.KEY_USERNAME, user.username.toString())
            store.set(CONFIG.STORAGE.REMEMBER_ME.KEY_PASSWORD, user.password.toString())
        } else {
            store.delete(CONFIG.STORAGE.REMEMBER_ME.KEY_USERNAME)
            store.delete(CONFIG.STORAGE.REMEMBER_ME.KEY_PASSWORD)
            store.set(CONFIG.STORAGE.REMEMBER_ME.KEY, false)
        }

        return res;
    }, (error) => {
        dispatch({
            type: ACTIONS.API.ERROR,
            payload: error.data
        });
    })
};

export const logout = () => dispatch => {
    dispatch({
        type: ACTIONS.USER.LOGOUT,
    });
};

export const token_expired = () => {
    store.delete(CONFIG.STORAGE.TOKEN);
    toast.error('Votre session a expiré', {
        onClose: () => {
            window.location.href = routes.LOGIN;
            // window.location.reload(true);
        }
    });
};

// export const GET_USER = 'GET_USER';

// export function increment() {
//     return {
//         type: INCREMENT_COUNTER
//     };
// }

// export function decrement() {
//     return {
//         type: DECREMENT_COUNTER
//     };
// }

// export function incrementIfOdd() {
//     return (dispatch, getState) => {
//         const { counter } = getState();

//         if (counter % 2 === 0) {
//             return;
//         }

//         dispatch(increment());
//     };
// }

// export function incrementAsync(delay = 1000) {
//     return (dispatch) => {
//         setTimeout(() => {
//             dispatch(increment());
//         }, delay);
//     };
// }
