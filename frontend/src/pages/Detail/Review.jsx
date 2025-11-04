import React from "react";
import styles from "./Detail.module.css";

const Review = () => {
    return (
        <div className={styles.detailSection}>
            <h3 className={styles.sectionTitle}>리뷰</h3>
            <p className={styles.review}>★★★★★ 아주 유익한 책입니다!</p>
            <p className={styles.review}>⭐⭐⭐⭐ 초보자에게 강력 추천!</p>
        </div>
    );
};

export default Review;
