import { TOGGLE_DRAWER_OPEN, TOGGLE_DRAWER_CLOSE } from "./DrawerActionType";

export const toggleDrawerOpen = () => {
    return {
        type: TOGGLE_DRAWER_OPEN,
    }
}

export const toggleDrawerClose = () => {
    return {
        type: TOGGLE_DRAWER_CLOSE,
    }
}

export const toggleDrawer = () => {
    return {
        type: 'TOGGLE'
    }
}
