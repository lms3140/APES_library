import React from "react";
import styles from "./UnderBar.module.css";
import heartBlack from "./heart_black.png";
import heartRed from "./heart_red.png";
import presentImg from "./present.png";

const UnderBar = ({ product, count, setCount, liked, setLiked }) => {
  if (!product) return null;

  const handleIncrease = () => setCount(prev => prev + 1);
  const handleDecrease = () => setCount(prev => (prev > 1 ? prev - 1 : 1));
  const toggleLike = () => setLiked(prev => !prev);

  const totalPrice = (product.price * count).toLocaleString();

  return (
    <div className={styles.bottomBar}>
      <div className={styles.bottomBarContent}>
        <div className={styles.priceInfo}>
          총 상품 금액 <span>₩ {totalPrice}</span>
        </div>

        <div className={styles.controls}>
          {/* 수량 조절 */}
          <div className={styles.qtyControl}>
            <button onClick={handleDecrease}>−</button>
            <span>{count}</span>
            <button onClick={handleIncrease}>＋</button>
          </div>

          {/* 좋아요 */}
          <button className={styles.iconBtn} onClick={toggleLike}>
            <img
              src={liked ? heartRed : heartBlack}
              alt="heart"
              className={styles.heartIcon}
            />
          </button>

          {/* 선물하기 */}
          <button className={styles.giftBtn}>
            <img
              src={presentImg}
              alt="present"
              className={styles.presentIcon}
            />
            선물하기
          </button>

          {/* 장바구니 / 바로구매 */}
          <button className={styles.cartBtn}>장바구니</button>
          <button className={styles.buyBtn}>바로구매</button>
        </div>
      </div>
    </div>
  );
};

export default UnderBar;
