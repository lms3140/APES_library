import React, { useState } from "react";
import styles from "./UnderBar.module.css";
import spinnerUp from "./ico_spinner_up.png";
import spinnerDown from "./ico_spinner_down.png";
import heartBlack from "./heart_black.png";
import heartRed from "./heart_red.png";
import presentImg from "./present.png";
import { addCartItem } from "../../utils/cartStorage";

const UnderBar = ({ product, count, setCount, liked, setLiked }) => {
  if (!product) return null;

  const handleIncrease = () => setCount(prev => prev + 1);
  const handleDecrease = () => setCount(prev => (prev > 1 ? prev - 1 : 1));
  const toggleLike = () => setLiked(prev => !prev);

  const totalPrice = (product.price * count).toLocaleString();

  const handleAddToCart = () => {
    addCartItem({ ...product, quantity: count });
    if (window.confirm("선택한 상품을 장바구니에 담았어요.\n장바구니로 이동하시겠어요?")) {
      window.location.href = "/cart";
    }
  };

  return (
    <div className={styles.bottomBar}>
      <div className={styles.bottomBarContent}>
        <div className={styles.priceInfo}>
          <span className={styles.label}>총 상품 금액</span>
          <span className={styles.amount}>{totalPrice}</span>
          <span className={styles.one}>원</span>
        </div>

        <div className={styles.controls}>
          <div className={styles.leftControls}>
            <div className={styles.qtyControlWrapper}>
              <button className={styles.qtyBtn} onClick={handleDecrease}>
                <img src={spinnerDown} alt="감소" />
              </button>
              <span className={styles.qtyValue}>{count}</span>
              <button className={styles.qtyBtn} onClick={handleIncrease}>
                <img src={spinnerUp} alt="증가" />
              </button>
            </div>

            <button className={styles.iconBtn} onClick={toggleLike}>
              <img src={liked ? heartRed : heartBlack} alt="heart" className={styles.heartIcon} />
            </button>
          </div>

          <div className={styles.rightButtons}>
            <button className={styles.giftBtn}>
              <img src={presentImg} alt="present" className={styles.presentIcon} />
              선물하기
            </button>
            <button className={styles.cartBtn} onClick={handleAddToCart}>장바구니</button>
            <button className={styles.buyBtn}>바로구매</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderBar;
