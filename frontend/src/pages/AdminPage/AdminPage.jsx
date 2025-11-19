import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "./AdminPage.Module.css";
import axios from "axios";
import { BookSearch } from "../../components/AdminPage/BookSearch";
import { SortingButtons } from "../../components/AdminPage/SortingButtons";

export function AdminPage() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const API_BASE = "http://localhost:8080/adminPage";

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
  };

  const handleSearch = async (type, keyword) => {
    const res = await axios.get(`${API_BASE}/search`, {
      params: { type, keyword }
    });
    setBooks(res.data);
  }

  const menuList = [
  { label: "ID", key: "bookId", sortable: true },
  { label: "책 제목", key: "title", sortable: true },
  { label: "이미지", key: "image_url", sortable: false },
  { label: "총 판매부수", key: "totalSalesQuantity", sortable: true },
  { label: "총 판매금액", key: "totalPrice", sortable: true }
];

  

  return (
    <div className={styles.container}>
      <h1>AdminPage</h1>
      <h2>책 목록</h2>

      <BookSearch />

      <table className={styles.table}>
        <thead>
          <tr>
            {menuList.map(menu => (
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
