import axios from "axios"
import { urlApi } from "../api"
import { toast } from 'react-toastify';


export const getAllUsers = () => async dispatch => {
    dispatch({ type : 'USERS_LOADING' , payload : true })
    let resp = await axios.get(`${urlApi}/users`)
    dispatch({ type : 'GET_USERS' , payload : resp.data })
    dispatch({ type : 'USERS_LOADING' , payload : false })
}

export const getAddUser = (data) => async dispatch => {
    dispatch({ type : 'USERS_LOADING' , payload : true })
    let resp = await axios.post(`${urlApi}/users` , data)
    if(!resp.data.success) {
        toast.error(resp.data.message , {position : toast.POSITION.BOTTOM_RIGHT})
        dispatch({ type : 'USERS_LOADING' , payload : false })
        return resp.data.success
    } else {
        dispatch({ type : 'ADD_USER' , payload : resp.data.user })
        dispatch({ type : 'USERS_LOADING' , payload : false })
        toast.success(`המשתמש ${resp.data.user.fName} נוסף בהצלחה !` , {position : toast.POSITION.BOTTOM_RIGHT})
        return resp.data.success
    }
}

export const getDeleteUser = (id) => async dispatch => {
    dispatch({ type : 'USERS_LOADING' , payload : true })
    await axios.delete(`${urlApi}/users/${id}`)
    dispatch({ type : 'DELETE_USER' , payload : id })
    dispatch({ type : 'USERS_LOADING' , payload : false })
}

export const getUpdateUser = (id , data) => async dispatch => {
    dispatch({ type : 'USERS_LOADING' , payload : true })
    let resp = await axios.put(`${urlApi}/users/${id}` , data)
    dispatch({ type : 'UPDATE_USER' , payload : resp.data })
    dispatch({ type : 'USERS_LOADING' , payload : false })
}

export const getUpdateProfilePictureUser = (id , data) => async dispatch => {
    dispatch({ type : 'USERS_LOADING' , payload : true })
    let resp = await axios.put(`${urlApi}/users/upload-profile-picture/${id}`, data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
    dispatch({ type : 'UPDATE_USER' , payload : resp.data })
    dispatch({ type : 'USERS_LOADING' , payload : false })
}

export const getDeleteProfilePictureUser = (id ) => async dispatch => {
    dispatch({ type : 'USERS_LOADING' , payload : true })
    let resp = await axios.delete(`${urlApi}/users/delete-profile-picture/${id}`);
    dispatch({ type : 'UPDATE_USER' , payload : resp.data })
    dispatch({ type : 'USERS_LOADING' , payload : false })
}

export const getVerifyUser = (id , activated) => async dispatch => {
    dispatch({ type : 'USERS_LOADING' , payload : true })
    let resp = await axios.put(`${urlApi}/users/verify/${id}` , activated)
    dispatch({ type : 'UPDATE_USER' , payload : resp.data })
    dispatch({ type : 'USERS_LOADING' , payload : false })
}

export const getChangePasswordUser = (id , data) => async dispatch => {
    dispatch({ type : 'USERS_LOADING' , payload : true })
    let resp = await axios.put(`${urlApi}/users/change-password/${id}` , data)
    if(!resp.data.success) {
        toast.error(resp.data.message , {position : toast.POSITION.BOTTOM_RIGHT})
        dispatch({ type : 'USERS_LOADING' , payload : false })
        return resp.data
    } else {
        dispatch({ type : 'USERS_LOADING' , payload : false }) 
        return resp.data
    }
}

export const getForgetPassword = (email) => async dispatch => {
    dispatch({ type: 'USERS_LOADING' , payload : true })
    let resp = await axios.post(`${urlApi}/users/forgot-password` , {email})
    if(!resp.data.success) {
        toast.error(resp.data.message , {position : toast.POSITION.BOTTOM_RIGHT})
        dispatch({ type: 'USERS_LOADING' , payload : false })
        return resp.data
    } else {
        toast.success(resp.data.message , {position : toast.POSITION.BOTTOM_RIGHT})
        dispatch({ type: 'USERS_LOADING' , payload : false })
        return resp.data
    }
}



