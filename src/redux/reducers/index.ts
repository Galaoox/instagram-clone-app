import { combineReducers } from "redux";
import session from "./session";

// Agrupo todos los reducers
const reducers = combineReducers({
    session,
});

export default reducers;
