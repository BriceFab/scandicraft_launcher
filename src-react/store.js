import { createHashHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './reducers'
import thunk from 'redux-thunk';
import { setToken } from './actions/user';
import CONFIG from '../config/config.json';
import hasExpired from '../common/services/token';
import { storeGet } from '../common/services/store';

export const history = createHashHistory()
const api = CONFIG.API_ENTRY_POINT;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(preloadedState) {
    const store = createStore(
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
    if (!hasExpired(token)) {
        store.dispatch(setToken(token))
    }

    return store
}