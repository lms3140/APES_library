import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Cart.module.css";
import { StepItemNum } from "../../components/Cart/StepItemNum.jsx";
import { getCartItems, updateCartItemQuantity, removeCartItem } from "../../utils/cartStorage";
import Swal from "sweetalert2";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleIncrease = (bookId) => {
    const item = cartItems.find((i) => i.bookId === bookId);
    if (!item) return;
    updateCartItemQuantity(bookId, item.quantity + 1);
    setCartItems((prev) =>
      prev.map((i) => (i.bookId === bookId ? { ...i, quantity: i.quantity + 1 } : i))
    );
  };

  const handleDecrease = (bookId) => {
    const item = cartItems.find((i) => i.bookId === bookId);
    if (!item) return;
    if (item.quantity === 1) {
      handleRemoveItem(bookId);
      return;
    }
    updateCartItemQuantity(bookId, item.quantity - 1);
    setCartItems((prev) =>
      prev.map((i) => (i.bookId === bookId ? { ...i, quantity: i.quantity - 1 } : i))
    );
  };

  const removeItem = (bookId) => {
    removeCartItem(bookId);
    setCartItems((prev) => prev.filter((i) => i.bookId !== bookId));
  };

  const handleRemoveItem = async (bookId) => {
    const result = await Swal.fire({
      title: "선택 상품을 삭제하시겠어요?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
      customClass: {
        popup: "customPopup",
        title: "customTitle",
        confirmButton: "customConfirmButton",
        cancelButton: "customCancelButton",
      },
    });
    if (result.isConfirmed) {
      removeItem(bookId);
       Swal.fire({
            title: "선택 상품이 삭제되었습니다.",
            confirmButtonText: "확인",
            customClass: {
              popup: "customPopup",
              title: "customTitle",
              confirmButton: "customConfirmButton",
            },
          });
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalDiscount = Math.floor(totalPrice * 0.1);
  const finalPrice = totalPrice - totalDiscount;
  const totalPoints = Math.floor(totalPrice * 0.1);

  const goToDetail = (bookId) => {
    navigate(`/detail/${bookId}`);
  };

  const handleOrder = async () => {
    if (cartItems.length === 0) return;
    const result = await Swal.fire({
      title: `${cartItems.length}개의 상품을 주문하시겠어요?`,
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      customClass: {
            popup: "customPopup",
            title: "customTitle",
            confirmButton: "customConfirmButton",
            cancelButton: "customCancelButton",
      },
    });
    if (result.isConfirmed) {
      navigate("/payment", {
        state: {
          orderItems: cartItems.map((item) => ({
            bookId: item.bookId,
            quantity: item.quantity,
          })),
        },
      });
    }
  };

  return (
    <section className={styles.contents}>
      <div className={styles.cartTopWrap}>
        <p className={styles.titleWrap}>장바구니 ({totalCount})</p>
        <ul className={styles.stepWrapper}>
          <StepItemNum activeStep={1} />
        </ul>
      </div>

      <div className={styles.cartLayout}>
        <div className={styles.leftArea}>
          <div className={styles.cartBox}>
            {cartItems.length === 0 ? (
              <p className={styles.empty}>장바구니가 비어 있습니다.</p>
            ) : (
              cartItems.map((item) => {
                const discountedPrice = Math.floor(item.price * 0.9);
                return (
                  <div key={item.bookId} className={styles.cartItem}>
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className={styles.bookImage}
                      style={{ cursor: "pointer" }}
                      onClick={() => goToDetail(item.bookId)}
                    />
                    <div>
                      <h2 style={{ cursor: "pointer" }} onClick={() => goToDetail(item.bookId)}>
                        {item.title}
                      </h2>
                      <div className={styles.priceRow}>
                        <span className={styles.discountRate}>10%</span>
                        <span className={styles.discountedPrice}>
                          ₩ {discountedPrice.toLocaleString()}
                        </span>
                        <span className={styles.originalPrice}>₩ {item.price.toLocaleString()}</span>
                      </div>

                      <div className={styles.quantityContainer}>
                        <div className={styles.qtyControlWrapper}>
                          <button
                            className={styles.qtyBtn}
                            onClick={() => handleDecrease(item.bookId)}
                          >
                            -
                          </button>
                          <span className={styles.qtyValue}>{item.quantity}</span>
                          <button
                            className={styles.qtyBtn}
                            onClick={() => handleIncrease(item.bookId)}
                          >
                            +
                          </button>
                        </div>
                        <button className={styles.deleteBtn} onClick={() => handleRemoveItem(item.bookId)}>
                          삭제
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className={styles.rightArea}>
          <div className={styles.summary}>
            <p>
              <span>상품 금액</span>
              <span>₩ {totalPrice.toLocaleString()}</span>
            </p>
            <p>
              <span>할인 금액</span>
              <span>-₩ {totalDiscount.toLocaleString()}</span>
            </p>
            <p>
              <span>포인트 적립</span>
              <span>{totalPoints.toLocaleString()}P</span>
            </p>
            <p className={styles.finalPrice}>
              <span>결제 예정 금액</span>
              <span>₩ {finalPrice.toLocaleString()}</span>
            </p>
          </div>
          <button className={styles.orderBtn} onClick={handleOrder}>
            주문하기
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
