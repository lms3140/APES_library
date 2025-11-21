import React from 'react'
import { SortingButtons } from './SortingButtons';
import style from "../../pages/AdminPage/AdminPage.module.css";

export function SortTh({ label, sortBY, books, setBooks }) {
  return (
    <th className={style.th}>
        {label}
        <SortingButtons 
        sortBY={sortBY}
        books={books}
        setBooks={setBooks}
        />
    </th>
  )
}
