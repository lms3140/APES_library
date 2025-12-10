// 로그인 여부 확인
export const isLoggedIn = () => {
  const token = localStorage.getItem("jwtToken");
  return !!token; // true / false
};

// 로그인 필요할 때 공통 처리
export const requireLogin = (navigate) => {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    // 로그인 안 된 경우
    alert("로그인이 필요한 기능입니다.");
    navigate("/login");
    return false;
  }
  return true; // 로그인 되어있음
};