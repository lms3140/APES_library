import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import cstyles from "./Logo.module.css";
import Terms from "./Terms.jsx"; // 약관 컴포넌트

const Signup = () => {
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
        marketingEmail: false,
        marketingSMS: false,
    });

    const [idCheckResult, setIdCheckResult] = useState(null);
    const [pwdMatch, setPwdMatch] = useState(null);

    // 입력값 변경 핸들러
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "pwd" || name === "pwdcheck") {
            const updatedForm = { ...formData, [name]: value };
            setFormData(updatedForm);

            if (updatedForm.pwd && updatedForm.pwdcheck) {
                setPwdMatch(updatedForm.pwd === updatedForm.pwdcheck);
            } else {
                setPwdMatch(null);
            }
            return;
        }

        if (name === "phone") {
            const formatted = value
                .replace(/[^0-9]/g, "")
                .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/, "$1-$2-$3")
                .replace(/(-{1,2})$/, "");
            setFormData({ ...formData, phone: formatted });
            return;
        }

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleAllAgree = (checked) => {
        setFormData({
            ...formData,
            agreeAll: checked,
            agreeTerms: checked,
            agreePrivacy: checked,
            agreeMarketing: checked,
            marketingEmail: checked,
            marketingSMS: checked,
        });
    };

    const handleIdCheck = () => {
        if (!formData.id) {
            alert("아이디를 입력해주세요.");
            return;
        }
        if (formData.id === "admin") {
            setIdCheckResult("duplicate");
        } else {
            setIdCheckResult("available");
        }
    };

    const handleSendCode = () => {
        if (!formData.email) {
            alert("이메일을 입력해주세요.");
            return;
        }
        alert(`인증번호가 ${formData.email}로 발송되었습니다.`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.pwd !== formData.pwdcheck) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        if (!isRequiredFilled) {
            alert("필수 항목을 모두 입력하고 필수 약관에 동의해주세요.");
            return;
        }

        if (idCheckResult !== "available") {
            alert("아이디 중복 확인을 완료해주세요.");
            return;
        }

        console.log("회원가입 데이터:", formData);
        alert("회원가입이 완료되었습니다!");
        navigate("/login");
    };

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
            <div className={styles.sectionRow}>
                <h3 className={styles.sectionTitle}>회원정보 입력</h3>
                <p className={styles.sectionInfo}>
                    <span className={styles.required}>*</span> 필수 입력
                </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                {/* 아이디 */}
                <label>
                    아이디 <span className={styles.required}>*</span>
                </label>
                <div className={styles.inputRow}>
                    <input
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        placeholder="아이디를 입력해주세요."
                    />
                    <button
                        type="button"
                        onClick={handleIdCheck}
                        className={styles.btnCheck}
                    >
                        중복확인
                    </button>
                </div>
                {idCheckResult === "available" && (
                    <p className={styles.successMsg}>사용 가능한 아이디입니다.</p>
                )}
                {idCheckResult === "duplicate" && (
                    <p className={styles.errorMsg}>이미 존재하는 아이디입니다.</p>
                )}

                {/* 비밀번호 */}
                <label>
                    비밀번호 <span className={styles.required}>*</span>
                </label>
                <input
                    type="password"
                    name="pwd"
                    value={formData.pwd}
                    onChange={handleChange}
                    placeholder="비밀번호를 입력해주세요."
                />

                {/* 비밀번호 확인 */}
                <label>
                    비밀번호 확인 <span className={styles.required}>*</span>
                </label>
                <input
                    type="password"
                    name="pwdcheck"
                    value={formData.pwdcheck}
                    onChange={handleChange}
                    placeholder="비밀번호를 한 번 더 입력해주세요."
                />
                {pwdMatch === false && (
                    <p className={styles.errorMsg}>비밀번호가 일치하지 않습니다.</p>
                )}
                {pwdMatch === true && (
                    <p className={styles.successMsg}>비밀번호가 일치합니다.</p>
                )}

                {/* 이름 */}
                <label>
                    이름 <span className={styles.required}>*</span>
                </label>
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="이름을 입력해주세요."
                />

                {/* 휴대폰번호 */}
                <label>
                    휴대폰번호 <span className={styles.required}>*</span>
                </label>
                <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="휴대폰 번호를 입력해주세요."
                />

                {/* 이메일 */}
                <label>
                    이메일 <span className={styles.required}>*</span>
                </label>
                <div className={styles.emailWrapper}>
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="이메일을 입력해주세요."
                    />
                    <button
                        type="button"
                        className={styles.btnSendCode}
                        onClick={handleSendCode}
                        disabled={!formData.email}
                    >
                        인증번호 발송
                    </button>
                </div>

                {/* 생년월일 + 성별 가로 배치 */}
                <div className={styles.rowFlex}>
                    <div className={styles.flexItem}>
                        <label>
                            생년월일 <span className={styles.required}>*</span>
                        </label>
                        <input
                            name="birth"
                            value={formData.birth}
                            onChange={handleChange}
                            placeholder="YYYYMMDD"
                            pattern="\d{8}"
                            title="8자리 숫자 (예: 19991231)"
                        />
                    </div>

                    <div className={styles.flexItem}>
                        <label>
                            성별 <span className={styles.required}>*</span>
                        </label>
                        <div className={styles.segmentedControl}>
                            <button
                                type="button"
                                className={formData.gender === "male" ? styles.activeSegment : ""}
                                onClick={() => setFormData({ ...formData, gender: "male" })}
                            >
                                {formData.gender === "male" && "✔"}   남
                            </button>
                            <button
                                type="button"
                                className={formData.gender === "female" ? styles.activeSegment : ""}
                                onClick={() => setFormData({ ...formData, gender: "female" })}
                            >
                                {formData.gender === "female" && "✔"}  여
                            </button>
                        </div>
                    </div>
                </div>

                {/* 약관 컴포넌트 */}
                <Terms formData={formData} setFormData={setFormData} handleAllAgree={handleAllAgree} />

                <button
                    type="submit"
                    className={styles.btnSignup}
                    disabled={!isRequiredFilled}
                >
                    회원가입
                </button>
            </form>
        </div>
    );
};

export default Signup;
