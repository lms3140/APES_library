import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkLoginStatus } from "../api/MemberAPI.jsx";

export function AuthRouter({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const verifyLogin = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const res = await checkLoginStatus(token); // checkLoginStatus를 호출하여 로그인 상태 확인
        setIsLogin(res.login);
      } catch (err) {
        setIsLogin(false);
      } finally {
        setLoading(false);
      }
    };
    verifyLogin();
  }, []);
  if (loading) return <div>로딩 중...</div>; // 상태 확인 중

  if (!loading && !isLogin) return <Navigate to="/login" replace />; // 로그인 안 됐으면 리다이렉트
  if (isLogin) return <>{children}</>;
}
