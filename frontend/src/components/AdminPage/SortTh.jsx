import React from 'react'
import { SortingButtons } from './SortingButtons';
import styles from "../../pages/AdminPage/AdminPage.module.css";

export function SortTh({ label, sortBY, books, setBooks }) {
  return (
    <th className={styles.th}>
        {label}
        <SortingButtons 
        sortBY={sortBY}
        books={books}
        setBooks={setBooks}
        />
    </th>
  )
}
