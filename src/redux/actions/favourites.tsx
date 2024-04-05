import { IListItem } from "../../interfaces/interface";

const addToFavoritesAction = (listItem: IListItem) => {
  return { type: "ADD", payload: listItem };
};

export default addToFavoritesAction;
