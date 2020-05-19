import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as reduxFormReducer } from 'redux-form';
import userReducer from './user';

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    form: reduxFormReducer,
    user: userReducer
    //other reducers
});

export default createRootReducer;