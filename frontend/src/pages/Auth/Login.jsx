import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import { loginMember } from "../../api/memberAPI";
import { Link } from "react-router-dom";
import cstyles from "./Logo.module.css";
import styles from "./Login.module.css";


const Login = () => {
    /*
      formData: 로그인 폼 상태를 한꺼번에 관리
        - memberId: 사용자가 입력한 회원 ID
        - pwd: 사용자가 입력한 비밀번호
        - saveId: 아이디 저장 체크박스 상태
      error: 로그인 실패 시 표시할 에러 메시지
    */
    const [formData, setFormData] = useState({
        memberId: "",
        pwd: "",
        saveId: false
    });
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // input, checkbox 공통 변경 핸들러
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    // 로그인 버튼 클릭
    const handleLogin = async (e) => {
        e.preventDefault();

        // 기본 유효성 검사
        if (!formData.memberId) {
            setError("아이디를 입력해 주세요.");
            return;
        }
        if (!formData.pwd) {
            setError("비밀번호를 입력해 주세요.");
            return;
        }

        try {
            const data = await loginMember(formData.memberId, formData.pwd);
            localStorage.setItem("token", data.token);

            // 아이디 저장
            if (formData.saveId) {
                localStorage.setItem("savedMemberId", formData.memberId);
            } else {
                localStorage.removeItem("savedMemberId");
            }

            alert("로그인 성공!");
            navigate("/main");
        } catch (err) {
            console.error("로그인 실패", err);
            setError("입력하신 정보가 일치하지 않습니다.\n다시 확인해 주세요.");
        }
    };

    return (
        <div className={cstyles.container}>
            <div className={cstyles.logo}>
                <img src="#" alt="무슨문고 로고" />
            </div>

            <form className={styles.loginForm} onSubmit={handleLogin}>
                {/* 아이디 입력 */}
                <div className={styles.inputBox}>
                    <FaRegUser className={styles.icon} />
                    <input
                        type="text"
                        placeholder="아이디"
                        name="memberId"
                        value={formData.memberId}
                        onChange={handleChange}
                    />
                </div>

                {/* 비밀번호 입력 */}
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

                {/* 아이디 저장 체크박스 */}
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

                {/* 에러 메시지 */}
                {error && <p className={styles.error}>{error}</p>}

                {/* 로그인 버튼 */}
                <button type="submit" className={styles.btnLogin}>
                    로그인
                </button>

                {/* 하단 링크 */}
                <div className={styles.loginLinks}>
                    <Link to="/signup-intro">회원가입</Link>
                    <span>|</span>
                    <a href="#">아이디 찾기</a>
                    {/*<Link to="#">아이디 찾기</Link>*/}
                    <span>|</span>
                    <a href="#">비밀번호 찾기</a>
                    {/*<Link to="#">비밀번호 찾기</Link>*/}
                </div>

                {/* 소셜 로그인 */}
                <div className={styles.socialLogin}>
                    <button type="button" className={styles.btnKakao}>
                        카카오 로그인
                    </button>
                    <button type="button" className={styles.btnNaver}>
                        네이버 로그인
                    </button>
                    <button type="button" className={styles.btnGoogle}>
                        구글 로그인
                    </button>
                </div>

                <div className={styles.guestLink}>
                    {/*<Link to="#">비회원 주문조회</Link>*/}
                    <a href="#">비회원 주문조회</a>
                </div>
            </form>
        </div>
    );
};

export default Login;
