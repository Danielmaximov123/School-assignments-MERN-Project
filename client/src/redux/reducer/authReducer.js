import jwtDecode from 'jwt-decode'

const initialState = {
    token: localStorage.getItem('token'),
    auth: {},
    authLoading: false
}

const authReduces = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_LOGIN':
            let data = jwtDecode(action.payload.token);
            return {
                ...initialState,
                token : action.payload.token,
                auth : {...data} 
            }
        case 'LOAD_USER':
            let data1 = jwtDecode(action.payload);
            return {
                ...initialState,
                token : action.payload,
                auth : {...data1} 
            }
        case 'LOG_OUT_USER':
            localStorage.clear()
            return {
                auth : {}
            }
        case 'AUTH_LOADING':
            state = { ...state, authLoading: action.payload }
            return state
        default:
            return state;
    }
}

export default authReduces