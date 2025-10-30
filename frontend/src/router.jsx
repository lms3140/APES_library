import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout/Layout";
import { Home } from "./pages/Home/Home";
import { StoreInfo } from "./pages/storeInfo/StoreInfo";
import Login from "./pages/Auth/Login.jsx"
import SignupIntro from "./pages/Auth/SignupIntro.jsx"
import Signup from "./pages/Auth/Signup.jsx"

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
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/signup-intro",
            element: <SignupIntro />,
        },
        {
            path: "/signup",
            element: <Signup />,
        },
    ],
  },
]);
