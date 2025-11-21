import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../pages/Layout/Layout.jsx";
import { Home } from "../pages/Home/Home.jsx";
import { StoreInfo } from "../pages/storeInfo/StoreInfo.jsx";

import { Mypage } from "../pages/Mypage/Mypage.jsx";
import { route1 } from "./route1.jsx";
import { route2 } from "./route2.jsx";
import { route3 } from "./route3.jsx";
import { NotFound } from "../pages/NotFound/NotFound.jsx";
import { AuthRouter } from "./authRouter.jsx";

export const router = createBrowserRouter([
  //인증이 필요없는 페이지
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
      // 라우터 분업
      ...route1,
      ...route2,
      ...route3,
    ],
  },
  // 인증이 필요한 페이지
  {
    element: (
      <AuthRouter>
        <Layout />
      </AuthRouter>
    ),
    children: [
      {
        path: "/mypage",
        element: <Mypage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
