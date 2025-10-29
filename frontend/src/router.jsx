import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout/Layout";
import { Home } from "./pages/Home/Home";
import { StoreInfo } from "./pages/storeInfo/StoreInfo";


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/store-info",
        element: <StoreInfo />,
      },
    ],
  },
]);
