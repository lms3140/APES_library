import React from "react";
import styles from "./Review.module.css";

/**
 * Review.jsx
 * - 여러 개의 리뷰를 리스트로 렌더링
 * - 지금은 백엔드가 없으므로 mock 데이터 사용
 */

export const mockReviews = [
    {
        review_id: 1,
        member_id: "user123",
        rating: 5,
        content: "정말 유익한 책입니다! 초보자에게 추천!",
        created_at: "2024-11-01",
    },
    {
        review_id: 2,
        member_id: "dev_jane",
        rating: 4,
        content: "설명이 친절하고 따라하기 쉬웠어요.",
        created_at: "2024-11-03",
    },
];

export default function Review() {
    return (
        <div className={styles.reviewSection}>
            <div className={styles.headerRow}>
                <h3 className={styles.sectionTitle}>
                    리뷰 <span className={styles.reviewCount}>({mockReviews.length})</span>
                </h3>
                <button className={styles.writeButton}>✏️ 리뷰 작성</button>
            </div>

            {mockReviews.length === 0 ? (
                <p className={styles.noReview}>아직 리뷰가 없습니다.</p>
            ) : (
                mockReviews.map((review) => (
                    <div key={review.review_id} className={styles.reviewCard}>
                        <div className={styles.reviewHeader}>
                            <span className={styles.memberId}>{review.member_id}</span>
                            <span className={styles.rating}>
                                {"⭐".repeat(review.rating) + "☆".repeat(5 - review.rating)}
                            </span>
                        </div>
                        <p className={styles.content}>{review.content}</p>
                        <span className={styles.date}>{review.created_at}</span>
                    </div>
                ))
            )}
        </div>
    );
}
