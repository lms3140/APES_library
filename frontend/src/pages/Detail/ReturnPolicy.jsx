import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styles from "./Detail.module.css";

const ReturnPolicy = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.detailSection}>
            <div className={styles.groupHeader} onClick={() => setIsOpen(!isOpen)}>
                <h3 className={styles.sectionTitle}>교환/반품/품절 안내</h3>
                {isOpen ? (
                    <FaChevronUp className={styles.iconToggle} />
                ) : (
                    <FaChevronDown className={styles.iconToggle} />
                )}
            </div>

            <div className={`${styles.policyContent} ${isOpen ? styles.open : styles.closed}`}>
                <p className={styles.description}>
                    - 변심 반품: 수령 후 7일 이내 <br />
                    - 상품 불량: 문제 발견 후 30일 이내 <br />
                    - 반품/교환 비용: 변심 시 고객 부담 <br />
                    - 불가 사유: 사용/훼손/포장 개봉 등
                </p>
                <p className={styles.description}>
                    공급사(출판사) 재고 사정에 의해 품절/지연될 수 있으며, 품절 시 관련 사항은
                    이메일 또는 문자로 안내드립니다.
                </p>
            </div>
        </div>
    );
};

export default ReturnPolicy;
