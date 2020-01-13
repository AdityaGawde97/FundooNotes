import { LIST_VIEW, GRID_VIEW } from "./ViewActionType";

export const toggleListView = () => {
    return {
        type: LIST_VIEW,
        info: 'show notes in list view'
    }
}

export const toggleGridView = () => {
    return {
        type: GRID_VIEW,
        info: 'show notes in grid view'
    }
}