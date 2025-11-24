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
  const [limit, setLimit] = useState(20);
  const [viewType, setViewType] = useState("list");
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortOptions, setSortOptions] = useState("인기순");
  const [filters, setFilters] = useState({
    title: false,
    authors: false,
    publisherName: false,
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filterBooks = books.filter((book) => {
    const isAllFalse =
      !filters.title && !filters.authors && !filters.publisherName;
    if (isAllFalse) return true;

    const kw = keyword?.toLowerCase();
    if (!kw) return true;

    const title = book.title?.toLowerCase() || "";
    const publisherName = book.publisherName?.toLowerCase() || "";
    const authors = Array.isArray(book.authors) ? book.authors : [];

    const matchTitle = title.includes(kw);
    const matchAuthor =
      filters.authors &&
      authors.some((a) => (a?.toLowerCase() || "").includes(kw));
    const matchPublisher = publisherName.includes(kw);

    return (
      (filters.title && matchTitle) ||
      (filters.authors && matchAuthor) ||
      (filters.publisherName && matchPublisher)
    );
  });

  const sortBooks = (books, sort) => {
    const sorted = [...books];
    if (sort === "인기순") {
      return sorted;
    }
    if (sort === "최신순") {
      return sorted.sort(
        (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)
      );
    }
    if (sort === "낮은가격순") {
      return sorted.sort((a, b) => a.price - b.price);
    }
    if (sort === "높은가격순") {
      return sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  };

  const sortedBooks = sortBooks(filterBooks, sortOptions);

  // keyword 바뀔 때마다 검색 실행
  useEffect(() => {
    if (!keyword) return;
    fetchBooks(keyword);
  }, [keyword]);

  //백엔드 연결, 데이터 가져오기
  const fetchBooks = async (kw) => {
    const response = await fetch(
      `http://localhost:8080/api/search?keyword=${kw}`
    );
    const json = await response.json();
    setBooks(json);
  };

  //한번에 보이는 갯수 설정 함수(20개씩보기, 50개씩보기, ...)
  const handleLimitChange = (value) => {
    setLimit(value);
  };

  //페이지네이션
  const { currentPage, pageCount, currentItems, handlePageChange } =
    usePagination(sortedBooks, limit);

  return (
    <div className={styles.searchWrapper}>
      <h1 className={styles.resultTitle}>
        <span>'{keyword}'</span>에 대한 {books.length}개의 검색 결과
      </h1>

      <div className={styles.searchContainer}>
        <SearchFilter filters={filters} onFilterChange={handleFilterChange} />

        <div className={styles.rightArea}>
          <SearchSort
            books={books}
            onLimitChange={handleLimitChange}
            viewType={viewType}
            onViewTypeChange={setViewType}
            selectedItems={selectedItems}
            onSortChange={setSortOptions}
            filterBooks={filterBooks}
          />
          <div
            className={viewType === "list" ? styles.listView : styles.gridView}
          >
            {currentItems &&
              currentItems.map((item) => (
                <SearchItems
                  key={item.bookId}
                  item={item}
                  viewType={viewType}
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                />
              ))}
          </div>
          <div
            className={`${paginationStyles.pagination} ${styles.pagination}`}
          >
            {books.length > limit ? (
              <Pagination
                pageCount={pageCount}
                onPageChange={handlePageChange}
                currentPage={currentPage}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
