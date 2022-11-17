import axios from "axios"
import { toast } from "react-toastify";
import { urlApi } from './../api';


export const getLoginAuth = (data) => async dispatch => {
    dispatch({ type: 'AUTH_LOADING' , payload : true })
    let resp = await axios.post(`${urlApi}/sign-in` , data)
    if(!resp.data.success) {
        toast.error(resp.data.message , {position : toast.POSITION.BOTTOM_RIGHT})
    } else {
        await localStorage.setItem('token' , resp.data.token)
        await dispatch({ type : 'GET_LOGIN' , payload : resp.data })
    }
    dispatch({ type: 'AUTH_LOADING' , payload : false })
}

export const LoadUser = () => {
    return (dispatch , getState) => {
        dispatch({ type: 'AUTH_LOADING' , payload : true })
        const token = getState()?.auth?.token
        dispatch({ type: 'AUTH_LOADING' , payload : false })
        if(token) {
            dispatch({ type : 'LOAD_USER' , payload : token })
        } else return null
    }
}

