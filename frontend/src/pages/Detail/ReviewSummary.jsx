import React from "react";
import styles from "./ReviewSummary.module.css";

export default function ReviewSummary({ summary }) {
  const defaultSummary = {
    averageRating: 0,
    totalReviews: 0,
    ratingCounts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  };

  const data =
    summary &&
    typeof summary === "object" &&
    summary.ratingCounts
      ? summary
      : defaultSummary;

  const maxCount = Math.max(...Object.values(data.ratingCounts));

  return (
    <div className={styles.container}>

      {/* 왼쪽: 평균 평점 */}
      <div className={styles.left}>
        <div className={styles.avgRating}>
          <div className={styles.cloverIcons}>
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={
                  i < Math.round(data.averageRating)
                    ? "/images/detail/cloveron.png"
                    : "/images/detail/cloveroff.png"
                }
                alt="rating"
                className={styles.clover}
              />
            ))}
          </div>
          <div className={styles.score}>
            {data.averageRating.toFixed(1)} / 5
          </div>
        </div>
      </div>

      {/* 가운데: 총 리뷰 수 */}
      <div className={styles.center}>
        <div className={styles.totalTitle}>총 리뷰 수</div>
        <div className={styles.totalNumber}>{data.totalReviews}개</div>
      </div>

      {/* 오른쪽: 평점 비율 막대 */}
      <div className={styles.right}>
        {[5, 4, 3, 2, 1].map((rate) => {
          const count = data.ratingCounts[rate] || 0;
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
