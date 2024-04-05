import ReactDOM from "react-dom/client";
import Dashboard from "./components/Dashboard.tsx";
import "./index.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import List from "./components/List.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.tsx";
import "./scss/Dashboard.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />
  },
  {
    path: "/list",
    element: <List />
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
