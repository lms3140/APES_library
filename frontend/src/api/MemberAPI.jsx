import axios from "axios";

const BASE_URL = "http://localhost:8080/member";

// 회원가입
export const signupMember = async (memberData) => {
  try {
    const res = await axios.post(`${BASE_URL}/signup`, memberData);
    return res.data;
  } catch (err) {
    console.error("[API] 회원가입 실패:", err);
    throw err;
  }
};

// 로그인
export const loginMember = async (userId, pwd) => {
  try {
    const res = await axios.post(`${BASE_URL}/login`, { userId, pwd });
    return res.data;
  } catch (err) {
    console.error("[API] 로그인 실패:", err);
    throw err;
  }
};

// 아이디 중복 체크
export const checkUserId = async (userId) => {
  try {
    const res = await axios.post(`${BASE_URL}/idCheck`, { userId });
    return res.data;
  } catch (err) {
    console.error("[API] 아이디 체크 실패:", err);
    throw err;
  }
};
