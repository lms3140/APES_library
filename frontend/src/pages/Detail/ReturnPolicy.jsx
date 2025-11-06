import React, { useState } from "react";
import styles from "./Detail.module.css";

const ReturnPolicy = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div className={styles.detailSection}>
            {/* 섹션 제목과 버튼 */}
            <h3 className={styles.sectionTitle}>
                <button className={styles.accordionBtn} onClick={toggleOpen}>
                    교환 / 반품 / 품절 안내 {isOpen ? "▲" : "▼"}
                </button>
            </h3>

            {/* 내용 */}
            {isOpen && (
                <div className={styles.accordionContent}>
                    <p className={styles.description}>
                        상품 수령 후 7일 이내 교환 및 반품 가능하며, 포장을 개봉한 경우 일부 제한이 있을 수 있습니다.
                    </p>
                    <p className={styles.description}>
                        품절된 상품은 구매가 불가하며, 유사 상품으로 안내드립니다.
                    </p>
                </div>
            )}
        </div>
    );
};

export default ReturnPolicy;
