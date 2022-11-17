const initialState = {
    users: [],
    usersLoading: false
}

const usersReduces = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USERS':
            state = { ...state , users : action.payload }    
            return state
        case 'ADD_USER' : 
            state = { ...state , users : [ ...state.users, action.payload ] }
            return state
        case 'DELETE_USER':
            state = { ...state , users : state.users.filter(user => user._id !== action.payload) }
            return state
        case 'UPDATE_USER':
            let userUpdate = state?.users.find(item => item._id === action.payload._id)
            userUpdate = action.payload
            state = { ...state, users : state.users.map(user => 
                user._id === action.payload._id ? userUpdate : user
            )}
            return state 
        case 'USERS_LOADING':
            state = { ...state, usersLoading: action.payload }
            return state
        default:
            return state;
    }
}

export default usersReduces