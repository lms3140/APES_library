// 승현 라우터
import { AdminPage } from "../pages/AdminPage/AdminPage.jsx";
import { Payment } from "../pages/Payment/Payment.jsx";
import { Test } from "../pages/Test/Test.jsx";

export const testRoute = [
  {
    path: "/adminpage",
    element: <AdminPage />,
  },
  {
    path: "/test",
    element: <Test />,
  },
];
