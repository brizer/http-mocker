import { GET_CONFIG_INFO, GET_CONFIG_INFO_FULFILLED, GET_CONFIG_INFO_REJECTED } from "../../constants/actionTypes";
const initState = {
    config: {},
    fetching: false,
    fetched: false,
    error: null
}

export default (state = initState, action) => {
    switch (action.type) {
        case GET_CONFIG_INFO:
            return {
                ...state,
                fetching: true
            }
        case GET_CONFIG_INFO_FULFILLED:
            return {
                ...state,
                fetching: false,
                fetched: true,
                config: action.payload
            }
        case GET_CONFIG_INFO_REJECTED:
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
        default:
            return state;
    }
};