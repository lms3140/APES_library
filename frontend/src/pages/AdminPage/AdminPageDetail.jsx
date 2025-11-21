import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { NotFound } from "../NotFound/NotFound";
import style from '../AdminPage/AdminPageDetail.module.css';

export function AdminBookDetail() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);

  const API_BASE = "http://localhost:8080/adminPage";

  const loadBook = async () => {
    const res = await axios.get(`${API_BASE}/detail/${bookId}`);
    setBook(res.data);
  };

  useEffect(() => {
    loadBook();
  }, []);

  if (!book) return <NotFound />
  
  console.log(book)
  const bookInfo = book.bookdata[0]; // 첫 번째 책 정보 사용

  return (
    <div className={style.AdminBookDetailWrapper}>
      <h1>책 상세 정보</h1>
      <img src={bookInfo.image_url} alt={bookInfo.title} />
      <p>책 제목: {bookInfo.title}</p>
      <p>총 판매 부수: {bookInfo.totalSalesQuantity}권</p>
      <p>총 판매 금액: {(bookInfo.totalPrice || 0).toLocaleString()}원</p>

      {/* bookdataDetail 배열 사용 예시 */}
      <div>
        <h2>상세 판매 정보</h2>
        <table border="1" cellPadding="5" cellSpacing="0">
            <thead>
            <tr>
                <th>사용자 ID</th>
                <th>구매 수량</th>
                <th>단가</th>
                <th>구매일</th>
            </tr>
            </thead>
            <tbody>
            {book.bookdataDetail && book.bookdataDetail.length > 0 ? (
                book.bookdataDetail.map((detail, index) => (
                <tr key={index}>
                    <td>{detail.userId}</td>
                    <td>{detail.quantity}</td>
                    <td>{detail.unitPrice?.toLocaleString()}원</td>
                    <td>{new Date(detail.createdAt).toLocaleString()}</td>
                </tr>
                ))
            ) : (
                <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                    판매 데이터가 없습니다.
                </td>
                </tr>
            )}
            </tbody>
        </table>
        </div>
    </div>
  );
}