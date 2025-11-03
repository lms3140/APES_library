import React from "react";
import coverImage from "./cover.jpg"
import styles from "./Detail.module.css";
import { FaHeart, FaGift } from "react-icons/fa"; // ❤️🎁 아이콘 추가

const Detail = () => {
    return (
        <div className={styles.container}>
            {/* 상단: 책 이미지 + 기본 정보 */}
            <div className={styles.detailTop}>
                <img
                    src={coverImage}
                    alt="장르의 해부학"
                    className={styles.bookImage}
                />
                <div className={styles.bookInfo}>
                    <h2 className={styles.title}>장르의 해부학</h2>
                    <p className={styles.author}>존 트루비 지음 | 출판사 다산초당 </p>
                    <p className={styles.price}>₩34,560</p>
                </div>
            </div>

            {/* 책 소개 */}
            <div className={styles.detailSection}>
                <h3 className={styles.sectionTitle}>책 소개</h3>
                <p className={styles.description}>
                    이 책은 독자에게 다양한 지식을 제공하며, 실용적인 팁과 사례를 통해
                    이해를 돕습니다. 간결하면서도 깊이 있는 내용으로 구성되어 있습니다.
                </p>
            </div>

            {/* 목차 */}
            <div className={styles.detailSection}>
                <h3 className={styles.sectionTitle}>목차</h3>
                <ul className={styles.tableOfContents}>
                    <li>1장: 시작하기</li>
                    <li>2장: 기본 개념</li>
                    <li>3장: 실전 예제</li>
                    <li>4장: 심화 학습</li>
                </ul>
            </div>

            {/* 리뷰 */}
            <div className={styles.detailSection}>
                <h3 className={styles.sectionTitle}>리뷰</h3>
                <p className={styles.review}>
                    "정말 유용한 책이에요! 내용이 쉽게 정리되어 있고, 실습 예제도 많아서
                    바로 적용해 볼 수 있습니다."
                </p>
            </div>

            {/* 구매 버튼 */}
            <button className={styles.btnPurchase}>구매하기</button>

            {/* ✅ 하단 고정 바 */}
            <div className={styles.bottomBar}>
                <div className={styles.barContent}>
                    <div className={styles.barPrice}>
                        <span>₩34,560</span>
                    </div>

                    {/* 버튼 그룹 */}
                    <div className={styles.barButtons}>
                        {/* 하트 */}
                        <button className={styles.iconBtn}>
                            <FaHeart className={styles.heartIcon} />
                        </button>

                        {/* 선물하기 */}
                        <button className={styles.giftBtn}>
                            <FaGift className={styles.giftIcon} />
                            <span>선물하기</span>
                        </button>

                        {/* 장바구니 */}
                        <button className={styles.cartBtn}>장바구니</button>

                        {/* 바로결제 */}
                        <button className={styles.buyBtn}>바로결제</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;
