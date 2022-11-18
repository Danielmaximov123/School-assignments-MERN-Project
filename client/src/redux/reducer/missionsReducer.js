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
        case 'REMOVE_FILE_FROM_MISSION' :
            let getMission = state.missionSingle
            console.log(getMission._id);
            // let removeFile = state.missionSingle.files.filter(file => file._id !== action.payload.fileId)
            // state.missionSingle.files = removeFile
            // console.log(state.missionSingle);
            // state = { ...state, mission : state.missionSingle.map(mission => mission._id === getMission._id ? getMission : mission)}
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