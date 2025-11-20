import { useEffect, useState } from "react";
import style from "../../pages/AdminPage/AdminPage.module.css";

export function SortingButtons({sortBY, books, setBooks}) {

    const sortBy = (key, direction) => {
      const sortedBooks = [...books].sort((a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      });
      setBooks(sortedBooks);
    };

    return (
        <>
        <button
            className={style.sortButton}
            onClick={() => sortBy(sortBY, "asc")}
        >
        ▲
        </button>
        <button
            className={style.sortButton}
            onClick={() => sortBy(sortBY, "desc")}
        >
        ▼
        </button>
        </>
    )
}