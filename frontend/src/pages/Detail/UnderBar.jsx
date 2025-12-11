import React from "react";
import styles from "./UnderBar.module.css";
import Swal from "sweetalert2";
import "../../css/swal.css";
import { addCartItem, isInCart } from "../../utils/cartStorage.js";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../../hooks/useWishlist.js";
import { isLoggedIn } from "../../components/Auth/loginCheck.js";

const UnderBar = ({ product, count, setCount }) => {
  const navigate = useNavigate();
  if (!product) return null;

  const { isWish, toggleWish } = useWishlist(product.bookId);

  // 수량 증가/감소
  const handleIncrease = () => setCount((prev) => prev + 1);
  const handleDecrease = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

  // 총 금액 계산
  const totalPrice = (product.price * count).toLocaleString();

  // 로그인 안내 Swal
  const requireLoginSwal = async () => {
    const result = await Swal.fire({
      title: "로그인이 필요합니다",
      text: "로그인 후 이용해주세요.",
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

    if (result.isConfirmed) {
      navigate("/login");
      return false;
    }

    return false;
  };

  // 장바구니 버튼 클릭 (로그인 불필요)
  const handleAddToCart = async () => {
    const existingItem = isInCart(product.bookId);
    addCartItem({ ...product, quantity: count });

    const title = existingItem
      ? "이미 장바구니에 담긴 상품이에요. 수량이 추가 되었어요."
      : "선택한 상품을 장바구니에 담았어요.";

    const result = await Swal.fire({
      title: title,
      text: "장바구니로 이동하시겠어요?",
      confirmButtonText: "장바구니 보기",
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

    if (result.isConfirmed) navigate("/cart");
  };

  // 찜(좋아요) 버튼 클릭 → 로그인 필요
  const handleWishClick = async () => {
    if (!isLoggedIn()) return await requireLoginSwal();
    toggleWish();
  };

  // 바로 구매 버튼 클릭 → 로그인 필요
  const handleBuyNow = async () => {
    if (!isLoggedIn()) return await requireLoginSwal();

    const result = await Swal.fire({
      title: "바로 구매하시겠습니까?",
      text: "선택한 상품을 결제 페이지로 이동합니다.",
      confirmButtonText: "결제 진행",
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

    if (result.isConfirmed) {
      navigate("/payment", {
        state: {
          orderItems: [
            {
              bookId: product.bookId,
              quantity: count,
              title: product.title,
              price: product.price,
              imageUrl: product.imageUrl,
            },
          ],
        },
      });
    }
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
                <img src="/images/detail/ico_spinner_down.png" alt="감소" />
              </button>
              <span className={styles.qtyValue}>{count}</span>
              <button className={styles.qtyBtn} onClick={handleIncrease}>
                <img src="/images/detail/ico_spinner_up.png" alt="증가" />
              </button>
            </div>

            {/* 좋아요 */}
            <button className={styles.iconBtn} onClick={handleWishClick}>
              <img
                src={
                  isWish
                    ? "/images/detail/heart_red.png"
                    : "/images/detail/heart_black.png"
                }
                alt="heart"
                className={styles.heartIcon}
              />
            </button>
          </div>

          {/* 장바구니 & 바로 구매 */}
          <div className={styles.rightButtons}>
            <button className={styles.cartBtn} onClick={handleAddToCart}>
              장바구니
            </button>
            <button className={styles.buyBtn} onClick={handleBuyNow}>
              바로구매
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderBar;
