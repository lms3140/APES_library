import styles from "./Search.module.css";
import { useEffect, useState } from "react";
import { SearchFilter } from "../../components/Search/SearchFilter.jsx";
import { SearchTabs } from "../../components/Search/SearchTabs.jsx";
import { SearchSort } from "../../components/Search/SearchSort.jsx";
import { SearchItems } from "../../components/Search/SearchItems.jsx";
import Pagination from "../Pagination/Pagination.jsx";

export function Search() {
  const [keyword, setKeyword] = useState("");
  const [books, setBooks] = useState([]); //검색 결과 목록

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const kw = params.get("keyword");
    setKeyword(kw);
    fetchBooks(kw);
  }, []);

  const fetchBooks = async (kw) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/search?keyword=${kw}`
      );
      const json = await response.json();
      console.log("json :: ", json);
      setBooks(json);
    } catch (err) {
      console.log("검색 오류", err);
    }
  };

  return (
    <div className={styles.searchContainer}>
      {/* 왼쪽 필터 */}
      <SearchFilter />

      {/* 오른쪽 */}
      <div className={styles.rightArea}>
        <h1 className={styles.resultTitle}>
          {keyword}에 대한 {books.length}개의 검색 결과
        </h1>

        <SearchTabs />
        <SearchSort books={books} />

        {/* 검색 결과 */}
        {books.map((item) => (
          <SearchItems key={item.id} item={item} />
        ))}
      </div>
      <div>
        <Pagination />
      </div>
    </div>
  );
}
