import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import style from "./AdminPage.Module.css";
import axios from "axios";
import { BookSearch } from "../../components/AdminPage/BookSearch";
import { SortingButtons } from "../../components/AdminPage/SortingButtons"
import { Pagination } from "../../components/AdminPage/Pagination";
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
  
  // const blockSize = 10;
  // const currentBlock = Math.ceil(currentPage / blockSize);
  // const blockStart = (currentBlock - 1) * blockSize + 1;
  // const blockEnd = Math.min(blockStart + blockSize - 1, totalPages);

  // const paginatedBooks = books.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

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
    <div className={style.container}>
      <h1>AdminPage</h1>
      <h2>책 목록</h2>

      <div className={style.searchWrap}>
        <div className={style.allBookSearch} style={{cursor: "pointer"}} onClick={load}>전체 목록 보기</div>
        <BookSearch onSearch={handleSearch} />
      </div>

      <table className={style.table}>
        <thead>
          <tr>
            {menuList.map(menu => (
              <th key={menu.label} className={style.th}>
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
            <tr key={`key=${b.bookId}-${b.title}`}
              className={style.row}
              onClick={() => navigate(`/adminpage/detail/${b.bookId}`)}
            >
              <td className={style.td}>{b.bookId}</td>
              <td className={style.td}>{b.title}</td>
              <td className={style.td}>
                <img src={b.image_url} alt="" className={style.img} />
              </td>
              <td className={style.td}>{b.totalSalesQuantity}권</td>
              <td className={style.td}>
                {(b.totalPrice || 0).toLocaleString()}원
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          
          <tr>
            <td colSpan={5} className={style.paginationWrapper}>
              <Pagination 
                totalPages = {totalPages}
                currentPage = {currentPage}
                setCurrentPage = {setCurrentPage}
                blockSize = {10}
              />
            </td>
          </tr>

        </tfoot>
      </table>
    </div>
  );
}