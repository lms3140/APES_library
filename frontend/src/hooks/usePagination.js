import { useState } from "react";

export function usePagination(data = [], itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(0);

  const pageCount = Math.ceil(data.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = data.slice(offset, offset + itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return {
    currentPage, //현재페이지
    pageCount, //총 페이지 갯수
    currentItems, //한 화면에 보여줄 데이터 갯수
    handlePageChange,
    offset, //데이터 slice시 시작 위치(필수x)
  };
}
