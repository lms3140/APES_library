import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import { loginMember } from "../api/memberAPI"; // axios 요청 함수
import "../css/Login.css"; // 스타일

const Login = () => {
    /*
      memberId: 사용자가 입력한 회원 ID
      pwd: 사용자가 입력한 비밀번호
      error: 로그인 실패 시 표시할 에러 메시지
    */
    const [memberId, setMemberId] = useState("");
    const [pwd, setPWD] = useState("");
    const [error, setError] = useState("");

    // 로그인 성공 후 페이지 이동을 위한 React Router 훅
    const navigate = useNavigate();

    // 로그인 버튼 클릭 시 실행되는 함수 handleLogin()
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // loginMember()는 axios를 통해 Spring Boot API로 로그인 요청을 보냄
            const data = await loginMember(memberId, pwd);

            // JWT 토큰을 브라우저에 저장
            localStorage.setItem("token", data.token);

            alert("로그인 성공!");
            navigate("/main"); // 로그인 시 메인 페이지로 이동
        } catch (err) {
            console.error("로그인 실패", err);
            setError("회원 ID 또는 비밀번호가 올바르지 않습니다.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-logo">
                <img
                    src="#"
                    alt="교보문고 로고"
                />
            </div>

            <form className="login-form" onSubmit={handleLogin}>
                {/* 아이디 입력 */}
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="아이디"
                        value={memberId}
                        onChange={(e) => setMemberId(e.target.value)}
                    />
                </div>

                {/* 비밀번호 입력 */}
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={pwd}
                        onChange={(e) => setPWD(e.target.value)}
                    />
                </div>

                {/* 에러 메시지 */}
                {error && <p className="error">{error}</p>}

                {/* 로그인 버튼 */}
                <button type="submit" className="btn-login">
                    로그인
                </button>

                {/* 하단 메뉴 */}
                <div className="login-links">
                    <a href="#">회원가입</a>
                    <span>|</span>
                    <a href="#">아이디 찾기</a>
                    <span>|</span>
                    <a href="#">비밀번호 찾기</a>
                </div>

                {/* 소셜 로그인 */}
                <div className="social-login">
                    <button type="button" className="btn-kakao">
                        카카오 로그인
                    </button>
                    <button type="button" className="btn-naver">
                        네이버 로그인
                    </button>
                    <button type="button" className="btn-google">
                        구글 로그인
                    </button>
                </div>

                <div className="guest-link">
                    <a href="#">비회원 주문조회</a>
                </div>
            </form>
        </div>
    );
};

export default Login;
