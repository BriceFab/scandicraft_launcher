import { createHashHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './reducers'
import thunk from 'redux-thunk';
import { setToken, token_expired } from './actions/user';
import CONFIG from '../config/config.json';
import hasExpired from '../common/services/token';
import { store, storeGet } from '../common/services/store';
import { toast } from 'react-toastify';

export const history = createHashHistory()
const api = CONFIG.API_ENTRY_POINT;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(preloadedState) {
    const redux_store = createStore(
        createRootReducer(history),
        preloadedState,
        composeEnhancers(
            applyMiddleware(
                routerMiddleware(history),
                thunk.withExtraArgument({ api })
            ),
        ),
    )

    //dispatch login with token
    const token = storeGet(CONFIG.STORAGE.KEY_TOKEN);
    if (token !== null) {
        if (!hasExpired(token)) {
            redux_store.dispatch(setToken(token))
        } else {
            token_expired();
        }
    } else if (store.get(CONFIG.STORAGE.TOKEN_EXPIRED) === true) {
        toast.error('Votre session a expiré !');
        console.warn('session has expired');
        store.delete(CONFIG.STORAGE.TOKEN_EXPIRED);
    }

    return redux_store
}