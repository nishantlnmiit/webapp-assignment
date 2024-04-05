import { combineReducers } from "redux";
import favouritereducer from "./favouritereducer";

const rootReducer = combineReducers({
  favorites: favouritereducer
});

export default rootReducer;
