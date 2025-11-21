import { useState } from "react";
import { Navigate } from "react-router-dom";

export function AuthRouter({ children }) {
  const [isLogin, setIsLogin] = useState(true);

  // 로그인 안되어있다?
  if (!isLogin) {
    return <Navigate to={"/login"} />;
  }

  return <>{children}</>;
}
