import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import { loginMember } from "../../api/MemberAPI.jsx";
import { Link } from "react-router-dom";
import cstyles from "./Logo.module.css";
import styles from "./Login.module.css";

export const Login = () => {
  const [formData, setFormData] = useState({
    userId: "",
    pwd: "",
    saveId: false
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const savedId = localStorage.getItem("savedUserId");
    if (savedId) {
      setFormData(prev => ({ ...prev, userId: savedId, saveId: true }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.userId) return setError("아이디를 입력해 주세요.");
    if (!formData.pwd) return setError("비밀번호를 입력해 주세요.");

    try {
      const res = await loginMember(formData.userId, formData.pwd);

      if (res.login) {
          console.log(res);
          localStorage.setItem("userData",JSON.stringify({userId:res.userId}))
        if (formData.saveId) localStorage.setItem("savedUserId", formData.userId)
        else localStorage.removeItem("savedUserId");
        alert("로그인 성공!");
        navigate("/");
      } else {
        setError("아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (err) {
      console.error("로그인 실패:", err);
      setError("서버 오류로 로그인할 수 없습니다.");
    }
  };

  return (
    <div className={cstyles.container}>
      <div className={cstyles.logo}><span>무슨문고</span></div>

      <form className={styles.loginForm} onSubmit={handleLogin}>
        <div className={styles.inputBox}>
          <FaRegUser className={styles.icon} />
          <input
            type="text"
            placeholder="아이디"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputBox}>
          <FaLock className={styles.icon} />
          <input
            type="password"
            placeholder="비밀번호"
            name="pwd"
            value={formData.pwd}
            onChange={handleChange}
          />
        </div>

        <div className={styles.checkboxWrap}>
          <input
            type="checkbox"
            id="saveId"
            name="saveId"
            checked={formData.saveId}
            onChange={handleChange}
          />
          <label htmlFor="saveId">아이디 저장</label>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit"
        className={styles.btnLogin}>로그인</button>

        <div className={styles.loginLinks}>
          <Link to="/signup-intro">회원가입</Link>
          <span>|</span>
          <a href="#">아이디 찾기</a>
          <span>|</span>
          <a href="#">비밀번호 찾기</a>
        </div>

        <div className={styles.socialLogin}>
          <button type="button" className={styles.btnKakao}>카카오 로그인</button>
          <button type="button" className={styles.btnNaver}>네이버 로그인</button>
          <button type="button" className={styles.btnGoogle}>구글 로그인</button>
        </div>

        <div className={styles.guestLink}>
          <a href="#">비회원 주문조회</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
