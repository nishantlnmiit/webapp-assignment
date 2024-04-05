import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("Dashboard Component", () => {
  it("renders header elements correctly", () => {
    const initialState = { favorites: [] }; // Define initial state here
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Router>
          <Dashboard />
        </Router>
      </Provider>
    );

    // Assertions for header elements
    expect(screen.getByText("Go to List")).toBeInTheDocument();
    expect(screen.getByText("Favorites: 0")).toBeInTheDocument();
  });

  it("renders favorites list correctly with initial state", () => {
    const initialState = {
      favorites: [
        { id: 1, title: "Test Title 1", thumbnailUrl: "test-url-1" },
        { id: 2, title: "Test Title 2", thumbnailUrl: "test-url-2" }
      ]
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Router>
          <Dashboard />
        </Router>
      </Provider>
    );

    expect(screen.getByText("Favorites List")).toBeInTheDocument();
    initialState.favorites.forEach((item) => {
      expect(screen.getByText(`Id: ${item.id}`)).toBeInTheDocument();
      expect(screen.getByText(`Title: ${item.title}`)).toBeInTheDocument();
    });
  });
});
