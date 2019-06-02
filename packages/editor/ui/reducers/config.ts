import { GET_CONFIG_INFO } from "../constants/actionTypes";

export default (state = {}, action) => {
    switch (action.type) {
        case GET_CONFIG_INFO:
            return {
                ...state
                //ajax
            }
        default:
            return state;
    }
};