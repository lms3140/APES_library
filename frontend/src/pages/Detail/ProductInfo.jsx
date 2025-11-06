import React, { useState } from "react";
import styles from "./Detail.module.css";

const ProductInfo = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const tableOfContents = [
        { title: "1장 개발 시작하기", items: ["1.1 개발환경 설정", "1.2 첫 번째 프로젝트"] },
        { title: "2장 React 기초", items: ["2.1 JSX와 컴포넌트", "2.2 Props와 State"] },
        { title: "3장 심화 기능", items: ["3.1 라우팅", "3.2 상태 관리"] },
    ];

    const toggleOpen = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={styles.detailSection}>
            <h3 className={styles.sectionTitle}>상품 정보</h3>
            <p className={styles.description}>이 책은 처음 개발을 시작하는 분들을 위해 작성된 안내서입니다.</p>

            {/* 목차 펼치기 */}
            <ul className={styles.tableOfContents}>
                {tableOfContents.map((chapter, index) => (
                    <li key={index} className={openIndex === index ? "open" : ""}>
                        <button onClick={() => toggleOpen(index)}>
                            {chapter.title} <span className={styles.arrow}>▶</span>
                        </button>
                        <ul>
                            {chapter.items.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>

            {/* 기본 정보 표 */}
            <table className={styles.basicInfoTable}>
                <tbody>
                <tr>
                    <th>저자</th>
                    <td>홍길동</td>
                </tr>
                <tr>
                    <th>출판사</th>
                    <td>예문출판사</td>
                </tr>
                <tr>
                    <th>발행일</th>
                    <td>2025-01-01</td>
                </tr>
                <tr>
                    <th>페이지</th>
                    <td>350쪽</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ProductInfo;
