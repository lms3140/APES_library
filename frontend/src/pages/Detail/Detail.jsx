import React, { useState } from "react";
import styles from "./Detail.module.css";

const Detail = () => {
    return (
        <div className={styles.container}>
            {/* 상단: 책 이미지 + 기본 정보 */}
            <div className={styles.detailTop}>
                <img
                    src="https://via.placeholder.com/200x300"
                    alt="책 표지"
                    className={styles.bookImage}
                />
                <div className={styles.bookInfo}>
                    <h2 className={styles.title}>책 제목 예시</h2>
                    <p className={styles.author}>저자명 | 출판사명</p>
                    <p className={styles.price}>₩12,000</p>
                </div>
            </div>

            {/* 책 소개 */}
            <div className={styles.detailSection}>
                <h3 className={styles.sectionTitle}>책 소개</h3>
                <p className={styles.description}>
                    이 책은 독자에게 다양한 지식을 제공하며, 실용적인 팁과 사례를 통해
                    이해를 돕습니다. 간결하면서도 깊이 있는 내용으로 구성되어 있습니다.
                </p>
            </div>

            {/* 목차 */}
            <div className={styles.detailSection}>
                <h3 className={styles.sectionTitle}>목차</h3>
                <ul className={styles.tableOfContents}>
                    <li>1장: 시작하기</li>
                    <li>2장: 기본 개념</li>
                    <li>3장: 실전 예제</li>
                    <li>4장: 심화 학습</li>
                </ul>
            </div>

            {/* 리뷰 */}
            <div className={styles.detailSection}>
                <h3 className={styles.sectionTitle}>리뷰</h3>
                <p className={styles.review}>
                    "정말 유용한 책이에요! 내용이 쉽게 정리되어 있고, 실습 예제도 많아서
                    바로 적용해 볼 수 있습니다."
                </p>
            </div>

            {/* 구매 버튼 */}
            <button className={styles.btnPurchase}>구매하기</button>
        </div>
    );
};

export default Detail;
