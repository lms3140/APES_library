import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "./AdminPage.Module.css";
import axios from "axios";
import { BookSearch } from "../../components/AdminPage/BookSearch";
import { SortingButtons } from "../../components/AdminPage/SortingButtons";
// import Pagination from "rc-pagination";
// import 'bootstrap/dist/css/bootstrap.css';
// import 'rc-pagination/assets/index.css';

export function AdminPage() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const API_BASE = "http://localhost:8080/adminPage";
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentBooks = books.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(books.length / itemsPerPage);

  const blockSize = 10;
  const currentBlock = Math.ceil(currentPage / blockSize);
  const blockStart = (currentBlock - 1) * blockSize + 1;
  const blockEnd = Math.min(blockStart + blockSize - 1, totalPages);

  const paginatedBooks = books.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getBooks = async () => {
    const res = await axios.get(API_BASE);
    return res.data;
  };

  const getBookDetail = async (id) => {
    const res = await axios.get(`${API_BASE}/${bookId}`);
    return res.data;
  };

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getBooks();
    setBooks(data);
    setCurrentPage(1);
  };

  const handleSearch = async (searchType, keyword) => {
    const res = await axios.get(`${API_BASE}/search`, {
      params: { searchType, keyword },
    });
    setBooks(res.data);
    setCurrentPage(1);
  };

  const menuList = [
    { label: "ID", key: "bookId", sortable: true },
    { label: "책 제목", key: "title", sortable: true },
    { label: "이미지", key: "image_url", sortable: false },
    { label: "총 판매부수", key: "totalSalesQuantity", sortable: true },
    { label: "총 판매금액", key: "totalPrice", sortable: true },
  ];

  return (
    <div className={styles.container}>
      <h1>AdminPage</h1>
      <h2>책 목록</h2>

      <div className={styles.searchWrap}>
        <div
          className={styles.allBookSearch}
          style={{ cursor: "pointer" }}
          onClick={load}
        >
          전체 목록 보기
        </div>
        <BookSearch onSearch={handleSearch} />
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            {menuList.map((menu) => (
              <th key={menu.label} className={styles.th}>
                {menu.label}
                {menu.sortable && (
                  <SortingButtons
                    sortBY={menu.key}
                    books={books}
                    setBooks={setBooks}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {currentBooks.map((b) => (
            <tr
              key={`key=${b.bookId}-${b.title}`}
              className={styles.row}
              onClick={() => navigate(`/books/${b.id}`)}
            >
              <td className={styles.td}>{b.bookId}</td>
              <td className={styles.td}>{b.title}</td>
              <td className={styles.td}>
                <img src={b.image_url} alt="" className={styles.img} />
              </td>
              <td className={styles.td}>{b.totalSalesQuantity}권</td>
              <td className={styles.td}>
                {(b.totalPrice || 0).toLocaleString()}원
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5} className={styles.paginationWrapper}>
              {currentBlock > 1 && (
                <button
                  className={styles.arrowBtn}
                  onClick={() => setCurrentPage(blockStart - 1)}
                >
                  ◀
                </button>
              )}
              {Array.from(
                { length: blockEnd - blockStart + 1 },
                (_, i) => blockStart + i
              ).map((page) => (
                <button
                  key={`page-${page}`}
                  className={`${styles.pageBtn} ${
                    currentPage === page ? styles.activePage : ""
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              {blockEnd < totalPages && (
                <button
                  className={styles.arrowBtn}
                  onClick={() => setCurrentPage(blockEnd + 1)}
                >
                  ▶
                </button>
              )}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
