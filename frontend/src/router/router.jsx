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
import { Orders } from "../pages/Mypage/Orders/Orders.jsx";
import { WishList } from "../pages/Mypage/WishList/WishList.jsx";
import { Profile } from "../pages/Mypage/Profile/Profile.jsx";
import { Point } from "../pages/Mypage/Point/Point.jsx";
import { Reviews } from "../pages/Mypage/Reviews/Reviews.jsx";
import { Addresses } from "../pages/Mypage/Addresses/Addresses.jsx";
import { Inquiries } from "../pages/Mypage/inquiries/inquiries.jsx";
import { MyPageHome } from "../pages/Mypage/MyPageHome/MyPageHome.jsx";

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
        children: [
          { path: "/mypage", element: <MyPageHome /> },
          { path: "orders", element: <Orders /> },
          { path: "wishlist", element: <WishList /> },
          { path: "profile", element: <Profile /> },
          { path: "points", element: <Point /> },
          { path: "reviews", element: <Reviews /> },
          { path: "addresses", element: <Addresses /> },
          { path: "inquiries", element: <Inquiries /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
