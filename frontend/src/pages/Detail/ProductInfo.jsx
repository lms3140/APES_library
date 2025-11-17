import React from "react";
import styles from "./Detail.module.css";

export const ProductInfo = ({ book }) => {
  // 책 정보가 없으면 기본값 지정
  const title = book?.title || "제목 없음";
  const authors = book?.authors || "저자 정보 없음";
  const publisher = book?.publisher || "출판사 정보 없음";

  return (
    <div className={styles.detailSection}>
      <h3 className={styles.sectionTitle}>상품 정보</h3>

      <img
        src={book?.imageUrl || ""}
        alt="책 상세 이미지"
        className={styles.detailImage}
      />

      <div className={styles.description}>
        <p>{data.description}</p>
      </div>

      <h4 className={styles.sectionTitle}>기본 정보</h4>
      <table className={styles.basicInfoTable}>
        <tbody>
          <tr>
            <th>제목</th>
            <td>{title}</td>
          </tr>
          <tr>
            <th>저자</th>
            <td>{authors}</td>
          </tr>
          <tr>
            <th>출판사</th>
            <td>{publisher}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductInfo;
