import styles from "../../pages/Search/Search.module.css";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "../Checkbox/Checkbox";
import Swal from "sweetalert2";

import heartIcon from "/images/etc/ico_heart.png";
import redHeartIcon from "/images/etc/ico_heart_red.png";

export function SearchItems({
  item,
  viewType,
  selectedItems,
  setSelectedItems,
  onAddToCart,
  likedItems,
  setLikedItems,
  isLoggedIn,
}) {
  const navigate = useNavigate();
  const isLiked = likedItems.includes(item.bookId);

  const toggleLike = () => {
    if (!isLoggedIn) {
      const result = Swal.fire({
        title: "찜하기는 로그인 후 이용할 수 있어요.",
        confirmButtonText: "로그인 하기",
        cancelButtonText: "취소",
        showCancelButton: true,
        customClass: {
          popup: "customPopup",
          title: "customTitle",
          confirmButton: "customConfirmButton",
          cancelButton: "customCancelButton",
        },
      });

      if (result.isConfirmed) navigate("/login");
      return;
    }

    if (isLiked) {
      setLikedItems((prev) => prev.filter((id) => id !== item.bookId));
      Swal.fire({
        title: "찜 해제했어요.",
        timer: 2000,
        showConfirmButton: false,
        customClass: {
          popup: "likePopup",
          title: "likeTitle",
        },
      });
    } else {
      setLikedItems((prev) => [...prev, item.bookId]);
      const result = Swal.fire({
        title: "찜 설정했어요.",
        timer: 2000,
        confirmButtonText: "바로가기",
        customClass: {
          popup: "likePopup",
          title: "likeTitle",
          confirmButton: "likeConfirmButton",
        },
      });
      if (result.isConfirmed) navigate("/mypage");
    }
  };

  const toggleCheck = () => {
    if (selectedItems.includes(item.bookId)) {
      setSelectedItems((prev) => prev.filter((id) => id !== item.bookId));
    } else {
      setSelectedItems((prev) => [...prev, item.bookId]);
    }
  };

  function formatDate(dateString) {
    if (!dateString) return "";

    const [year, month, day] = dateString.split("-");

    return `${year}년 ${month.padStart(2, "0")}월 ${day.padStart(2, "0")}일`;
  }

  return (
    <div className={viewType === "list" ? styles.itemBox : styles.gridItem}>
      <Checkbox
        checked={selectedItems.includes(item.bookId)}
        onChange={toggleCheck}
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
              onClick={toggleLike}
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
              onClick={toggleLike}
            >
              <img src={isLiked ? redHeartIcon : heartIcon} />
            </button>

            <button
              type="button"
              onClick={() => onAddToCart(item)}
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
