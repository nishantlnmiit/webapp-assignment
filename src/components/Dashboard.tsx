import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IListItem } from "../interfaces/interface";
import { IRootState } from "../redux/store";

function App() {
  const favorites = useSelector((state: IRootState) => state.favorites);

  return (
    <>
      <div className="header-wrapper">
        <div className="list-button">
          <Link to="/list">
            <button>Go to List</button>
          </Link>
        </div>
        <div>
          <span>Favorites: {favorites.length}</span>
        </div>
      </div>

      <div className="list-wrapper">
        <span>Favorites List</span>
        {favorites.map((item: IListItem, index: number) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
              }}
            >
              <p>Id: {item.id}</p>
              <p>Title: {item.title}</p>
              <img src={item.thumbnailUrl}></img>
              <button className="add_favorites_disabled" disabled>
                Add to favorites
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
