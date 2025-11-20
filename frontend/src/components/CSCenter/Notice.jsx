import styles from "./Notice.module.css";
import paginationStyles from "../../pages/Pagination/Pagination.module.css";
import { useEffect, useState } from "react";
import { axiosData } from "../../utils/dataFetch.js";
import Pagination from "../../pages/Pagination/Pagination.jsx";
import { usePagination } from "../../hooks/usePagination.js";

export function Notice() {
  //전체 데이터(json)
  const [data, setData] = useState([]);

  //json데이터 불러오기
  useEffect(() => {
    const fetch = async () => {
      const jsonData = await axiosData("/data/csCenterNotice.json");
      setData(jsonData);
    };
    fetch();
  }, []);

  //페이지네이션
  const { currentPage, pageCount, currentItems, handlePageChange, offset } =
    usePagination(data, 10);

  return (
    <div className={styles.noticeContainer}>
      <div className={styles.header}>
        <h1>공지사항</h1>
      </div>
      <p className={styles.total}>
        <span>{data.length}</span>건
      </p>

      <nav className={styles.noticeList}>
        <div className={styles.listHeader}>
          <div className={styles.no}>no</div>
          <div className={styles.title}>공지제목</div>
          <div className={styles.category}>유형</div>
          <div className={styles.date}>날짜</div>
        </div>

        <ul className={styles.listBody}>
          {currentItems.map((item, idx) => (
            <li key={idx} className={styles.noticeItem}>
              <div className={styles.colNo}>{offset + idx + 1}</div>
              <div className={styles.colTitle}>{item.title}</div>
              <div className={styles.colCategory}>{item.category}</div>
              <div className={styles.colDate}>{item.date}</div>
            </li>
          ))}
        </ul>
      </nav>

      <div className={`${paginationStyles.pagination} ${styles.pagination}`}>
        <Pagination
          pageCount={pageCount}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
