import styles from "./Notice.module.css";
import { useEffect, useState } from "react";
import { axiosData } from "../../utils/dataFetch.js";

export function Notice() {
  //전체 데이터(json)
  const [data, setData] = useState([]);
  //현재 페이지
  const [currentPage, setCurrentPage] = useState(1);
  //한 페이지에 보여지는 컨텐츠 수
  const itemsPerPage = 10;

  //json데이터 불러오기
  useEffect(() => {
    const fetch = async () => {
      const jsonData = await axiosData("/data/cscenterNotice.json");
      setData(jsonData);
    };
    fetch();
  }, []);

  //페이지네이션 계산
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

  //페이지 이동 함수
  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) setCurrentPage(pageNum);
  };

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
          {currentItems.map((item, index) => (
            <li key={startIndex + index} className={styles.noticeItem}>
              <div className={styles.no}>{startIndex + index + 1}</div>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.category}>{item.category}</div>
              <div className={styles.date}>{item.date}</div>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.pagination}>
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={currentPage === i + 1 ? styles.active : ""}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
