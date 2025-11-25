import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Cart.module.css';
import { useGetFetch } from '../../hooks/useGetFetch';

const Cart = () => {
  const navigate = useNavigate();
  const { data: cartItems, isLoading, isError } = useGetFetch('http://localhost:8080/cart'); // 장바구니 API
  const [quantities, setQuantities] = useState({}); // 각 책별 수량

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>장바구니 데이터를 불러올 수 없습니다.</div>;
  if (!cartItems || cartItems.length === 0) return <div>장바구니가 비어 있습니다.</div>;

  // 수량 증가/감소
  const increment = (bookId) => {
    setQuantities(prev => ({ ...prev, [bookId]: (prev[bookId] || 1) + 1 }));
  };

  const decrement = (bookId) => {
    setQuantities(prev => ({ ...prev, [bookId]: Math.max(1, (prev[bookId] || 1) - 1) }));
  };

  // 장바구니 합계 계산
  const getPrice = (price, bookId) => Math.floor(price * 0.9) * (quantities[bookId] || 1); // 10% 할인
  const totalPrice = cartItems.reduce((sum, item) => sum + getPrice(item.price, item.bookId), 0);
  const rewardPoints = Math.floor(totalPrice * 0.01);
  const shippingFee = totalPrice >= 9500 ? 0 : 2500; // 9500원 이상 무료배송
  const finalPrice = totalPrice + shippingFee;

  return (
    <div className={styles.cartLayout}>
      {/* 좌측 상품 정보 */}
      <div className={styles.leftArea}>
        <h1>장바구니</h1>
        {cartItems.map(item => {
          const discountedPrice = Math.floor(item.price * 0.9);
          return (
            <div className={styles.cartItem} key={item.bookId}>
              <img src={item.imageUrl} alt={item.title} className={styles.bookImage} />
              <div className={styles.productInfo}>
                <h2>{item.title}</h2>
                <p className={styles.price}>{discountedPrice}원</p>
                <p>적립 {item.point}P</p>
              </div>
              <div className={styles.quantityContainer}>
                <button onClick={() => decrement(item.bookId)}>-</button>
                <span>{quantities[item.bookId] || 1}</span>
                <button onClick={() => increment(item.bookId)}>+</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 우측 결제 정보 */}
      <div className={styles.sidebar}>
        <h3>결제 정보</h3>
        <div className={styles.sideRow}>
          상품 금액: <span>{totalPrice}원</span>
        </div>
        <div className={styles.sideRow}>
          배송비: <span>{shippingFee === 0 ? '무료' : `${shippingFee}원`}</span>
        </div>
        <div className={styles.sideRow}>
          적립 포인트: <span>{rewardPoints}P</span>
        </div>
        <hr />
        <div className={styles.totalRow}>
          결제 예정 금액: <span>{finalPrice}원</span>
        </div>
        <button className={styles.orderButton} onClick={() => navigate('/payment')}>
          주문하기
        </button>
      </div>
    </div>
  );
};

export default Cart;
