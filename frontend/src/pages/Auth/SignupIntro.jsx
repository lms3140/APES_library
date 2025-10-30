import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaMobileAlt, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./SignupIntro.module.css";
import cstyles from "./Logo.module.css";

const SignupIntro = () => {
    const navigate = useNavigate();

    return (
        <div className={cstyles.container}>
            <div className={cstyles.logo}>
                <img src="#" alt="무슨문고 로고" />
            </div>

            <button className={styles.btnSignup}>회원가입</button>

            <div className={styles.signupLinks}>
                <a href="#">법인회원 가입</a>
                {/*<Link to="#">법인회원 가입</Link>*/}
                <span>|</span>
                <Link to="/login">로그인</Link>
            </div>

            <div className={styles.socialSignup}>
                <button type="button" className={styles.btnKakao}>
                    카카오 회원가입
                </button>
                <button type="button" className={styles.btnNaver}>
                    네이버 회원가입
                </button>
            </div>

            <p className={styles.otherTitle}>다른 방법으로 회원가입</p>

            <div className={styles.otherMethods}>
                <button className={styles.iconBtn}>
                    <div className={styles.icon}><FaGoogle /></div>
                    <span className={styles.iconLabel}>구글</span>
                </button>
                <button className={styles.iconBtn}>
                    <div className={styles.icon}><FaMobileAlt /></div>
                    <span className={styles.iconLabel}>휴대폰</span>
                </button>
                <button className={styles.iconBtn}>
                    <div className={styles.icon}><FaEnvelope /></div>
                    <span className={styles.iconLabel}>이메일</span>
                </button>
            </div>
        </div>
    );
};

export default SignupIntro;
