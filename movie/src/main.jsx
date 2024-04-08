import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "../theme.js";
import { ROUTER } from "./constant/router.jsx";
import Home from "./pages/Home.jsx";
import Movies from "./pages/movies/Movies.jsx";
import Shows from "./pages/shows/Shows.jsx";
import Search from "./pages/search/Search.jsx";
import MovieDetail from "./pages/movies/MovieDetail.jsx";
import ShowDetail from "./pages/shows/ShowDetail.jsx";
import DetailsPage from "./pages/DetailsPage.jsx";

const router = createBrowserRouter([
  {
    path: ROUTER.Home,
    element: <App />,
    children: [
      {
        path: ROUTER.Home,
        element: <Home />,
      },
      {
        path: ROUTER.Movies,
        element: <Movies />,
      },
      {
        path: ROUTER.Shows,
        element: <Shows />,
      },
      {
        path: ROUTER.Search,
        element: <Search />,
      },
      // {
      //   path: ROUTER.MovieDetail + "/:id",
      //   element: <MovieDetail />,
      // },
      // {
      //   path: ROUTER.ShowDetail + "/:id",
      //   element: <ShowDetail />,
      // },
      {
        path: "/:type/:id",
        element: <DetailsPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </>
);
