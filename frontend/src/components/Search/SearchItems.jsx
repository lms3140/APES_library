import styles from "../../pages/Search/Search.module.css";
import { useNavigate } from "react-router-dom";

export function SearchItems({
  item,
  viewType,
  selectedItems,
  setSelectedItems,
}) {
  const navigate = useNavigate();

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
      <label className={styles.checkboxWrap}>
        <input
          type="checkbox"
          checked={selectedItems.includes(item.bookId)}
          onChange={toggleCheck}
          className={styles.checkboxInput}
        />
        <span className={styles.checkboxCustom}></span>
      </label>
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
              {item.authors}
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
        </div>
      </div>
      <div className={styles.itemInfoButton}>
        {viewType === "list" ? (
          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={() => navigate("/cart")}
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
