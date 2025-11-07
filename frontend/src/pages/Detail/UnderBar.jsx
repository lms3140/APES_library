import React, { useState } from "react";
import { FaGift } from "react-icons/fa";
import styles from "./UnderBar.module.css";
import heartBlack from "./heart_black.png";
import heartRed from "./heart_red.png";
import presentImg from "./present.png";

export const UnderBar = () => {
    const [count, setCount] = useState(1);
    const [liked, setLiked] = useState(false); // 하트 상태
    const price = 17100;
    const total = (price * count).toLocaleString();

    const handleIncrease = () => setCount(prev => prev + 1);
    const handleDecrease = () => setCount(prev => (prev > 1 ? prev - 1 : 1));
    const toggleLike = () => setLiked(prev => !prev); // 클릭 시 토글

    return (
        <div className={styles.bottomBar}>
            <div className={styles.bottomBarContent}>
                <div className={styles.priceInfo}>
                    총 상품 금액 <span>{total}원</span>
                </div>

                <div className={styles.controls}>
                    <div className={styles.qtyControl}>
                        <button onClick={handleDecrease}>−</button>
                        <span>{count}</span>
                        <button onClick={handleIncrease}>＋</button>
                    </div>

                    {/* 하트 버튼 */}
                    <button className={styles.iconBtn} onClick={toggleLike}>
                        <img
                            src={liked ? heartRed : heartBlack}
                            alt="heart"
                            className={styles.heartIcon}
                        />
                    </button>

                    {/* 선물하기 버튼 */}
                    <button className={styles.giftBtn}>
                        <img
                            src={presentImg}
                            alt="present"
                            className={styles.presentIcon}
                        />
                        선물하기
                    </button>
                    <button className={styles.cartBtn}>장바구니</button>
                    <button className={styles.buyBtn}>바로구매</button>
                </div>
            </div>
        </div>
    );
};
