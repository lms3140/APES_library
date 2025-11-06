import React from "react";
import styles from "./Detail.module.css";

const Review = () => {
    const reviews = [
        { name: "김철수", text: "정말 기초부터 쉽게 설명되어 있어 좋았습니다." },
        { name: "이영희", text: "예제 중심이라 따라하기 편했어요." },
    ];

    return (
        <div className={styles.detailSection}>
            <h3 className={styles.sectionTitle}>리뷰</h3>
            {reviews.map((review, idx) => (
                <div key={idx} className={styles.review}>
                    <strong>{review.name}</strong>
                    <p>{review.text}</p>
                </div>
            ))}
        </div>
    );
};

export default Review;
