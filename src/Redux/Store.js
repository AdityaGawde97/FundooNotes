import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import RootReducer from "./RootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(RootReducer, composeWithDevTools(applyMiddleware(logger)))

export default store