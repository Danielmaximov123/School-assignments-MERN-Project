const initialState = {
    mission: [],
    missionSingle : [],
    missionLoading: false
}

const missionReduces = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_MISSIONS':
            state = { ...state , mission : action.payload }    
            return state
        case 'GET_MISSION':
            state = { ...state , missionSingle : action.payload }    
            return state
        case 'ADD_MISSION' : 
            state = { ...state , mission : [ ...state.mission, action.payload ] }
            return state
        case 'DELETE_MISSION':
            state = { ...state , mission : state.mission.filter(m => m._id !== action.payload) }
            return state
        case 'MISSION_LOADING':
            state = { ...state, missionLoading: action.payload }
            return state
        default:
            return state;
    }
}

export default missionReduces