import axios from 'axios'
import { GET_CONFIG_INFO, GET_CONFIG_INFO_FULFILLED, GET_CONFIG_INFO_REJECTED, SET_CONFIG_INFO, SET_CONFIG_INFO_FULFILLED, GET_ROUTE_INFO_FULFILLED } from '../../constants/actionTypes';
import { GET_CONFIG, SET_CONFIG, GET_ROUTE } from '../../constants/api';


export const fetchConfig = () => {
    return (dispatch => {
        dispatch({ type: GET_CONFIG_INFO })
        axios.get(GET_CONFIG)
            .then((response) => {
                if(response.data.result == 1){
                    const result = response.data.data
                    let payload = {}
                    
                    const methodReg = /(\w+)\s(.+)/g

                    payload['mockFileName'] = result.mockFileName
                    payload['routes'] = []
                    if(result.routes){
                        Object.keys(result.routes).forEach((key,index)=>{
                            const route = key
                            let routeObj:any = {}
                            routeObj.key = index
                            routeObj.path = result.routes[key].path
                            routeObj.ignore = result.routes[key].ignore||false
                            routeObj.method = route.replace(methodReg, '$1')  
                            routeObj.url = route.replace(methodReg, '$2')  
                            payload['routes'].push(routeObj)
                        })
                    }
                    dispatch({ type: GET_CONFIG_INFO_FULFILLED, payload: payload })
                }else{
                    dispatch({ type: GET_CONFIG_INFO_REJECTED, payload: `something is wrong ` })
                }
            })
            .catch(err => {
                dispatch({ type: GET_CONFIG_INFO_REJECTED, payload: err })
            })
    })
}

export const setConfig = (data) => {
    return (dispatch => {
        if(!data){return}
        dispatch({ type: SET_CONFIG_INFO })
        let config:any = {}
        config.mockFileName = 'mocks'
        config.routes = {}
        data.forEach(v=>{
            config.routes[`${v.method} ${v.url}`]={
                'path':v.path,
                'ignore':v.ignore
            }
        })
        axios.post(SET_CONFIG,{
            config:config
        })
        .then((response) => {
            if (response.data.result == 1) {
                //dispatch multi actions
                dispatch(fetchConfig())
                dispatch({ type: SET_CONFIG_INFO_FULFILLED, payload: true })
            } else {
                dispatch({ type: GET_CONFIG_INFO_REJECTED, payload: `something is wrong ` })
            }
        })
        .catch(err => {
            dispatch({ type: GET_CONFIG_INFO_REJECTED, payload: err })
        })
    })
}


export const getRouteInfo = (data)=>{
    return (dispath=>{
        if(!data) return
        let path = ''
        path = data.path
        axios.get(GET_ROUTE,{
            params:{
                path:path
            }
        })
        .then((response)=>{
            if(response.data.result == 1){
                dispath({type: GET_ROUTE_INFO_FULFILLED,payload:response.data.content})
            }else{
                dispath({type: GET_ROUTE_INFO_FULFILLED,payload:undefined})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
}