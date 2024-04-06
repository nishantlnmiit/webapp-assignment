import { IListItem } from "../../interfaces/interface";

const favouriteReducer = (
  state = [],
  action: { type: string; payload: IListItem }
) => {
  if (action.type === "ADD") {
    return [...state, action.payload];
  }
  return state;
};

export default favouriteReducer;
