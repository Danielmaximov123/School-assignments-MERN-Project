import axios from "axios"
import { urlApi } from "../api"
import { toast } from 'react-toastify';

export const getAllSubjects = () => async dispatch => {
    dispatch({ type : 'SUBJECT_LOADING' , payload : true })
    let resp = await axios.get(`${urlApi}/subjects`)
    dispatch({ type : 'GET_SUBJECTS' , payload : resp.data })
    dispatch({ type : 'SUBJECT_LOADING' , payload : false })
}

export const getAddSubject = (data) => async dispatch => {
    dispatch({ type : 'SUBJECT_LOADING' , payload : true })
    let resp = await axios.post(`${urlApi}/subjects` , data)
    if(!resp.data.success) {
        toast.error(resp.data.message , {position : toast.POSITION.BOTTOM_RIGHT})
        dispatch({ type : 'SUBJECT_LOADING' , payload : false })
    } else {
        dispatch({ type : 'ADD_SUBJECT' , payload : resp.data.newSubject })
        dispatch({ type : 'SUBJECT_LOADING' , payload : false })
        toast.success(resp.data.message , {position : toast.POSITION.BOTTOM_RIGHT})
    }
}

export const getUpdateSubject = (id , data) => async dispatch => {
    let resp = await axios.put(`${urlApi}/subjects/${id}` , data)
    dispatch({ type : 'UPDATE_MISSION' , payload : resp.data })
    toast.success('הנושא עודכן !' , {position : toast.POSITION.BOTTOM_RIGHT})
}

export const getDeleteSubject = (id) => async dispatch => {
    dispatch({ type : 'SUBJECT_LOADING' , payload : true })
    await axios.delete(`${urlApi}/subjects/${id}`)
    dispatch({ type : 'DELETE_SUBJECT' , payload : id })
    dispatch({ type : 'SUBJECT_LOADING' , payload : false })
}