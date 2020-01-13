import { LIST_VIEW, GRID_VIEW } from "./ViewActionType";

const initialState = {
    toggleView: false
}

const ViewReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIST_VIEW : return {
            ...state,
            toggleView: true
        }

        case GRID_VIEW : return {
            ...state,
            toggleView: false
        }      
    
        default: return state
    }
};

export default ViewReducer;