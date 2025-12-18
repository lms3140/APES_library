import Login from "../pages/Auth/Login.jsx";
import Signup from "../pages/Auth/Signup.jsx";
import SignupIntro from "../pages/Auth/SignupIntro.jsx";
import { KakaoLogin } from "../pages/Auth/KakaoLogin.jsx";


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
    element: <KakaoLogin />,
    path: "/auth/kakao/callback",
  },
];