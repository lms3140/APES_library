import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Cart.module.css";
import { StepItemNum } from "../../components/Cart/StepItemNum.jsx";
import {
  getCartItems,
  updateCartItemQuantity,
  removeCartItem,
} from "../../utils/cartStorage";
import Swal from "sweetalert2";
import { isLoggedIn } from "../../components/Auth/loginCheck.js";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const items = getCartItems();
    setCartItems(items);
    setSelectedItems(items.map((item) => item.bookId)); // 기본 전체 선택
  }, []);

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  /** 전체 선택 */
  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.bookId));
    }
  };

  /** 개별 선택 */
  const toggleSelectItem = (bookId) => {
    setSelectedItems((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  };

  /** 삭제 */
  const removeItem = (bookId) => {
    removeCartItem(bookId);
    setCartItems((prev) => prev.filter((i) => i.bookId !== bookId));
    setSelectedItems((prev) => prev.filter((id) => id !== bookId));
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

  /** 선택 삭제 */
  const handleRemoveSelected = async () => {
    if (selectedItems.length === 0) return;

    const result = await Swal.fire({
      title: `${selectedItems.length}개의 상품을 삭제하시겠어요?`,
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
      selectedItems.forEach((id) => removeCartItem(id));
      setCartItems((prev) =>
        prev.filter((item) => !selectedItems.includes(item.bookId))
      );
      setSelectedItems([]);

      Swal.fire({
        title: "선택한 상품이 삭제되었습니다.",
        confirmButtonText: "확인",
        customClass: {
          popup: "customPopup",
          title: "customTitle",
          confirmButton: "customConfirmButton",
        },
      });
    }
  };

  /** 수량 증가 감소 */
  const handleIncrease = (bookId) => {
    const item = cartItems.find((i) => i.bookId === bookId);
    if (!item) return;

    updateCartItemQuantity(bookId, item.quantity + 1);

    setCartItems((prev) =>
      prev.map((i) =>
        i.bookId === bookId ? { ...i, quantity: i.quantity + 1 } : i
      )
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
      prev.map((i) =>
        i.bookId === bookId ? { ...i, quantity: i.quantity - 1 } : i
      )
    );
  };

  /** 가격 계산 */
  const selectedCartItems = cartItems.filter((item) =>
    selectedItems.includes(item.bookId)
  );

  const totalPrice = selectedCartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalDiscount = Math.floor(totalPrice * 0.1);
  const finalPrice = totalPrice - totalDiscount;
  const totalPoints = Math.floor(totalPrice * 0.1);

  /** 로그인 요구 Swal */
  const requireLoginSwal = async () => {
    const result = await Swal.fire({
      title: "로그인이 필요합니다",
      text: "로그인 후 주문을 진행해주세요.",
      confirmButtonText: "로그인 하기",
      cancelButtonText: "취소",
      showCancelButton: true,
      customClass: {
        popup: "customPopup",
        title: "customTitle",
        htmlContainer: "customText",
        confirmButton: "customConfirmButton",
        cancelButton: "customCancelButton",
      },
    });

    if (result.isConfirmed) navigate("/login");
  };

  /** 주문 */
  const handleOrder = async () => {
    if (!isLoggedIn()) return await requireLoginSwal();
    if (selectedItems.length === 0) return;

    const selectedData = selectedCartItems.map((item) => ({
      bookId: item.bookId,
      quantity: item.quantity,
      title: item.title,
      price: item.price,
      imageUrl: item.imageUrl,
    }));

    const result = await Swal.fire({
      title: `${selectedItems.length}개의 상품을 주문하시겠어요?`,
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
      navigate("/payment", { state: { orderItems: selectedData } });
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
        {/* LEFT */}
        <div className={styles.leftArea}>
          <div className={styles.selectArea}>
            <label className={styles.checkLabel}>
              <input
                type="checkbox"
                checked={selectedItems.length === cartItems.length}
                onChange={toggleSelectAll}
              />
              전체 선택
            </label>

            <button
              className={styles.deleteSelectedBtn}
              onClick={handleRemoveSelected}
              disabled={selectedItems.length === 0}
            >
              선택 삭제
            </button>
          </div>

          <div className={styles.cartBox}>
            {cartItems.length === 0 ? (
              <p className={styles.empty}>장바구니가 비어 있습니다.</p>
            ) : (
              cartItems.map((item) => {
                const discountedPrice = Math.floor(item.price * 0.9);
                const itemTotal = discountedPrice * item.quantity;

                return (
                  <div key={item.bookId} className={styles.cartItem}>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.bookId)}
                      onChange={() => toggleSelectItem(item.bookId)}
                      className={styles.itemCheckbox}
                    />

                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className={styles.bookImage}
                      onClick={() => navigate(`/detail/${item.bookId}`)}
                      style={{ cursor: "pointer" }}
                    />

                    <div>
                      <h2
                        onClick={() => navigate(`/detail/${item.bookId}`)}
                        style={{ cursor: "pointer" }}
                      >
                        {item.title}
                      </h2>

                      {/* 가격 표시 */}
                      <div className={styles.priceRow}>
                        <span className={styles.discountRate}>10%</span>
                        <span className={styles.discountedPrice}>
                          ₩ {discountedPrice.toLocaleString()}
                        </span>
                        <span className={styles.originalPrice}>
                          ₩ {item.price.toLocaleString()}
                        </span>
                      </div>

                      {/* 수량 + 총 가격 */}
                      <div className={styles.quantityContainer}>
                        <div className={styles.qtyControlWrapper}>
                          <button
                            className={styles.qtyBtn}
                            onClick={() => handleDecrease(item.bookId)}
                          >
                          <img
                              src="/images/detail/ico_spinner_down.png"
                              className={styles.qtyIcon}
                            />
                          </button>
                          <span className={styles.qtyValue}>
                            {item.quantity}
                          </span>
                          <button
                            className={styles.qtyBtn}
                            onClick={() => handleIncrease(item.bookId)}
                          >
                          <img
                            src="/images/detail/ico_spinner_up.png"
                            className={styles.qtyIcon}
                          />
                          </button>
                        </div>

                        <div className={styles.itemTotalPrice}>
                          ₩ {itemTotal.toLocaleString()}
                        </div>

                        <button
                          className={styles.deleteBtn}
                          onClick={() => handleRemoveItem(item.bookId)}
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

        {/* RIGHT */}
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

            <button
              className={styles.orderBtn}
              onClick={handleOrder}
              disabled={selectedItems.length === 0}
            >
              선택 상품 주문하기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
