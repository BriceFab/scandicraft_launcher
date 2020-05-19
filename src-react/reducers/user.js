import { GET_USER } from '../actions/user';

const initialState = {
    current: {},
    token: null
}

export default function counter(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return Object.assign({}, state, {
                current: action.payload
            });
        default:
            return state;
    }
}
