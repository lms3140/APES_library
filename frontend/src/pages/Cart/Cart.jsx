import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";

import {
  getCartItems,
  updateCartItemQuantity,
  removeCartItem,
} from "../../utils/cartStorage";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // 최초 로딩 시 localStorage에서 불러오기
  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const increment = (bookId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.bookId === bookId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );

    updateCartItemQuantity(
      bookId,
      cartItems.find((i) => i.bookId === bookId).quantity + 1
    );
  };

  const decrement = (bookId) => {
    const item = cartItems.find((i) => i.bookId === bookId);

    if (!item) return;

    // 수량이 1일 때 감소 → 삭제 여부 확인
    if (item.quantity === 1) {
      const confirmDelete = window.confirm(
        "수량이 1입니다. 상품을 삭제하시겠습니까?"
      );
      if (confirmDelete) {
        removeItem(bookId);
      }
      return;
    }

    // 일반 감소
    setCartItems((prev) =>
      prev.map((i) =>
        i.bookId === bookId ? { ...i, quantity: i.quantity - 1 } : i
      )
    );
    updateCartItemQuantity(bookId, item.quantity - 1);
  };

  const removeItem = (bookId) => {
    removeCartItem(bookId);
    setCartItems((prev) => prev.filter((i) => i.bookId !== bookId));
  };

  // 합계 계산
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalDiscount = Math.floor(totalPrice * 0.1);
  const finalPrice = totalPrice - totalDiscount;

  return (
    <div className={styles.cartLayout}>
      {cartItems.length === 0 ? (
        <p className={styles.empty}>장바구니가 비어 있습니다.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.bookId} className={styles.cartItem}>
              <img
                src={item.imageUrl}
                alt={item.title}
                className={styles.bookImage}
              />

              <div>
                <h2>{item.title}</h2>
                <p>가격: {item.price.toLocaleString()}원</p>
                <p className={styles.discountText}>10% 할인 적용</p>

                <div className={styles.quantityContainer}>
                  <button onClick={() => decrement(item.bookId)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increment(item.bookId)}>+</button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => removeItem(item.bookId)}
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className={styles.summary}>
            <p>총 상품 금액: {totalPrice.toLocaleString()}원</p>
            <p>총 할인 금액 (10%): -{totalDiscount.toLocaleString()}원</p>
            <p className={styles.finalPrice}>
              최종 결제 금액: {finalPrice.toLocaleString()}원
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
