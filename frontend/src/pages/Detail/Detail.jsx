import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
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
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const bookId = 1;

  // 책 정보를 DB에서 가져오기
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/Book/detail`, {
          params: { bid: bookId },
        });
        setBook(response.data);
      } catch (err) {
        console.error("책 정보를 불러오는 데 실패했습니다.", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  // 스크롤 이동 함수
  const scrollToSection = (ref, sectionKey) => {
    if (ref.current) {
      const offset = ref.current.offsetTop - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
      setActiveTab(sectionKey);
    }
  };

  // 스크롤 이벤트로 탭 및 상단바 숨김 처리
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

  if (loading) return <p>책 정보를 불러오는 중...</p>;
  if (!book) return <p>책 정보를 찾을 수 없습니다.</p>;

  return (
    <div className={styles.container}>
      {/* 상단 상품 기본 정보 섹션 */}
      <div className={`${styles.detailTop} ${hideHeader ? styles.hideHeader : ""}`}>
        {/* 이미지가 없으면 렌더링 안함 */}
        {book.imageUrl ? (
          <img
            src={book.imageUrl}
            alt="책 이미지"
            className={styles.bookImage}
          />
        ) : (
          <p>이미지가 없습니다.</p>
        )}

        <div className={styles.bookInfo}>
          <h2 className={styles.title}>{book.title || "제목 없음"}</h2>
          <p className={styles.author}>{book.authors || "저자 정보 없음"}</p>
          <p className={styles.price}>
            ₩ {(book.price ?? 0).toLocaleString()}
          </p>
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
