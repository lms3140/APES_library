import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({ pageCount, onPageChange, currentPage }) => {
  const prevPage = currentPage === 0 ? "" : <IoIosArrowBack />;
  const nextPage = currentPage === pageCount - 1 ? "" : <IoIosArrowForward />;

  return (
    <ReactPaginate
      previousLabel={prevPage}
      nextLabel={nextPage}
      breakLabel={"..."}
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
