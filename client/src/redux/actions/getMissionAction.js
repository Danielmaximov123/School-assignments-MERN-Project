import axios from 'axios';
import { Form } from 'react-router-dom';
import { toast } from 'react-toastify';
import { urlApi } from '../api';

export const getAllMissions = () => async dispatch => {
    dispatch({ type : 'MISSION_LOADING' , payload : true })
    let resp = await axios.get(`${urlApi}/missions`)
    dispatch({ type : 'GET_MISSIONS' , payload : resp.data })
    dispatch({ type : 'MISSION_LOADING' , payload : false })
}

export const getMission = (id) => async dispatch => {
    dispatch({ type : 'MISSION_LOADING' , payload : true })
    let resp = await axios.get(`${urlApi}/missions/${id}`)
    dispatch({ type : 'GET_MISSION' , payload : resp.data })
    dispatch({ type : 'MISSION_LOADING' , payload : false })
}
export const getAddMission = (data) => async dispatch => {
    dispatch({ type : 'MISSION_LOADING' , payload : true })
    let resp = await axios.post(`${urlApi}/missions/upload-mission` , data , {
        headers: { "Content-Type": "application/x-www-form-urlencoded"},
      })
    dispatch({ type : 'MISSION_LOADING' , payload : false })
    if(!resp.data.success) {
        toast.error(resp.data.message , {position : toast.POSITION.BOTTOM_RIGHT})
        dispatch({ type : 'MISSION_LOADING' , payload : false })
        return resp.data
    } else {
        dispatch({ type : 'ADD_MISSION' , payload : resp.data.newSubject })
        dispatch({ type : 'MISSION_LOADING' , payload : false })
        toast.success('המשימה נשלחה לסטודנטים !' , {position : toast.POSITION.BOTTOM_RIGHT})
        return resp.data
    }
}

export const getDeleteMission = (id) => async dispatch => {
    dispatch({ type : 'MISSION_LOADING' , payload : true })
    await axios.delete(`${urlApi}/missions/${id}`)
    dispatch({ type : 'DELETE_MISSION' , payload : id })
    dispatch({ type : 'MISSION_LOADING' , payload : false })
}

export const getRemoveFileFromMission = (data) => async dispatch => {
    dispatch({ type : 'MISSION_LOADING' , payload : true })
    // await axios.put(`${urlApi}/missions/remove-file/${data.missionId}` , data)
    dispatch({ type : 'REMOVE_FILE_FROM_MISSION' , payload : data })
    dispatch({ type : 'MISSION_LOADING' , payload : false })
}
