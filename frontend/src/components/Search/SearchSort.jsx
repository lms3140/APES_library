import styles from "../../pages/Search/Search.module.css";
import { useState } from "react";
import { Dropdown } from "../../pages/Dropdown/Dropdown.jsx";

import heartIcon from "/images/etc/ico_heart.png";
import cartIcon from "/images/etc/ico_cart.png";
import listGray from "/images/etc/ico_list_gray.png";
import listBlack from "/images/etc/ico_list_black.png";
import gridGray from "/images/etc/ico_grid_gray.png";
import gridBlack from "/images/etc/ico_grid_black.png";
import { useNavigate } from "react-router-dom";

export function SearchSort({
  books,
  onLimitChange,
  viewType,
  onViewTypeChange,
  selectedItems,
}) {
  const navigate = useNavigate();
  const sortOptions = ["인기순", "최신순", "낮은가격순", "높은가격순"];
  const selectedOptions = ["20개씩 보기", "50개씩 보기", "100개씩 보기"];
  const [sort, setSort] = useState("인기순"); //현재 선택된 정렬
  const [selected, setSelected] = useState(selectedOptions[0]); //기본으로 보이는 갯수
  const [limit, setLimit] = useState();

  const handleChange = (value) => {
    setSelected(value);
    const number = parseInt(value.replace("개씩 보기", "").trim());
    setLimit(number);
    onLimitChange(number);
  };

  const handleAddToCart = () => {
    if (selectedItems.length === 0) {
      alert("선택한 상품이 없습니다.");
      return;
    }

    const selectedProducts = books.filter((book) =>
      selectedItems.inclueds(book.id)
    );

    const existing = JSON.parse(localStorage.getItem("cart") || "[]");
    const updated = [...existing, ...selectedProducts];
    localStorage.setItem("cart", JSON.stringify(updated));

    alert("선택한 상품을 장바구니에 담았어요.");
    navigate("/cart");
  };

  return (
    <div className={styles.sortBar}>
      <div className={styles.sortLeft}>
        <h3>
          전체 <span>{books.length}</span>건
        </h3>
      </div>
      <div className={styles.sortRightWrapper}>
        <div className={styles.sortButtons}>
          <button className={styles.heart}>
            <img src={heartIcon} alt="하트 이모지" />
          </button>

          <button className={styles.cart} onClick={handleAddToCart}>
            <img src={cartIcon} alt="장바구니 이모지" />
            <span>장바구니 담기</span>
          </button>
        </div>

        <div className={styles.sortDropdowns}>
          <Dropdown
            options={sortOptions}
            selected={sort}
            onChange={(value) => setSort(value)}
          />

          <Dropdown
            options={selectedOptions}
            selected={selected}
            onChange={handleChange}
          />
        </div>

        <div className={styles.sortIcons}>
          <button
            onClick={() => onViewTypeChange("list")}
            className={`${styles.list} ${
              viewType === "list" ? styles.active : ""
            }`}
          >
            <img
              src={viewType === "list" ? listBlack : listGray}
              alt="리스트 이모지"
            />
          </button>
          <button
            onClick={() => onViewTypeChange("grid")}
            className={`${styles.grid} ${
              viewType === "grid" ? styles.active : ""
            }`}
          >
            <img
              src={viewType === "grid" ? gridBlack : gridGray}
              alt="그리드 이모지"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
