import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../scss/List.scss";
import addToFavoritesAction from "../redux/actions/favourites";
import { useDispatch, useSelector } from "react-redux";
import { IListItem } from "../interfaces/interface";
import { IRootState } from "../redux/store";

export default function List() {
  const dispatch = useDispatch();
  const favorites = useSelector((state: IRootState) => state.favorites);
  const listInnerRef = useRef(null);
  const [currPage, setCurrPage] = useState<number>(1);
  const [prevPage, setPrevPage] = useState<number>(0);
  const [elementList, setElementList] = useState<IListItem[]>([]);
  const currentPageRef = useRef<number | null | string>(null);

  useEffect(() => {
    const currentPage = sessionStorage.getItem("currentPage");
    if (currentPage && elementList.length) {
      handleScrollPosition();
    }
  }, [elementList]);

  useEffect(() => {
    const fetchData = async (limit: number = 10) => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/albums/1/photos?_page=${currPage}&_limit=${limit}`
      );
      if (!response.data.length) {
        return;
      }
      setPrevPage(currPage);
      setElementList([...elementList, ...response.data]);
    };
    const currentPage = Number(sessionStorage.getItem("currentPage"));
    if (currentPage) {
      fetchData(currentPage ? currentPage * 10 : 10);
    } else {
      if (prevPage !== currPage) {
        fetchData();
      }
    }
  }, [currPage, prevPage, elementList]);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight >= scrollHeight && currPage < 5) {
        setCurrPage(currPage + 1);
        currentPageRef.current = currPage + 1;
      }
      currentPageRef.current = currPage;
    }
  };
  const handleScrollPosition = () => {
    const currentPage = Number(sessionStorage.getItem("currentPage"));
    const scrollTop = Number(sessionStorage.getItem("scrollTop"));

    if (scrollTop && currentPage) {
      const scrollableElement: HTMLElement = document.getElementById(
        "scrollableElement"
      ) as HTMLElement;

      scrollableElement?.scroll(0, scrollTop);

      setPrevPage(currentPage);
      setCurrPage(currentPage);
      sessionStorage.removeItem("currentPage");
      sessionStorage.removeItem("scrollTop");
    }
  };

  const addToFavorites = (item: IListItem) => {
    dispatch(addToFavoritesAction(item));
  };
  const checkInFavourites = (id: number) => {
    const index = favorites?.findIndex((item: IListItem) => item.id === id);

    return index === -1 ? false : true;
  };

  return (
    <>
      <Link to="/">
        <button
          onClick={() => {
            const scrollableElement: HTMLElement = document.getElementById(
              "scrollableElement"
            ) as HTMLElement;
            const scrollTop: number = scrollableElement.scrollTop;

            let currentPage = null;
            if (currentPageRef.current) {
              currentPage = currentPageRef.current.toString();
            }
            sessionStorage.setItem("currentPage", currentPage as string);
            sessionStorage.setItem("scrollTop", scrollTop.toString());
          }}
        >
          Go back to Dashboard
        </button>
      </Link>

      <div onScroll={onScroll} ref={listInnerRef} id="scrollableElement">
        {elementList?.map((item: IListItem, index: number) => {
          return (
            <div key={index} id={`card${index + 1}`} className="card-item">
              <p>Id: {item.id}</p>
              <p>Title: {item.title}</p>
              <img src={item.thumbnailUrl}></img>
              <button
                className="add_favorites"
                onClick={() => addToFavorites(item)}
                disabled={checkInFavourites(item.id)}
                style={
                  checkInFavourites(item.id) ? { pointerEvents: "none" } : {}
                }
              >
                Add to favorites
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
