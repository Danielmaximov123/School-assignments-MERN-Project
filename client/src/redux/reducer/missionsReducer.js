const initialState = {
    missions: [],
    missionLoading: false
}

const missionReduces = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_MISSIONS':
            state = { ...state , missions : action.payload }    
            return state
        case 'ADD_MISSION' : 
            state = { ...state , missions : [ ...state.missions, action.payload ] }
            return state
        case 'UPDATE_MISSION':
            let missionUpdate = state?.missions.find(item => item._id === action.payload._id)
            missionUpdate = action.payload
            state = { ...state, missions : state.missions.map(mission => 
                mission._id === action.payload._id ? missionUpdate : mission
            )}
            return state 
        case 'REMOVE_FILE_FROM_MISSION' :
            let getMission = state.missions.find(mission => mission._id === action.payload.missionId)
            let removeFile = getMission.files.filter(file => file._id !== action.payload.fileId)
            getMission.files = removeFile
            state = { ...state, missions : state.missions.map(mission => mission._id === getMission._id ? getMission : mission)}
            return state
        case 'DELETE_MISSION':
            state = { ...state , missions : state.missions.filter(m => m._id !== action.payload) }
            return state
        case 'MISSION_LOADING':
            state = { ...state, missionLoading: action.payload }
            return state
        default:
            return state;
    }
}

export default missionReduces