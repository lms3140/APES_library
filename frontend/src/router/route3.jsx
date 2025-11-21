/*
* 조성은
* */

import Login from "../pages/Auth/Login.jsx"
import SignupIntro from "../pages/Auth/SignupIntro.jsx"
import Signup from "../pages/Auth/Signup.jsx"
import Detail from "../pages/Detail/Detail.jsx"
import Cart from "../pages/Cart/Cart.jsx"

export const route3= [
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/signup-intro",
        element: <SignupIntro/>,
    },
    {
        path: "/signup",
        element: <Signup/>,
    },
    {
        path: "/detail/:bookId",
        element: <Detail/>,
    },
    {
        path: "/cart",
        element: <Cart/>,
    }
];
