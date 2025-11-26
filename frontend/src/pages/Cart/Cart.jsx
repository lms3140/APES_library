import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ← import 추가
import styles from "./Cart.module.css";
import { StepItemNum } from "../../components/Cart/StepItemNum.jsx";
import {
  getCartItems,
  updateCartItemQuantity,
  removeCartItem,
} from "../../utils/cartStorage";

import spinnerUp from "../../../public/images/detail/ico_spinner_up.png";
import spinnerDown from "../../../public/images/detail/ico_spinner_down.png";

import Swal from "sweetalert2";
import "../../css/swal_cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const increment = (bookId) => {
    const item = cartItems.find((i) => i.bookId === bookId);
    if (!item) return;
    updateCartItemQuantity(bookId, item.quantity + 1);
    setCartItems((prev) =>
      prev.map((i) =>
        i.bookId === bookId ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  };

  const decrement = (bookId) => {
    const item = cartItems.find((i) => i.bookId === bookId);
    if (!item) return;

    if (item.quantity === 1) {
      // 1️⃣ 수량이 1일 때 삭제 확인 팝업
      Swal.fire({
        html: `
          <p class="cartPopupTitle"><strong>상품을 삭제하시겠어요?</strong></p>
          <div class="cartPopupBtnWrap">
            <button id="cancelBtn" class="customCancleButton">취소</button>
            <button id="deleteBtn" class="customConfirmButton">삭제</button>
          </div>
        `,
        showConfirmButton: false,
        showCancelButton: false,
        allowOutsideClick: false,
        customClass: { popup: "customPopup" },
        didRender: () => {
          document.getElementById("cancelBtn").addEventListener("click", () => Swal.close());
          document.getElementById("deleteBtn").addEventListener("click", () => {
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
          });
        },
      });
      return;
    }

    updateCartItemQuantity(bookId, item.quantity - 1);
    setCartItems((prev) =>
      prev.map((i) =>
        i.bookId === bookId ? { ...i, quantity: i.quantity - 1 } : i
      )
    );
  };

  const removeItem = (bookId) => {
    removeCartItem(bookId);
    setCartItems((prev) => prev.filter((i) => i.bookId !== bookId));
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalDiscount = Math.floor(totalPrice * 0.1);
  const finalPrice = totalPrice - totalDiscount;
  const totalPoints = Math.floor(totalPrice * 0.1);

  const goToDetail = (bookId) => {
    navigate(`/detail/${bookId}`);
  };

  return (
    <section className={styles.contents}>
      <div className={styles.cartTopWrap}>
        <p className={styles.titleWrap}>장바구니 ({totalCount})</p>
        <div className={styles.stepWrapper}>
          <StepItemNum />
        </div>
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
                      <h2
                        style={{ cursor: "pointer" }}
                        onClick={() => goToDetail(item.bookId)}
                      >
                        {item.title}
                      </h2>

                      <div className={styles.priceRow}>
                        <span className={styles.discountRate}>10%</span>
                        <span className={styles.discountedPrice}>
                          ₩ {discountedPrice.toLocaleString()}
                        </span>
                        <span className={styles.originalPrice}>
                          ₩ {item.price.toLocaleString()}
                        </span>
                      </div>

                      <div className={styles.quantityContainer}>
                        <div className={styles.qtyControlWrapper}>
                          <button
                            className={styles.qtyBtn}
                            onClick={() => decrement(item.bookId)}
                          >
                            <img src={spinnerDown} alt="감소" />
                          </button>
                          <span className={styles.qtyValue}>{item.quantity}</span>
                          <button
                            className={styles.qtyBtn}
                            onClick={() => increment(item.bookId)}
                          >
                            <img src={spinnerUp} alt="증가" />
                          </button>
                        </div>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => {
                            // 2️⃣ 삭제 버튼 클릭 시 팝업
                            Swal.fire({
                              html: `
                                <p class="cartPopupTitle"><strong>상품을 삭제하시겠어요?</strong></p>
                                <div class="cartPopupBtnWrap">
                                  <button id="cancelBtn" class="customCancleButton">취소</button>
                                  <button id="deleteBtn" class="customConfirmButton">삭제</button>
                                </div>
                              `,
                              showConfirmButton: false,
                              showCancelButton: false,
                              allowOutsideClick: false,
                              customClass: { popup: "customPopup" },
                              didRender: () => {
                                document.getElementById("cancelBtn").addEventListener("click", () => Swal.close());
                                document.getElementById("deleteBtn").addEventListener("click", () => {
                                  removeItem(item.bookId);
                                  Swal.fire({
                                    title: "선택 상품이 삭제되었습니다.",
                                    confirmButtonText: "확인",
                                    customClass: {
                                      popup: "customPopup",
                                      title: "customTitle",
                                      confirmButton: "customConfirmButton",
                                    },
                                  });
                                });
                              },
                            });
                          }}
                        >
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
            <p className={styles.freeDelivery}>배송비 무료</p>
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

          {/* 3️⃣ 주문하기 버튼 클릭 시 Payment 페이지로 책 ID와 수량 전달 */}
          <button
            className={styles.orderBtn}
            onClick={async () => {
              if (cartItems.length === 0) return;

              const result = await Swal.fire({
                html: `
                  <p class="cartPopupTitle"><strong>${cartItems.length}개의 상품을 주문하시겠어요?</strong></p>
                  <div class="cartPopupBtnWrap">
                    <button id="cancelBtn" class="customCancleButton">취소</button>
                    <button id="confirmBtn" class="customConfirmButton">확인</button>
                  </div>
                `,
                showConfirmButton: false,
                showCancelButton: false,
                allowOutsideClick: false,
                customClass: { popup: "customPopup" },
                didRender: () => {
                  document.getElementById("cancelBtn").addEventListener("click", () => Swal.close());
                  document.getElementById("confirmBtn").addEventListener("click", () => Swal.close());
                },
              });

              // 4️⃣ 확인 클릭 후 Payment 페이지로 이동하며 Cart 데이터 전달
              navigate("/payment", {
                state: {
                  orderItems: cartItems.map(item => ({
                    bookId: item.bookId,
                    quantity: item.quantity
                  })),
                },
              });
            }}
          >
            주문하기
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
