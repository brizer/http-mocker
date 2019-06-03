import axios from 'axios'
import { GET_CONFIG_INFO, GET_CONFIG_INFO_FULFILLED, GET_CONFIG_INFO_REJECTED } from '../../constants/actionTypes';
import { GET_CONFIG } from '../../constants/api';

export const fetchConfig = () => {
    return dispatch => {
        dispatch({ type: GET_CONFIG_INFO })
        axios.get(GET_CONFIG)
            .then((response) => {
                if(response.data.result == 1){
                    dispatch({ type: GET_CONFIG_INFO_FULFILLED, payload: response.data.data })
                }else{
                dispatch({ type: GET_CONFIG_INFO_REJECTED, payload: `something is wrong ` })

                }
            })
            .catch(err => {
                dispatch({ type: GET_CONFIG_INFO_REJECTED, payload: err })
            })
    }
}