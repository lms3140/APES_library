import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

/**
 * usePagination 훅 만들어 놓았으니 사용해주세요. (프롭스별 사용법 주석 참고)
 * 사용방법 헷갈리시면 Notice.jsx 혹은 Search.jsx 참고해주세요!
 * 설정해놓은 기본 스타일은 수정하지 말아주세요!
 */

const Pagination = ({ pageCount, onPageChange, currentPage }) => {
  const prevPage = currentPage === 0 ? "" : <IoIosArrowBack />;
  const nextPage = currentPage === pageCount - 1 ? "" : <IoIosArrowForward />;

  return (
    <ReactPaginate
      previousLabel={prevPage}
      nextLabel={nextPage}
      breakLabel={"⋯"}
      pageCount={pageCount}
      forcePage={currentPage}
      onPageChange={onPageChange}
      containerClassName={styles.pagination}
      pageLinkClassName={styles.pageLink}
      activeLinkClassName={styles.activePage}
      previousLinkClassName={styles.navBtn}
      nextLinkClassName={styles.navBtn}
      disabledClassName={styles.disabled}
    />
  );
};

export default Pagination;
