import React from "react";
import styles from "./Detail.module.css";

export const ProductInfo = ({ book }) => {
  return (
    <div className={styles.detailSection}>
      {/* 상품 정보 제목 */}
      <h3 className={styles.sectionTitle}>상품 정보</h3>

      {/* 책 이미지 */}
      <img
        src={book.imageUrl} // DB에서 가져온 책 이미지 URL 사용
        alt="책 상세 이미지"
        className={styles.detailImage}
      />

      {/* 책 설명 */}
      <div className={styles.description}>
        <p>{book.description}</p> {/* DB에서 받은 책 설명 출력 */}
      </div>

      {/* 가격 */}
      <h4 className={styles.sectionTitle}>가격</h4>
      <p>{book.price.toLocaleString()}원</p> {/* DB에서 받은 가격 출력 */}

      {/* 출판일 */}
      <h4 className={styles.sectionTitle}>출판일</h4>
      <p>{book.publishedDate}</p> {/* DB에서 받은 출판일 출력 */}

      {/* 카테고리 */}
      <h4 className={styles.sectionTitle}>카테고리</h4>
      <p>{book.subcategoryName}</p> {/* DB에서 받은 카테고리 이름 출력 */}

      {/* 기본 정보 테이블 */}
      <h4 className={styles.sectionTitle}>기본 정보</h4>
      <table className={styles.basicInfoTable}>
        <tbody>
          <tr>
            <th>ISBN</th>
            <td>{book.isbn || "정보 없음"}</td> {/* ISBN이 없으면 "정보 없음" 출력 */}
          </tr>
          <tr>
            <th>출판일자</th>
            <td>{book.publishedDate}</td> {/* DB에서 받은 출판일 출력 */}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductInfo;
