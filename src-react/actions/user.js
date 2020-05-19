import { ACTIONS } from "./actions_types";
import { axiosPost } from "../services/axios";

const URI = 'user';

export const setToken = (token) => (dispatch) => {
    dispatch({
        type: ACTIONS.USER.SET_TOKEN,
        payload: token
    });
}

export const register = (user) => (dispatch) => {
    return axiosPost(`${URI}/register`, user).then((res) => {
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
    return axiosPost(`${URI}/login`, user).then((res) => {
        dispatch({
            type: ACTIONS.USER.SET_TOKEN,
            payload: res.data.data.token
        });
        dispatch({
            type: ACTIONS.USER.LOGIN,
            payload: res.data.data
        });
        dispatch({
            type: ACTIONS.API.SUCCESS,
            payload: {
                response: res,
                messages: 'Vous êtes connecté'
            }
        });

        localStorage.setItem(CONFIG.STORAGE.REMEMBER, user.remember.toString())
        if (JSON.parse(user.remember) === true) {
            localStorage.setItem(CONFIG.STORAGE.PASSWORD, user.password.toString())
        } else {
            localStorage.removeItem(CONFIG.STORAGE.PASSWORD)
        }

        return res.data;
    }, (error) => {
        let api_error = error;
        if (error.response) {
            const headers = error.response.headers;

            const remaining = headers['x-ratelimit-remaining'];
            if (remaining > 0) {
                const limit = headers['x-ratelimit-limit'];
                toast.warn(`Essai de connexion n°${limit - remaining}/${limit}`);
            } else {
                const retry_date = moment(headers['x-ratelimit-reset'] * 1000);
                const retry_in = retry_date.diff(Date.now(), 'minutes');

                api_error = {
                    message: `Vous avez dépassé la limite d'essai de connexion. Réssayer dans ${retry_in} minutes`,
                }
            }
        }

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
