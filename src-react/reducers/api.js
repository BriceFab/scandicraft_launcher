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
            const { data, message } = action.payload;
            let err_message = 'Une erreur est survenue..';
            if (action.payload.data) {  //erreur api
                if (data.message.toLowerCase().includes('invalid credentials')) {
                    err_message = "Identifiants invalides";
                } else {
                    err_message = data.message;
                }
            } else {    //erreur autre
                if (message.includes('Network Error')) {    //no internet
                    err_message = "Vous n'avez pas de connexion internet..";
                } else {
                    err_message = message;
                }
            }
            toast.error(`Erreur: ${err_message}`)
            // console.log('api error payload', action.payload)
            // state.messages = displayError(action.payload);
            // state.response = action.payload.response;
            return { ...state };
        case ACTIONS.API.SUCCESS:
            // toast.success('api success')
            // state.messages = displaySuccess(action.payload.messages);
            // state.response = action.payload.response;
            return { ...state };
    }

}