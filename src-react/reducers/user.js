import { toast } from "react-toastify";
import { ACTIONS } from "../actions/actions_types";
import CONFIG from '../../config/config.json';
import jwt from 'jsonwebtoken';
import { storeSet, store, storeGet } from '../../common/services/store';

const initialState = {
    loggedIn: false,
    token: null,
    current: {}
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.USER.LOGIN: {
            state.loggedIn = true;
            console.log('reducer payload', action.payload)
            state.current = action.param;
            // storeSet(config.STORAGE.REMEMBER_ME.KEY_USERNAME, action.payload.user.username);
            // window.location.reload();
            return { ...state };
        }
        case ACTIONS.USER.SET_TOKEN: {
            const token = action.payload;
            console.log('set token', token)
            storeSet(CONFIG.STORAGE.KEY_TOKEN, token);
            state.token = token;
            state.loggedIn = true;
            let decoded = jwt.decode(token);
            const username = decoded.username;
            state.current = {
                username: username,
                roles: decoded.roles
            }
            console.log('reduce state', state.current)
            toast.success(`Salut ${username ? username : ''} !`);
            return { ...state };
        }
        case ACTIONS.USER.LOGOUT:
            store.delete(CONFIG.STORAGE.KEY_TOKEN);
            if (storeGet(CONFIG.STORAGE.REMEMBER_ME.KEY) === false) {
                store.delete(CONFIG.STORAGE.REMEMBER_ME.KEY_USERNAME);
                store.delete(CONFIG.STORAGE.REMEMBER_ME.KEY_PASSWORD);
            }
            state.loggedIn = false;
            state.token = null;
            state.current = null;
            return { ...state };
        default:
            return state;
    }
}