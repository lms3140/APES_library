import styles from "./StarRating.module.css";

import cloverOn from "/images/detail/cloveron.png";
import cloverOff from "/images/detail/cloveroff.png";

export function StarRating({ rating }) {
  return (
    <div className={styles.cloverWrapper}>
      {[1, 2, 3, 4, 5].map((num) => (
        <img
          key={num}
          src={num <= rating ? cloverOn : cloverOff}
          alt="별점"
          className={styles.cloverImg}
        />
      ))}
    </div>
  );
}
