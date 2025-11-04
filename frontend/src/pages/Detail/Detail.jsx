import React, { useRef } from "react";
import coverImage from "./cover.jpg"
import { FaHeart, FaGift } from "react-icons/fa";
import ProductInfo from "./ProductInfo";
import Review from "./Review";
import ReturnPolicy from "./ReturnPolicy";
import styles from "./Detail.module.css";

const Detail = () => {
    const infoRef = useRef(null);
    const reviewRef = useRef(null);
    const returnRef = useRef(null);

    const scrollToSection = (ref) => {
        window.scrollTo({
            top: ref.current.offsetTop - 80,
            behavior: "smooth",
        });
    };

    return (
        <div className={styles.container}>
            {/* 상단 책 정보 */}
            <div className={styles.detailTop}>
                <img
                    src={coverImage}
                    alt="책 이미지"
                    className={styles.bookImage}
                />
                <div className={styles.bookInfo}>
                    <h2 className={styles.title}>나의 첫 번째 개발서</h2>
                    <p className={styles.author}>홍길동 저 | 예문출판사</p>
                    <p className={styles.price}>₩ 48,000</p>
                    <button className={styles.btnPurchase}>구매하기</button>
                </div>
            </div>

            {/* 탭 (스크롤 이동) */}
            <div className={styles.tabs}>
                <button onClick={() => scrollToSection(infoRef)}>상품 정보</button>
                <button onClick={() => scrollToSection(reviewRef)}>리뷰</button>
                <button onClick={() => scrollToSection(returnRef)}>
                    교환/반품/품절
                </button>
            </div>

            {/* 각각의 섹션을 개별 컴포넌트로 분리 */}
            <section ref={infoRef}>
                <ProductInfo />
            </section>

            <section ref={reviewRef}>
                <Review />
            </section>

            <section ref={returnRef}>
                <ReturnPolicy />
            </section>

            {/* 하단 고정 바 */}
            <div className={styles.bottomBar}>
                <div className={styles.barContent}>
                    <div className={styles.barPrice}>
                        <span>₩ 48,000</span>
                    </div>

                    <div className={styles.barButtons}>
                        <button className={styles.iconBtn}>
                            <FaHeart className={styles.heartIcon} />
                        </button>

                        <button className={styles.giftBtn}>
                            <FaGift className={styles.giftIcon} />
                            <span>선물하기</span>
                        </button>

                        <button className={styles.cartBtn}>장바구니</button>
                        <button className={styles.buyBtn}>바로결제</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;
