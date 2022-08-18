import { createStore } from "redux";
import addStateReducer from "./Reducers/AddReducer";

const store = createStore(addStateReducer)

export default store