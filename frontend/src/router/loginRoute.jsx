import Login from "../pages/Auth/Login.jsx";
import Signup from "../pages/Auth/Signup.jsx";
import SignupIntro from "../pages/Auth/SignupIntro.jsx";
import { KakaoCallback } from "../pages/Auth/KakaoCallback.jsx";
// import { KakaoCallback2 } from "../pages/Auth/KakaoCallback2.jsx";

export const loginRoute = [
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <SignupIntro />,
    path: "/signup-intro",
  },
  {
    element: <Signup />,
    path: "/signup",
  },
  {
    element: <KakaoCallback />,
    path: "/kakao/callback",
  },
];