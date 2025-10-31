/*
* 조성은
* 
* */
import Login from "../pages/Auth/Login.jsx"
import SignupIntro from "../pages/Auth/SignupIntro.jsx"
import Signup from "../pages/Auth/Signup.jsx"

export const route3  = ([
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
]);
