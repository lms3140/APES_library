import React from "react";
import styles from "./UnderBar.module.css";
import spinnerUp from "../../../public/images/detail/ico_spinner_up.png";
import spinnerDown from "../../../public/images/detail/ico_spinner_down.png";
import heartBlack from "../../../public/images/detail/heart_black.png";
import heartRed from "../../../public/images/detail/heart_red.png";

import Swal from "sweetalert2";
import "../../css/swal_cart.css"; // 새 CSS 파일
import { addCartItem, isInCart } from "../../utils/cartStorage.js"; // isInCart 추가

const UnderBar = ({ product, count, setCount, liked, setLiked }) => {
  if (!product) return null;

  // 수량 증가/감소
  const handleIncrease = () => setCount(prev => prev + 1);
  const handleDecrease = () => setCount(prev => (prev > 1 ? prev - 1 : 1));

  // 좋아요 토글
  const toggleLike = () => setLiked(prev => !prev);

  // 총 금액 계산
  const totalPrice = (product.price * count).toLocaleString();

  // 장바구니 버튼 클릭
  const handleAddToCart = () => {
    const existingItem = isInCart(product.bookId); // 이미 있는지 확인
    addCartItem({ ...product, quantity: count }); // 장바구니에 추가/수량 갱신

    const message = existingItem
      ? "이미 장바구니에 담긴 상품이에요. 수량이 추가 되었어요."
      : "선택한 상품을 장바구니에 담았어요.";

    Swal.fire({
      html: `
        <p class="cartPopupTitle"><strong>${message}</strong></p>
        <p class="cartPopupText">장바구니로 이동하시겠어요?</p>
        <div class="cartPopupBtnWrap">
          <button id="continueBtn" class="cartCancelButton">계속 쇼핑</button>
          <button id="goCartBtn" class="cartConfirmButton">장바구니 이동</button>
        </div>
      `,
      showConfirmButton: false,
      showCancelButton: false,
      allowOutsideClick: false,
      customClass: {
        popup: "cartPopup",
      },
      didRender: () => {
        document.getElementById("goCartBtn").addEventListener("click", () => {
          window.location.href = "/cart";
        });
        document.getElementById("continueBtn").addEventListener("click", () => {
          Swal.close();
        });
      },
    });
  };

  return (
    <div className={styles.bottomBar}>
      <div className={styles.bottomBarContent}>

        {/* 가격 영역 */}
        <div className={styles.priceInfo}>
          <span className={styles.label}>총 상품 금액</span>
          <span className={styles.amount}>{totalPrice}</span>
          <span className={styles.one}>원</span>
        </div>

        {/* 조작 버튼 영역 */}
        <div className={styles.controls}>
          <div className={styles.leftControls}>
            {/* 수량 조절 */}
            <div className={styles.qtyControlWrapper}>
              <button className={styles.qtyBtn} onClick={handleDecrease}>
                <img src={spinnerDown} alt="감소" />
              </button>
              <span className={styles.qtyValue}>{count}</span>
              <button className={styles.qtyBtn} onClick={handleIncrease}>
                <img src={spinnerUp} alt="증가" />
              </button>
            </div>

            {/* 좋아요 */}
            <button className={styles.iconBtn} onClick={toggleLike}>
              <img src={liked ? heartRed : heartBlack} alt="heart" className={styles.heartIcon} />
            </button>
          </div>

          {/* 장바구니 & 구매 */}
          <div className={styles.rightButtons}>
            <button className={styles.cartBtn} onClick={handleAddToCart}>장바구니</button>
            <button className={styles.buyBtn}>바로구매</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UnderBar;
