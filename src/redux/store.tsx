import { legacy_createStore as createStore } from "redux";
import rootReducer from "./reducers/rootreducer";

const store = createStore(rootReducer);

export default store;
export type IRootState = ReturnType<typeof store.getState>;
