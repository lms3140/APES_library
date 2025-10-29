import React from "react";
import {useNavigate} from "react-router-dom";
import {FaGoogle, FaMobileAlt, FaEnvelope} from "react-icons/fa";
import styles from "./SignupIntro.module.css";

const SignupIntro = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>

                {/* 로고 */}
                <div className={styles.SignupLogo}>
                    <img src="#" alt="교보문고 로고"/>
                </div>

                {/* 회원가입 버튼 */}
                <button className={styles.btnSignup}>회원가입</button>

                {/* 하단 링크 */}
                <div className={styles.SignupLinks}>
                    <a href="#">법인회원 가입</a>
                    <span>|</span>
                    <a href="#">로그인</a>
                </div>

                {/* SNS 회원가입 버튼 */}
                <div className={styles.socialSignup}>
                    <button type="button" className={styles.btnKakao}>
                        카카오 회원가입
                    </button>
                    <button type="button" className={styles.btnNaver}>
                        네이버 회원가입
                    </button>
                </div>

                {/* 다른 방법 */}
                <p className={styles.otherTitle}>다른 방법으로 회원가입</p>
                <div className={styles.otherMethods}>
                    <button className={styles.iconBtn}>
                        <div className={styles.icon}><FaGoogle/></div>
                        <span className={styles.iconLabel}>구글</span>
                    </button>
                    <button className={styles.iconBtn}>
                        <div className={styles.icon}><FaMobileAlt/></div>
                        <span className={styles.iconLabel}>휴대폰</span>
                    </button>
                    <button className={styles.iconBtn}>
                        <div className={styles.icon}><FaEnvelope/></div>
                        <span className={styles.iconLabel}>이메일</span>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default SignupIntro;
