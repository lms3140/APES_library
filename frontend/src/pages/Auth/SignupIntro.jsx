import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaGoogle, FaMobileAlt, FaEnvelope } from "react-icons/fa";
import styles from "./SignupIntro.module.css";
import cstyles from "./Logo.module.css";

export const SignupIntro = () => {
    const navigate = useNavigate();
    const handleKakaoAuth = () => {
        window.location.href = "https://kauth.kakao.com/oauth/authorize?" +
                            "client_id=faa41cfd2406bc361c3eb40aa4fb7ceb" +
                            "&redirect_uri=http://localhost:5173/auth/kakao/callback" +
                            "&response_type=code";
        };

    return (
        <div className={cstyles.container}>
            <div className={cstyles.logo}>
                <Link to="/">
                    <img src="/images/logo.png" alt="로고" className={cstyles.logoImg} />
                </Link>
            </div>

            {/* 일반 회원가입 버튼 */}
            <button
                className={styles.btnSignup}
                onClick={() => navigate("/signup")}
            >
                회원가입
            </button>

            {/* 로그인/법인회원 */}
            <div className={styles.signupLinks}>
                <a href="#">법인회원 가입</a>
                <span>|</span>
                <Link to="/login">로그인</Link>
            </div>

            {/* 소셜 회원가입 버튼 */}
            <div className={styles.socialSignup}>
                {/* 카카오 회원가입 버튼 */}
                <button
                    type="button"
                    className={styles.btnKakao}
                    onClick={handleKakaoAuth}
                  >
                    카카오로 회원가입
                </button>

                {/* 네이버 회원가입 버튼 */}
{/*                 <button */}
{/*                     type="button" */}
{/*                     className={styles.btnNaver} */}
{/*                     onClick={() => { */}
{/*                         // 🔹 추후 네이버 OAuth 연결 가능 */}
{/*                         alert("네이버 회원가입 기능은 준비 중입니다."); */}
{/*                     }} */}
{/*                 > */}
{/*                     네이버 회원가입 */}
{/*                 </button> */}
            </div>

{/*             <p className={styles.otherTitle}>다른 방법으로 회원가입</p> */}

{/*             <div className={styles.otherMethods}> */}
{/*                 <button */}
{/*                     className={styles.iconBtn} */}
{/*                     onClick={() => alert("구글 회원가입 준비 중")} */}
{/*                 > */}
{/*                     <div className={styles.icon}><FaGoogle /></div> */}
{/*                     <span className={styles.iconLabel}>구글</span> */}
{/*                 </button> */}
{/*                 <button */}
{/*                     className={styles.iconBtn} */}
{/*                     onClick={() => alert("휴대폰 회원가입 준비 중")} */}
{/*                 > */}
{/*                     <div className={styles.icon}><FaMobileAlt /></div> */}
{/*                     <span className={styles.iconLabel}>휴대폰</span> */}
{/*                 </button> */}
{/*                 <button */}
{/*                     className={styles.iconBtn} */}
{/*                     onClick={() => alert("이메일 회원가입 준비 중")} */}
{/*                 > */}
{/*                     <div className={styles.icon}><FaEnvelope /></div> */}
{/*                     <span className={styles.iconLabel}>이메일</span> */}
{/*                 </button> */}
{/*             </div> */}
        </div>
    );
};

export default SignupIntro;
