import {CURRENT_LABEL_PAGE} from './LabelsActionTypes'

const initialState = {
    currentLabelId : ''
}

const LabelsReducer = ( state = initialState, action) => {
    switch (action.type) {
        case CURRENT_LABEL_PAGE:
            return {
                ...state,
                currentLabelId: action.payload
            }
    
        default: return state
    }
};

export default LabelsReducer;