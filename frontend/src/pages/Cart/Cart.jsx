import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import { getCartItems, updateCartItemQuantity, removeCartItem } from "../../utils/cartStorage";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const increment = (bookId) => {
    const updated = cartItems.map(item => {
      if (item.bookId === bookId) {
        updateCartItemQuantity(bookId, item.quantity + 1);
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updated);
  };

  const decrement = (bookId) => {
    const updated = cartItems.map(item => {
      if (item.bookId === bookId && item.quantity > 1) {
        updateCartItemQuantity(bookId, item.quantity - 1);
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updated);
  };

  const removeItem = (bookId) => {
    removeCartItem(bookId);
    setCartItems(getCartItems());
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalDiscount = Math.floor(totalPrice * 0.1); // 10% 할인
  const finalPrice = totalPrice - totalDiscount;

  return (
    <div className={styles.cartLayout}>
      {cartItems.map(item => (
        <div key={item.bookId} className={styles.cartItem}>
          <img src={item.imageUrl} alt={item.title} className={styles.bookImage} />
          <div>
            <h2>{item.title}</h2>
            <p>가격: {item.price}원</p>
            <p>할인 10%</p>
            <div className={styles.quantityContainer}>
              <button onClick={() => decrement(item.bookId)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increment(item.bookId)}>+</button>
              <button onClick={() => removeItem(item.bookId)}>삭제</button>
            </div>
          </div>
        </div>
      ))}

      <div className={styles.summary}>
        <p>총 합계: {finalPrice}원</p>
      </div>
    </div>
  );
};

export default Cart;
