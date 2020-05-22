import { ACTIONS } from "../actions/actions_types";
import { toast } from "react-toastify";

const initialState = {
    response: {},
    messages: []
};

export default function reducer(state = initialState, action) {

    switch (action.type) {
        default:
            return state;
        case ACTIONS.API.ERROR:
            toast.error(`api error: ${action.payload.message}`)
            console.log('api error payload', action.payload)
            // state.messages = displayError(action.payload);
            // state.response = action.payload.response;
            return { ...state };
        case ACTIONS.API.SUCCESS:
            console.log('api success', action.payload)
            // toast.success('api success')
            // state.messages = displaySuccess(action.payload.messages);
            // state.response = action.payload.response;
            return { ...state };
    }

}