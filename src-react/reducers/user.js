import { toast } from "react-toastify";
import config from "../../config/config.json";
import { ACTIONS } from "../actions/actions_types";

const initialState = {
    loggedIn: false,
    token: null,
    current: {}
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.USER.LOGIN: {
            state.loggedIn = true;
            localStorage.setItem(config.STORAGE.REMEMBER_ME.KEY_USERNAME, action.payload.user.username);
            window.location.reload();
            return { ...state };
        }
        case ACTIONS.USER.SET_TOKEN: {
            const token = action.payload;
            localStorage.setItem(config.STORAGE.KEY_TOKEN, token);
            state.token = token;
            state.loggedIn = true;
            const username = localStorage.getItem(config.STORAGE.REMEMBER_ME.KEY_USERNAME);
            toast.success(`Bienvenue ${username ? username : ''} !`);
            return { ...state };
        }
        case ACTIONS.USER.LOGOUT:
            localStorage.removeItem(config.STORAGE.KEY_TOKEN);
            if (JSON.parse(localStorage.getItem(config.STORAGE.REMEMBER_ME.KEY)) === false) {
                localStorage.removeItem(config.STORAGE.REMEMBER_ME.KEY_USERNAME);
            }
            state.loggedIn = false;
            state.token = null;
            state.current = null;
            return { ...state };
        default:
            return state;
    }
}

// import { GET_USER } from '../actions/user';

// const initialState = {
//     loggedIn: false,
//     token: null,
//     current: {}
// }

// export default function reducer(state = initialState, action) {
//     switch (action.type) {
//         case GET_USER:
//             return Object.assign({}, state, {
//                 current: action.payload
//             });
//         default:
//             return state;
//     }
// }
