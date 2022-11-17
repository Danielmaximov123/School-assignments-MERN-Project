import axios from 'axios';
import { urlApi } from './../api';


export const getAllCities = () => async dispatch => {
    dispatch({ type : 'VARIOUS_LOADING' , payload : true })
    let resp = await axios.get(`${urlApi}/various/cities`)
    dispatch({ type : 'GET_CITIES' , payload : resp.data }) 
    dispatch({ type : 'VARIOUS_LOADING' , payload : false }) 
}