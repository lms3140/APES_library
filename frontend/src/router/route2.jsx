// 승현 라우터
import { AdminPage } from "../pages/AdminPage/AdminPage.jsx";
import {Payment} from "../pages/Payment/Payment.jsx";

export const route2 = [
    {
        path: "/payment",
        element: <Payment />,
    },
    {
        path: "/adminpage",
        element: <AdminPage />,
    },

];