import styles from "../../pages/Search/Search.module.css";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "../Checkbox/Checkbox";

import heartIcon from "/images/search/ico_heart.png";
import redHeartIcon from "/images/search/ico_heart_red.png";
import { confirmSwal, likeSwal, unlikeSwal } from "../../api/api";
import { useWishlist } from "../../hooks/useWishlist";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export function SearchItems({
  item,
  viewType,
  selectedItems,
  toggleSelect,
  toggleLike,
  isLoggedIn,
  addSingleToCart,
}) {
  const likedItems = useSelector((state) => state.liked.likedItems);
  const navigate = useNavigate();
  const isLiked = Boolean(likedItems.find((p) => p.bookId === item.bookId));
  const { isWish, toggleWish } = useWishlist(item.bookId);
  const handleLike = async () => {
    if (!isLoggedIn) {
      const result = await confirmSwal(
        "찜하기는 로그인 후 이용할 수 있어요.",
        "",
        "로그인하기"
      );

      if (result.isConfirmed) navigate("/login");
      return;
    }

    toggleLike(item.bookId);
    toggleWish();
    console.log(isLiked);
    isWish ? likeSwal : unlikeSwal;
  };

  const handleCheck = () => toggleSelect(item.bookId);
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${year}년 ${month.padStart(2, "0")}월 ${day.padStart(2, "0")}일`;
  };

  return (
    <div className={viewType === "list" ? styles.itemBox : styles.gridItem}>
      <Checkbox
        checked={selectedItems.includes(item.bookId)}
        onChange={handleCheck}
      />
      <img
        src={item.imageUrl}
        alt={item.title}
        onClick={() => navigate(`/detail/${item.bookId}`)}
      />

      <div className={styles.itemInfo}>
        <div className={styles.info}>
          <h4 onClick={() => navigate(`/detail/${item.bookId}`)}>
            {"["}
            {item.categoryName}
            {"]"} {item.title}
          </h4>

          <p>
            <span
              onClick={() =>
                navigate(`?keyword=${encodeURIComponent(item.authors)}`)
              }
            >
              {item.authors}{" "}
            </span>
            {viewType === "list" ? " 저자(글)" : ""}
          </p>

          <p>
            {item.publisherName}
            {viewType === "list" ? (
              <>
                {" "}
                {"・"} {formatDate(item.publishedDate)}
              </>
            ) : (
              ""
            )}
          </p>
        </div>

        <div className={styles.priceRow}>
          <p className={styles.itemInfoPrice}>
            <span>{item.price.toLocaleString()}</span>원
          </p>
          <p className={styles.itemInfoPoint}>
            {viewType === "list"
              ? `${item.point ? item.point.toLocaleString() : 0}p`
              : `(${item.point ? item.point.toLocaleString() : 0}p)`}
          </p>
          {viewType === "grid" && (
            <button
              className={`${styles.gridHeart} ${isLiked ? styles.liked : ""}`}
              onClick={handleLike}
            >
              <img src={isLiked ? redHeartIcon : heartIcon} />
            </button>
          )}
        </div>
      </div>

      <div className={styles.itemInfoButton}>
        {viewType === "list" ? (
          <div className={styles.buttonGroup}>
            <button
              className={`${styles.heartBtn} ${isLiked ? styles.liked : ""}`}
              onClick={handleLike}
            >
              <img src={isLiked ? redHeartIcon : heartIcon} />
            </button>

            <button
              type="button"
              onClick={() => addSingleToCart(item)}
              className={styles.cartBtn}
            >
              장바구니
            </button>
            <button
              type="button"
              onClick={() => navigate("/payment")}
              className={styles.buyBtn}
            >
              바로구매
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
