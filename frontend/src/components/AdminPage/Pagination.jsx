import style from "../../pages/AdminPage/AdminPage.module.css";

export function Pagination({ totalPages, currentPage, setCurrentPage, blockSize = 10 }) {
    const currentBlock = Math.ceil(currentPage / blockSize);
    const blockStart = (currentBlock - 1) * blockSize + 1;
    const blockEnd = Math.min(blockStart + blockSize - 1, totalPages);

    return (
        <div className={style.paginationWrapper}>
            {currentBlock > 1 && (
            <button
                className={style.arrowBtn}
                onClick={() => setCurrentPage(blockStart - 1)}
            >
                ◀
            </button>
            )}
            {Array.from({ length: blockEnd - blockStart +1 },
            (_, i) => blockStart + i).map((page) => (
            <button
                key={`page-${page}`}
                className={`${style.pageBtn} ${currentPage === page ? style.activePage : ""}`}
                onClick={() => setCurrentPage(page)}
            >
                {page}
            </button>
            ))}
            {blockEnd < totalPages && (
            <button
                className={style.arrowBtn}
                onClick={() => setCurrentPage(blockEnd + 1)}
            >
                ▶
            </button>
            )}
        </div>
    )
}