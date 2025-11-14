import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../pages/Layout/Layout.jsx";
import { Home } from "../pages/Home/Home.jsx";
import { StoreInfo } from "../pages/storeInfo/StoreInfo.jsx";

import { Mypage } from "../pages/Mypage/Mypage.jsx";
import { route1 } from "./route1.jsx";
import { route2 } from "./route2.jsx";
import { route3 } from "./route3.jsx";
import { NotFound } from "../pages/NotFound/NotFound.jsx";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/store-info/:pid",
        element: <StoreInfo />,
      },
      {
        path: "/mypage",
        element: <Mypage />,
      },
      ...route1,
      ...route2,
      ...route3,
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
