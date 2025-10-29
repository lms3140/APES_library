import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout/Layout";
import { StoreInfo } from "./pages/storeInfo/StoreInfo";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>1</h1>,
      },
      {
        path: "/store-info/:pid",
        element: <StoreInfo />,
      },
    ],
  },
]);
