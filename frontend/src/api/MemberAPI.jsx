import axios from "axios";

const BASE_URL = "http://localhost:8080/member";

// 회원가입
export const signupMember = async (memberData) => {
  try {
    const res = await axios.post(`${BASE_URL}/signup`, memberData, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("[API] 회원가입 실패:", err);
    throw err;
  }
};

// 로그인
export const loginMember = async (userId, pwd) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/login`,
      { userId, pwd },
      {
        withCredentials: true, // ★ 쿠키 기반 인증 필수
      }
    );
    return res.data;
  } catch (err) {
    console.error("[API] 로그인 실패:", err);
    throw err;
  }
};

// 아이디 중복 체크
export const checkUserId = async (userId) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/idCheck`,
      { userId },
      {
        withCredentials: true, // (선택) 꼭 필요하진 않지만 통일성 있게 가능
      }
    );
    return res.data;
  } catch (err) {
    console.error("[API] 아이디 체크 실패:", err);
    throw err;
  }
};
