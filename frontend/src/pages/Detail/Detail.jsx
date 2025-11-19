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
  const [activeTab, setActiveTab] = useState("info");

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

      {/* 탭 메뉴 */}
      <div className={styles.tabMenu}>
        <button
          className={activeTab === "info" ? styles.active : ""}
          onClick={() => setActiveTab("info")}
        >
          상품정보
        </button>
        <button
          className={activeTab === "review" ? styles.active : ""}
          onClick={() => setActiveTab("review")}
        >
          리뷰 ({data.reviewCount || 0})
        </button>
        <button
          className={activeTab === "return" ? styles.active : ""}
          onClick={() => setActiveTab("return")}
        >
          교환/반품/품절
        </button>
      </div>

      {/* 탭 내용 */}
      <div className={styles.tabContent}>
        {activeTab === "info" && <ProductInfo bookId={bookId} />}
        {activeTab === "review" && <Review bookId={bookId} />}
        {activeTab === "return" && <ReturnPolicy />}
      </div>


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
