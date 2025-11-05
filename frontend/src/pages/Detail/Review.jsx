import React from "react";
import styles from "./Detail.module.css";

const Review = () => {
    return (
        <div className={styles.detailSection}>
            <h3 className={styles.sectionTitle}>리뷰</h3>
            <p className={styles.review}>
                이 책은 React와 웹 개발에 입문하는 사람들에게 정말 좋은 가이드입니다.
                예제와 설명이 친절하며, 단계별로 따라가기 쉽습니다.
            </p>
        </div>
    );
};

export default Review;
