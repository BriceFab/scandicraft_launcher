import { ACTIONS } from "./actions_types";
import { axiosPost } from "../services/axios";
import config from '../../config/config.json';

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

        console.log('result user', user)

        if (user.remember && JSON.parse(user.remember) === true) {
            localStorage.setItem(config.STORAGE.REMEMBER_ME.KEY, true)
            localStorage.setItem(config.STORAGE.REMEMBER_ME.KEY_USERNAME, user.username.toString())
            localStorage.setItem(config.STORAGE.REMEMBER_ME.KEY_PASSWORD, user.password.toString())
        } else {
            localStorage.removeItem(config.STORAGE.REMEMBER_ME.KEY_USERNAME)
            localStorage.removeItem(config.STORAGE.REMEMBER_ME.KEY_PASSWORD)
            localStorage.setItem(config.STORAGE.REMEMBER_ME.REMEMBER_ME.KEY, false)
        }

        console.log('return ', res.data)

        return res;
    }, (error) => {
        let api_error = error;

        alert('Mauvais login')

        dispatch({
            type: ACTIONS.API.ERROR,
            payload: api_error
        });
    })
};

export const logout = () => dispatch => {
    dispatch({
        type: ACTIONS.USER.LOGOUT,
    });
};

export const token_expired = () => {
    localStorage.removeItem(CONFIG.STORAGE.TOKEN);
    toast.error('Votre session a expiré', {
        onClose: () => {
            window.location.href = '/login';
            window.location.reload(true);
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
