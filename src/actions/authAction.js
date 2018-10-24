import axios from 'axios';

import { SET_CURRENT_USER, LOGOUT_USER, GET_ERRORS } from './types';
const URL = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site13/ProjectWebService.asmx'
//Register


//Login
export const loginUser = (userData) => dispatch => {
    axios.post(`${URL}/Login`,{
        email: userData.email,
        password: userData.password
    })
    .then(res => { 
        //console.warn(res.data.d); 
        
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
        //SET_CURRENT_USER
        dispatch({
            type:SET_CURRENT_USER,
            payload: JSON.parse(res.data.d)
        })

    })
    .catch(err => 
        //console.warn(JSON.parse(err.response.data.d))
        dispatch({
            type: GET_ERRORS,
            payload: JSON.parse(err.response.data.d)
        })
    
    );
}


export const logoutUser  = () =>  {
    return {
        type: LOGOUT_USER,
        payload: false
    }
}

export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        payload: user
    }
}