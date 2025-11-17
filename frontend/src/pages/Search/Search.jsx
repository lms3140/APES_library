import styles from "./Search.module.css";
import paginationStyles from "../Pagination/Pagination.module.css";
import { useEffect, useState } from "react";
import { SearchFilter } from "../../components/Search/SearchFilter.jsx";
import { SearchSort } from "../../components/Search/SearchSort.jsx";
import { SearchItems } from "../../components/Search/SearchItems.jsx";
import Pagination from "../Pagination/Pagination.jsx";
import { useSearchParams } from "react-router-dom";
import { usePagination } from "../../hooks/usePagination.js";

export function Search() {
  const [params] = useSearchParams();
  const keyword = params.get("keyword");
  const [books, setBooks] = useState([]); //검색 결과 목록

  const { currentPage, pageCount, currentItems, handlePageChange } =
    usePagination(books, 20);

  // keyword 바뀔 때마다 검색 실행
  useEffect(() => {
    if (!keyword) return;
    fetchBooks(keyword);
  }, [keyword]);

  const fetchBooks = async (kw) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/search?keyword=${kw}`
      );
      const json = await response.json();
      setBooks(json);
    } catch (err) {
      console.log("검색 오류", err);
    }
  };

  return (
    <div className={styles.searchWrapper}>
      <h1 className={styles.resultTitle}>
        <span>'{keyword}'</span>에 대한 {books.length}개의 검색 결과
      </h1>

      <div className={styles.searchContainer}>
        {/* 왼쪽 필터 */}
        <SearchFilter />

        {/* 오른쪽 */}
        <div className={styles.rightArea}>
          <SearchSort books={books} />

          {/* 검색 결과 */}
          {currentItems &&
            currentItems.map((item) => (
              <SearchItems key={item.id} item={item} />
            ))}
        </div>
        <div className={`${paginationStyles.pagination} ${styles.pagination}`}>
          <Pagination
            pageCount={pageCount}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}
