const initialState = {
    cities : [],
    variousLoading: false
}

const variousReduces = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CITIES' :
            state = { ...state , cities : action.payload }  
            return state
        case 'VARIOUS_LOADING':
            state = { ...state, variousLoading: action.payload }
            return state
        default:
            return state;
    }
}

export default variousReduces