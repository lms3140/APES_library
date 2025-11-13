import React, { useRef, useState, useEffect } from "react";
import coverImage from "./cover.jpg";
import { UnderBar } from "./UnderBar.jsx";
import { ProductInfo } from "./ProductInfo";
import Review from "./Review";
import { ReturnPolicy } from "./ReturnPolicy";
import styles from "./Detail.module.css";

export const Detail = () => {
  const infoRef = useRef(null);
  const reviewRef = useRef(null);
  const returnRef = useRef(null);

  const [activeTab, setActiveTab] = useState("info");
  const [hideHeader, setHideHeader] = useState(false);
  const [book, setBook] = useState(null);  // 책 정보 상태 추가

  const bookId = 1;  // 예시로 책 ID를 1로 설정

  // ✅ 책 정보를 DB에서 가져오는 함수
  useEffect(() => {
    fetch(`http://localhost:5173/Book/detail?bid=${bookId}`)
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch((err) => console.error("책 정보를 불러오는 데 실패했습니다.", err));
  }, [bookId]);

  // ✅ 스크롤 이동 함수 (상단 고정바 높이를 변수로 통일)
  const scrollToSection = (ref, sectionKey) => {
    if (ref.current) {
      const offset = ref.current.offsetTop - 80; // 상단바 높이
      window.scrollTo({ top: offset, behavior: "smooth" });
      setActiveTab(sectionKey);
    }
  };

  // ✅ requestAnimationFrame + passive scroll event → 렌더 최적화
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!infoRef.current || !reviewRef.current || !returnRef.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const infoTop = infoRef.current.offsetTop - 100;
          const reviewTop = reviewRef.current.offsetTop - 100;
          const returnTop = returnRef.current.offsetTop - 100;

          if (scrollY >= returnTop) setActiveTab("return");
          else if (scrollY >= reviewTop) setActiveTab("review");
          else setActiveTab("info");

          setHideHeader(scrollY > 100);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 책 정보가 없으면 로딩 중 표시
  if (!book) return <p>책 정보를 불러오는 중...</p>;

  return (
    <div className={styles.container}>
      {/* 상단 상품 기본 정보 섹션 */}
      <div className={`${styles.detailTop} ${hideHeader ? styles.hideHeader : ""}`}>
        <img src={book.imageUrl || coverImage} alt="책 이미지" className={styles.bookImage} />
        <div className={styles.bookInfo}>
          <h2 className={styles.title}>{book.title}</h2>
          <p className={styles.author}>{book.authors}</p>
          <p className={styles.price}>₩ {book.price.toLocaleString()}</p>
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
          className={activeTab === "return" ? styles.active : ""}
          onClick={() => scrollToSection(returnRef, "return")}
        >
          교환/반품/품절
        </button>
      </div>

      {/* 실제 섹션 영역 */}
      <section ref={infoRef}>
        <ProductInfo book={book} />
      </section>

      <section ref={reviewRef}>
        <Review />
      </section>

      <section ref={returnRef}>
        <ReturnPolicy />
      </section>

      {/* 하단 고정 주문 바 */}
      <UnderBar productId={bookId} />
    </div>
  );
};

export default Detail;
