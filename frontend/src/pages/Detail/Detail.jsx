import React, { useState } from "react";
import styles from "./Detail.module.css";
import { useGetFetch } from "../../hooks/useGetFetch.js";
import ProductInfo from "./ProductInfo";
import Review from "./Review";
import ReturnPolicy from "./ReturnPolicy";
import UnderBar from "./UnderBar";

export default function Detail() {
  const bookId = 1;
  const url = `http://localhost:8080/Book/detail/${bookId}`;
  const { isLoading, isError, data } = useGetFetch(url);

  const [count, setCount] = useState(1);
  const [liked, setLiked] = useState(false);

  if (isLoading) return <div>로딩중...</div>;
  if (isError || !data) return <div>상품을 찾을 수 없습니다.</div>;

  return (
    <div className={styles.detailContainer}>
      <div className={styles.detailTop}>
        <img className={styles.bookImage} src={data.imageUrl} alt={data.title} />
        <div className={styles.bookInfo}>
          <h2 className={styles.title}>{data.title}</h2>
          <p className={styles.author}>{data.authors} | {data.publisher}</p>
          <p className={styles.price}>₩ {data.price.toLocaleString()}</p>
        </div>
      </div>

      <ProductInfo description={data.description} />
      <Review bookId={bookId} />
      <ReturnPolicy />

      {/* 하단 고정 바 */}
      <UnderBar
        product={data}
        count={count}
        setCount={setCount}
        liked={liked}
        setLiked={setLiked}
      />
    </div>
  );
}
