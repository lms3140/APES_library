import React, { useRef, useState, useEffect } from "react";
import coverImage from "./cover.jpg";
import { UnderBar } from "./UnderBar.jsx"; // ✅ 하단바 컴포넌트 import
import { ProductInfo } from "./ProductInfo";
import Review from "./Review"; // 수정된 리뷰 import
import { ReturnPolicy } from "./ReturnPolicy";
import styles from "./Detail.module.css";

export const Detail = () => {
    const infoRef = useRef(null);
    const reviewRef = useRef(null);
    const returnRef = useRef(null);

  const [activeTab, setActiveTab] = useState("info");
  const [hideHeader, setHideHeader] = useState(false);

    // ✅ 특정 섹션으로 스크롤 이동
    const scrollToSection = (ref, key) => {
        if (ref.current) {
            window.scrollTo({
                top: ref.current.offsetTop - 80,
                behavior: "smooth",
            });
            setActiveTab(key);
        }
    };

    // ✅ 스크롤 위치에 따라 탭 활성화/헤더 숨김 처리
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const infoTop = infoRef.current.offsetTop - 100;
            const reviewTop = reviewRef.current.offsetTop - 100;
            const returnTop = returnRef.current.offsetTop - 100;

      if (scrollY >= returnTop) setActiveTab("return");
      else if (scrollY >= reviewTop) setActiveTab("review");
      else setActiveTab("info");

      setHideHeader(scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    return (
        <div className={styles.container}>
            {/* 상단 책 정보 */}
            <div
                className={`${styles.detailTop} ${hideHeader ? styles.hideHeader : ""}`}
            >
                <img src={coverImage} alt="책 이미지" className={styles.bookImage} />
                <div className={styles.bookInfo}>
                    <h2 className={styles.title}>나의 첫 번째 개발서</h2>
                    <p className={styles.author}>홍길동 저 | 예문출판사</p>
                    <p className={styles.price}>₩ 48,000</p>
                    <button className={styles.btnPurchase}>구매하기</button>
                </div>
            </div>

      {/* 탭 메뉴 */}
      <div className={styles.tabs}>
        <button
          className={activeTab === "info" ? styles.active : ""}
          onClick={() => scrollToSection(infoRef, "info")}
        >
          상품 정보
        </button>
        <button
          className={activeTab === "review" ? styles.active : ""}
          onClick={() => scrollToSection(reviewRef, "review")}
        >
          리뷰
        </button>
        <button
          className={`${activeTab === "return" ? styles.active : ""} ${
            activeTab === "return" ? styles.highlightTab : ""
          }`}
          onClick={() => scrollToSection(returnRef, "return")}
        >
          교환/반품/품절
        </button>
      </div>

      {/* 섹션 */}
      <section ref={infoRef}>
        <ProductInfo />
      </section>

      <section ref={reviewRef}>
        <Review />
      </section>

      <section ref={returnRef}>
        <ReturnPolicy />
      </section>

            {/* ✅ 하단 고정바 (UnderBar 컴포넌트) */}
            <UnderBar />
        </div>

  );
};

export default Detail;
