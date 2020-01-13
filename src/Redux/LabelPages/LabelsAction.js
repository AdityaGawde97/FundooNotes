import {CURRENT_LABEL_PAGE} from './LabelsActionTypes'

export const setLabelPage = (labelId) => {
    return {
        type: CURRENT_LABEL_PAGE,
        payload: labelId
    }
}