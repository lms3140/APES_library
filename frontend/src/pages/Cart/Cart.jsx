import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepItemNum } from '../../components/Cart/stepItemNum.jsx';
import ShippingInfoPopup from './ShippingInfoPopup.jsx';
import styles from './Cart.module.css';

import { useSelector } from 'react-redux'

const Cart = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const productPrice = 5500;
  const shippingFee = 2500;
  const discount = 4800;
  const totalPrice = productPrice * quantity + shippingFee - discount;
  const rewardPoint = Math.floor(totalPrice * 0.01);
  const freeShippingThreshold = 9500;

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <div className={styles.cartLayout}>
      {/* 좌측 상품 정보 */}
      <div className={styles.leftArea}>
        <h1>장바구니</h1>
        {/* 장바구니 단계 표시 */}
        <div className={styles.cartTopWrap}>
          <div className={styles.rightArea}>
            <div className={styles.rightAreaWrap}>
              <ol className={styles.stepRoundTextList}>
                <StepItemNum />
              </ol>
            </div>
          </div>
        </div>

        <div className={styles.cartItem}>
          <div className={styles.productInfo}>
            <h2>[서양도서] Diary of a Wimpy Kid #1</h2>
            <p className={styles.price}>{productPrice}원</p>
            <p className={styles.discount}>47% 할인</p>
          </div>

          <div className={styles.quantityContainer}>
            <button className={styles.quantityButton} onClick={decrementQuantity}>-</button>
            <span className={styles.quantity}>{quantity}</span>
            <button className={styles.quantityButton} onClick={incrementQuantity}>+</button>
          </div>
        </div>

        <div className={styles.deliveryInfo}>
          <p>당일배송: 오늘(11/20, 목) 도착</p>
        </div>
      </div>

      {/* 우측 사이드바 */}
      <div className={styles.sidebar}>
        <h3>결제 정보</h3>
        <div className={styles.sideRow}>상품 금액 <span>{productPrice * quantity}원</span></div>
        <div className={styles.sideRow}>
          배송비
          <button
            className={styles.helpButton}
            onClick={() => setShowPopup(true)}
          >
            ?
          </button>
          <span>{shippingFee}원</span>
        </div>
        <div className={styles.sideRow}>상품 할인 <span>-{discount}원</span></div>

        <hr />

        <div className={styles.totalRow}>
          결제 예정 금액
          <span>{totalPrice}원</span>
        </div>

        <div className={styles.pointRow}>
          적립 예정 포인트: <span>{rewardPoint}P</span>
        </div>

        <button
          className={styles.orderButton}
          onClick={() => navigate("/payment")}
        >
          주문하기
        </button>
      </div>

      {/* 배송비 안내 팝업 */}
      {showPopup && (
        <ShippingInfoPopup onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default Cart;
