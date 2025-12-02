import React, { useRef, useState } from "react";
import styles from "../../pages/Search/Search.module.css";
import { TfiReload } from "react-icons/tfi";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { Checkbox } from "../Checkbox/Checkbox.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../store/searchSlice.js";

export function SearchFilter() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.search.filters);

  const formRef = useRef(null);
  const [isSearchOpen, setIsSearchOpen] = useState(true);
  const [isStudyOpen, setIsStudyOpen] = useState(true);
  const [isBenefitOpen, setIsBenefitOpen] = useState(true);

  //필터 기능 있는 부분 함수
  const renderFilterCheckbox = (label, key) => (
    <Checkbox
      checked={filters[key]}
      onChange={() => dispatch(setFilters({ key }))}
      labelStyle={styles.filterCheckbox}
      label={label}
    />
  );

  //필터 기능 없는 부분 함수
  const renderCheckboxList = (items) => {
    return items.map((label, idx) => (
      <Checkbox key={idx} labelStyle={styles.filterCheckbox} label={label} />
    ));
  };

  return (
    <aside className={styles.filterArea}>
      <div className={styles.filterBox}>
        <div className={styles.filterHeader}>
          <p className={styles.filterTitle}>필터</p>
          <button type="button" onClick={() => window.location.reload()}>
            <TfiReload /> 초기화
          </button>
        </div>
      </div>

      <form ref={formRef}>
        <div className={styles.filterBox}>
          <div className={styles.filterOptionGroup}>
            <button
              type="button"
              className={styles.filterOptionBtn}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <span className={styles.filterSmallTitle}>검색조건</span>
              {isSearchOpen ? <FaMinus /> : <FaPlus />}
            </button>
          </div>
          <div
            className={`${styles.toggleContent} ${
              !isSearchOpen ? styles.closed : ""
            }`}
          >
            {renderFilterCheckbox("상품명", "title")}
            {renderFilterCheckbox("저자/역자", "authors")}
            {renderFilterCheckbox("출판사", "publisherName")}
          </div>
        </div>
        <div className={styles.filterBox}>
          <div className={styles.filterOptionGroup}>
            <button
              type="button"
              className={styles.filterOptionBtn}
              onClick={() => setIsStudyOpen(!isStudyOpen)}
            >
              <span className={styles.filterSmallTitle}>학습서필터</span>
              {isStudyOpen ? <FaMinus /> : <FaPlus />}
            </button>
          </div>
          <div
            className={`${styles.toggleContent} ${
              !isStudyOpen ? styles.closed : ""
            }`}
          >
            <p className={styles.subTitle}>학년</p>
            {renderCheckboxList([
              "초등학교 1학년",
              "초등학교 2학년",
              "초등학교 3학년",
              "초등학교 4학년",
              "초등학교 5학년",
              "초등학교 6학년",
              "예비중학생",
              "중학교 공통",
              "고등학교 공통",
              "고등학교 1학년",
              "고등학교 2학년",
            ])}
            <p className={styles.subTitle}>학기</p>
            {renderCheckboxList(["공통", "1학기"])}
          </div>
        </div>

        <div className={styles.filterBox}>
          <div className={styles.filterOptionGroup}>
            <button
              type="button"
              className={styles.filterOptionBtn}
              onClick={() => setIsBenefitOpen(!isBenefitOpen)}
            >
              <span className={styles.filterSmallTitle}>혜택/조건</span>
              {isBenefitOpen ? <FaMinus /> : <FaPlus />}
            </button>
          </div>
          <div
            className={`${styles.toggleContent} ${
              !isBenefitOpen ? styles.closed : ""
            }`}
          >
            {renderCheckboxList([
              "쿠폰",
              "이벤트",
              "무료배송",
              "핫트랙스배송",
              "19세상품만보기",
              "19세상품제외",
              "POD",
              "분철상품",
              "판매마감제외",
              "품절판제외",
              "패키지",
              "개정판",
            ])}
          </div>
        </div>
      </form>
    </aside>
  );
}
