import React from "react";
import styles from "./ReviewSummary.module.css";
import { StarRating } from "../../components/StarRating/StarRating.jsx";  // StarRating 컴포넌트 임포트

export default function ReviewSummary({ summary }) {
  const averageRating = summary?.averageRating ?? 0;
  const totalReviews = summary?.totalReviews ?? 0;
  const ratingCounts = summary?.ratingCounts;

  // ratingCounts가 없으면 빈 객체로 처리
  const maxCount = ratingCounts ? Math.max(...Object.values(ratingCounts)) : 0;

  return (
    <div className={styles.container}>
      {/* 왼쪽: 평균 평점 */}
      <div className={styles.left}>
        <div className={styles.avgRating}>
          <div className={styles.cloverIcons}>
            {/* 🔹 StarRating 컴포넌트 사용 */}
            <StarRating rating={Math.round(averageRating)} />
          </div>
          <div className={styles.score}>{averageRating.toFixed(1)} / 5</div>
        </div>
      </div>

      {/* 가운데: 총 리뷰 수 */}
      <div className={styles.center}>
        <div className={styles.totalTitle}>총 리뷰 수</div>
        <div className={styles.totalNumber}>{totalReviews}개</div>
      </div>

      {/* 오른쪽: 평점 막대 */}
      <div className={styles.right}>
        {[5, 4, 3, 2, 1].map((rate) => {
          const count = ratingCounts?.[rate] ?? 0;
          const percent = maxCount === 0 ? 0 : (count / maxCount) * 100;

          return (
            <div key={rate} className={styles.ratingBarRow}>
              <span className={styles.rateText}>{rate}점</span>

              <div className={styles.barBackground}>
                <div
                  className={styles.barFill}
                  style={{ width: `${percent}%` }}
                />
              </div>

              <span className={styles.percentText}>{Math.round(percent)}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
