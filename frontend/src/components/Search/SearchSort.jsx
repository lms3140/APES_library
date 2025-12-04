import styles from "../../pages/Search/Search.module.css";
import { useState } from "react";
import { Dropdown } from "../Dropdown/Dropdown.jsx";

import heartIcon from "/images/search/ico_heart.png";
import cartIcon from "/images/search/ico_cart.png";
import listGray from "/images/search/ico_list_gray.png";
import listBlack from "/images/search/ico_list_black.png";
import gridGray from "/images/search/ico_grid_gray.png";
import gridBlack from "/images/search/ico_grid_black.png";
import { useSelector } from "react-redux";
import { selectFilteredSortedBooks } from "../../store/searchSlice.js";

export function SearchSort({
  onLimitChange,
  viewType,
  onViewTypeChange,
  onSortChange,
  addMultiToCart,
  addMultiWish,
}) {
  const sortOptions = ["인기순", "최신순", "낮은가격순", "높은가격순"];
  const selectedOptions = ["20개씩 보기", "50개씩 보기", "100개씩 보기"];
  const sortedBooks = useSelector(selectFilteredSortedBooks);
  const [sort, setSort] = useState("인기순");
  const [selected, setSelected] = useState(selectedOptions[0]); //기본으로 보이는 갯수

  const handleDropdownChange = (value) => {
    setSelected(value);
    const number = parseInt(value.replace("개씩 보기", "").trim());
    onLimitChange(number);
  };

  const handleSortChange = (value) => {
    setSort(value);
    onSortChange(value);
  };

  return (
    <div className={styles.sortBar}>
      <div className={styles.sortLeft}>
        <h3>
          전체 <span>{sortedBooks.length}</span>건
        </h3>
      </div>
      <div className={styles.sortRightWrapper}>
        <div className={styles.sortButtons}>
          <button className={styles.heart} onClick={() => addMultiWish()}>
            <img src={heartIcon} alt="하트 이모지" />
          </button>

          <button className={styles.cart} onClick={() => addMultiToCart()}>
            <img src={cartIcon} alt="장바구니 이모지" />
            <span>장바구니 담기</span>
          </button>
        </div>

        <div className={styles.sortDropdowns}>
          <Dropdown
            options={sortOptions}
            selected={sort}
            onChange={handleSortChange}
          />

          <Dropdown
            options={selectedOptions}
            selected={selected}
            onChange={handleDropdownChange}
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
