import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import cstyles from "./Logo.module.css";

const Signup = () => {
    /*
      id : 아이디
      pwd : 비밀번호
      name : 사용자 이름
      phone : 사용자 전화번호
      email : 사용자 이메일
      birth(char(8)) : 사용자 생년월일
      gender : 사용자 성별
      mdate : 회원가입 일자 - ?
    */

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: "",
        pwd: "",
        pwdcheck: "",
        name: "",
        phone: "",
        email: "",
        birth: "",
        gender: "",
        agreeAll: false,
        agreeTerms: false,
        agreePrivacy: false,
        agreeMarketing: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleAllAgree = (e) => {
        const checked = e.target.checked;
        setFormData({
            ...formData,
            agreeAll: checked,
            agreeTerms: checked,
            agreePrivacy: checked,
            agreeMarketing: checked,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("회원가입 데이터:", formData);
        alert("회원가입이 완료되었습니다!");
        navigate("/login");
    };

    // 필수 입력 값 체크
    const isRequiredFilled =
        formData.id &&
        formData.pwd &&
        formData.pwdcheck &&
        formData.name &&
        formData.phone &&
        formData.email &&
        formData.birth &&
        formData.gender &&
        formData.agreeTerms &&
        formData.agreePrivacy;

    return (
        <div className={cstyles.container}>
            <div className={cstyles.logo}>
                <img src="#" alt="무슨문고 로고" />
            </div>

            <div className={styles.titleRow}>
                <h2 className={styles.title}>회원가입</h2>
                <p className={styles.stepInfo}>마지막 단계입니다!</p>
            </div>

            {/* 회원정보 입력 */}
            <div className={styles.sectionTitle}>
                <h3 className={styles.sectionTitle}>회원정보 입력</h3>
                <p className={styles.sectionInfo}>
                    <span className={styles.required}>*</span> 필수 입력</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <label>
                    아이디
                    <span className={styles.required}>*</span>
                </label>
                <input
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    placeholder="아이디를 입력해주세요."
                />

                <label>
                    비밀번호
                    <span className={styles.required}>*</span>
                </label>
                <input
                    type="password"
                    name="pwd"
                    value={formData.pwd}
                    onChange={handleChange}
                    placeholder="비밀번호를 입력해주세요."
                />

                <label>
                    비밀번호 확인
                    <span className={styles.required}>*</span>
                </label>
                <input
                    type="password"
                    name="pwdcheck"
                    value={formData.pwdcheck}
                    onChange={handleChange}
                    placeholder="비밀번호를 한 번 더 입력해주세요."
                />

                <label>
                    이름
                    <span className={styles.required}>*</span>
                </label>
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="이름을 입력해주세요."
                />

                <label>
                    휴대폰번호
                    <span className={styles.required}>*</span>
                </label>
                <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="휴대폰 번호를 입력해주세요."
                />

                <label>
                    이메일
                    <span className={styles.required}>*</span>
                </label>
                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="이메일을 입력해주세요."
                />

                <label>
                    생년월일
                    <span className={styles.required}>*</span>
                </label>
                <input
                    name="birth"
                    value={formData.birth}
                    onChange={handleChange}
                    placeholder="YYYYMMDD"
                />

                <label>
                    성별
                    <span className={styles.required}>*</span>
                </label>
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                >
                    <option value="">선택</option>
                    <option value="male">남</option>
                    <option value="female">여</option>
                </select>

                {/* 약관 동의 섹션 */}
                <h3 className={styles.sectionTitle}>서비스 이용약관 동의</h3>

                <div className={styles.agreeSection}>
                    <div className={styles.agreeAll}>
                        <input
                            type="checkbox"
                            name="agreeAll"
                            checked={formData.agreeAll}
                            onChange={handleAllAgree}
                        />
                        <label>
                            약관 전체 동의
                        </label>

                    </div>

                    <div className={styles.agreeItem}>
                        <label>
                            <input
                                type="checkbox"
                                name="agreeTerms"
                                checked={formData.agreeTerms}
                                onChange={handleChange}
                            />
                            교보문고 이용약관 (필수)
                            <span className={styles.required}>*</span>
                        </label>
                        <button type="button" className={styles.btnView}>
                            보기
                        </button>
                    </div>

                    <div className={styles.agreeItem}>
                        <label>
                            <input
                                type="checkbox"
                                name="agreePrivacy"
                                checked={formData.agreePrivacy}
                                onChange={handleChange}
                            />
                            개인정보 수집 및 이용 동의 (필수)
                            <span className={styles.required}>*</span>
                        </label>
                        <button type="button" className={styles.btnView}>
                            보기
                        </button>
                    </div>

                    <div className={styles.agreeItem}>
                        <label>
                            <input
                                type="checkbox"
                                name="agreeMarketing"
                                checked={formData.agreeMarketing}
                                onChange={handleChange}
                            />
                            마케팅 정보 수신 동의 (선택)
                        </label>
                        <button type="button" className={styles.btnView}>
                            보기
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className={styles.btnSignup}
                    disabled={!isRequiredFilled}>
                    회원가입
                </button>
            </form>
        </div>
    );
};

export default Signup;
