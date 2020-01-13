import { combineReducers } from "redux"
import DrawerReducer from './ToggleDrawer/DrawerReducer'
import ViewReducer from "./ListGridView/ViewReducer"
import LabelsReducer from './LabelPages/LabelsReducer'

const RootReducer = combineReducers({
    drawer: DrawerReducer,
    view: ViewReducer,
    label: LabelsReducer
})

export default RootReducer