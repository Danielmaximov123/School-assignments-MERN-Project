const initialState = {
    subjects: [],
    subjectsLoading: false
}

const subjectsReduces = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_SUBJECTS':
            state = { ...state , subjects : action.payload }    
            return state
        case 'ADD_SUBJECT' : 
            state = { ...state , subjects : [ ...state.subjects, action.payload ] }
            return state
        case 'UPDATE_SUBJECT':
            let subjectUpdate = state?.subjects.find(item => item._id === action.payload._id)
            subjectUpdate = action.payload
            state = { ...state, subjects : state.subjects.map(subject => 
                subject._id === action.payload._id ? subjectUpdate : subject
            )}
            return state 
        case 'DELETE_SUBJECT':
            state = { ...state , subjects : state.subjects.filter(user => user._id !== action.payload) }
            return state
        case 'SUBJECT_LOADING':
            state = { ...state, subjectsLoading: action.payload }
            return state
        default:
            return state;
    }
}

export default subjectsReduces