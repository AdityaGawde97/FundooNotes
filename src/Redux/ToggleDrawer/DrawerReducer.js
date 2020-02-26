import { TOGGLE_DRAWER_OPEN, TOGGLE_DRAWER_CLOSE } from "./DrawerActionType";

const initialState = {
    drawerOpen: false,
    dOpen: false
}

const DrawerReducer = (state = initialState, action) => {
    switch(action.type) {
       
        case TOGGLE_DRAWER_OPEN:
            return {
                // ...state,
                drawerOpen: true
            }

        case TOGGLE_DRAWER_CLOSE:
            return {
                // ...state,
                drawerOpen: false
            }

        case 'TOGGLE':
            return {
                dOpen: !state.dOpen
            }

        default: return state
    }
};

export default DrawerReducer;