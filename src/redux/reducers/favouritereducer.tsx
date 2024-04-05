import { IListItem } from "../interface";

const favouritereducer = (
  state = [],
  action: { type: string; payload: IListItem }
) => {
  if (action.type === "ADD") {
    return [...state, action.payload];
  }
  return state;
};

export default favouritereducer;
