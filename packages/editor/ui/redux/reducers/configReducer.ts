import { GET_CONFIG_INFO, GET_CONFIG_INFO_FULFILLED, GET_CONFIG_INFO_REJECTED, SET_CONFIG_INFO, SET_CONFIG_INFO_FULFILLED, SET_CONFIG_INFO_REJECTED, GET_ROUTE_INFO_FULFILLED, GET_ROUTE_INFO, SET_ROUTE_INFO_FULFILLED } from "../../constants/actionTypes";
import { GET_ROUTE } from "ui/constants/api";
const initState = {
    config: {},
    content:'',
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
        case SET_CONFIG_INFO:
            return {
                ...state,
                fetching: true
            }
        case SET_CONFIG_INFO_FULFILLED:
            return {
                ...state,
                fetching: false,
                fetched: true
            }
        case SET_CONFIG_INFO_REJECTED:
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
        case GET_ROUTE_INFO:
            return {
                ...state,
                fetching: true
            }
        case GET_ROUTE_INFO_FULFILLED:
            return {
                ...state,
                fetching: false,
                fetched: true,
                content:action.payload
            }
        case SET_ROUTE_INFO_FULFILLED:
            return {
                ...state,
                fetching: false,
                fetched:true
            }
        default:
            return state;
    }
};