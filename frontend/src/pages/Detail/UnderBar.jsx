import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaGift } from "react-icons/fa";
import styles from "./UnderBar.module.css";
import heartBlack from "./heart_black.png";
import heartRed from "./heart_red.png";
import presentImg from "./present.png";

export const UnderBar = ({ productId }) => {
  const [count, setCount] = useState(1);
  const [liked, setLiked] = useState(false);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ axios로 상품 정보 가져오기
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5173/Product/detail`, {
          params: { pid: productId }
        });
        setProduct(data);
      } catch (error) {
        console.error("상품 데이터를 불러오는 데 실패했습니다.", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductData();
  }, [productId]);

  const handleIncrease = () => setCount(prev => prev + 1);
  const handleDecrease = () => setCount(prev => (prev > 1 ? prev - 1 : 1));
  const toggleLike = () => setLiked(prev => !prev);

  if (isLoading) return <div>상품 정보를 불러오는 중...</div>;
  if (!product) return <div>상품을 찾을 수 없습니다.</div>;

  const price = product.price || 0;
  const total = (price * count).toLocaleString();

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

          <button className={styles.iconBtn} onClick={toggleLike}>
            <img
              src={liked ? heartRed : heartBlack}
              alt="heart"
              className={styles.heartIcon}
            />
          </button>

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
