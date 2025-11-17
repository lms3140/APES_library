import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "./AdminPage.Module.css";
import axios from "axios";

export function AdminPage() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const API_BASE = "http://localhost:8080/adminPage";

    const getBooks = async () => {
        const res = await axios.get(API_BASE);
        return res.data;
    };

    const getBookDetail = async (id) => {
        const res = await axios.get(`${API_BASE}/${id}`);
        return res.data;
    };

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getBooks();
    setBooks(data);
  };

  const sortBy = (key, direction) => {
  const sortedBooks = [...books].sort((a, b) => {
    if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
    if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
    return 0;
  });
  setBooks(sortedBooks);
  setSortConfig({ key, direction });
};

  return (
    <div className={styles.container}>
      <h1>AdminPage</h1>
      <h2>책 목록</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>ID
              <button
                className={styles.sortButton}
                onClick={() => sortBy("bookId", "asc")}
              >
                ▲
              </button>
              <button
                className={styles.sortButton}
                onClick={() => sortBy("bookId", "desc")}
              >
                ▼
              </button>
              </th>
            <th className={styles.th}>책 제목 
              <button
                className={styles.sortButton}
                onClick={() => sortBy("title", "asc")}
              >
                ▲
              </button>
              <button
                className={styles.sortButton}
                onClick={() => sortBy("title", "desc")}
              >
                ▼
              </button>
              </th>
            <th className={styles.th}>이미지</th>
            <th className={styles.th}>총 판매부수
              <button
                className={styles.sortButton}
                onClick={() => sortBy("totalSalesQuantity", "asc")}
              >
                ▲
              </button>
              <button
                className={styles.sortButton}
                onClick={() => sortBy("totalSalesQuantity", "desc")}
              >
                ▼
              </button>
            </th>
            <th className={styles.th}>총 판매금액
              <button
                className={styles.sortButton}
                onClick={() => sortBy("totalPrice", "asc")}
              >
                ▲
              </button>
              <button
                className={styles.sortButton}
                onClick={() => sortBy("totalPrice", "desc")}
              >
                ▼
              </button>
            </th>
          </tr>
        </thead>

        <tbody>
          {books.map((b) => (
            <tr
              key={b.id}
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
      </table>
    </div>
  );
}
