import React, { useState, useEffect } from "react";
import { FaGift } from "react-icons/fa";
import styles from "./UnderBar.module.css";
import heartBlack from "./heart_black.png";
import heartRed from "./heart_red.png";
import presentImg from "./present.png";

export const UnderBar = ({ productId }) => {
  const [count, setCount] = useState(1);
  const [liked, setLiked] = useState(false);
  const [product, setProduct] = useState(null);  // 상품 정보 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  // 상품 데이터 서버에서 가져오기
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`http://localhost:5173/Product/detail?pid=${productId}`);
        const data = await response.json();
        setProduct(data); // 받은 데이터를 상태에 저장
      } catch (error) {
        console.error("상품 데이터를 불러오는 데 실패했습니다.", error);
      } finally {
        setIsLoading(false); // 로딩 끝
      }
    };

    fetchProductData();
  }, [productId]);

  // 수량 증가 및 감소 처리
  const handleIncrease = () => setCount(prev => prev + 1);
  const handleDecrease = () => setCount(prev => (prev > 1 ? prev - 1 : 1));

  // 좋아요 버튼 클릭 처리
  const toggleLike = () => setLiked(prev => !prev);

  // 로딩 중일 때
  if (isLoading) {
    return <div>상품 정보를 불러오는 중...</div>;
  }

  // 상품 정보가 없을 경우
  if (!product) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  const price = product.price || 0;  // 상품 가격
  const total = (price * count).toLocaleString();  // 총 금액 계산

  return (
    <div className={styles.bottomBar}>
      <div className={styles.bottomBarContent}>
        <div className={styles.priceInfo}>
          총 상품 금액 <span>{total}원</span>
        </div>

        <div className={styles.controls}>
          <div className={styles.qtyControl}>
            <button onClick={handleDecrease}>−</button>
            <span>{count}</span>
            <button onClick={handleIncrease}>＋</button>
          </div>

          {/* 좋아요 버튼 */}
          <button className={styles.iconBtn} onClick={toggleLike}>
            <img
              src={liked ? heartRed : heartBlack}
              alt="heart"
              className={styles.heartIcon}
            />
          </button>

          {/* 선물하기 버튼 */}
          <button className={styles.giftBtn}>
            <img
              src={presentImg}
              alt="present"
              className={styles.presentIcon}
            />
            선물하기
          </button>

          <button className={styles.cartBtn}>장바구니</button>
          <button className={styles.buyBtn}>바로구매</button>
        </div>
      </div>
    </div>
  );
};

export default UnderBar;
