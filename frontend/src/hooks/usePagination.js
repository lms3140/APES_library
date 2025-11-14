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
    currentPage,
    pageCount,
    currentItems,
    handlePageChange,
    offset,
  };
}
