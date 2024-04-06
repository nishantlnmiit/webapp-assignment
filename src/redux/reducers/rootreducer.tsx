import { combineReducers } from "redux";
import favouriteReducer from "./favouriteReducer";

const rootReducer = combineReducers({
  favorites: favouriteReducer
});

export default rootReducer;
