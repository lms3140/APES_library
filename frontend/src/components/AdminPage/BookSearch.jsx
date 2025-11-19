import { useState } from "react";
import styles from "../../pages/AdminPage/AdminPage.module.css";
import { FaSearch } from "react-icons/fa";

export function BookSearch({ onSearch }) {
    const [keyword, setKeyword] = useState("");
    const [searchType, setSearchType] = useState("bookId");
    
    const handleSearch = () => {
      if (!keyword.trim()) return;
      onSearch(searchType, keyword);
      console.log(searchType, keyword);
    };
    
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    };

    return (
        <div className={styles.bookSearchContainer}>
            <select 
                className={styles.bookSearchSelect}
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
            >
                <option value="bookId">책 ID</option>
                <option value="title">책 제목</option>
            </select>
            <input 
                className={styles.bookSearch}
                placeholder="검색"
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyPress}
            />
            <button
                className={styles.searchBtn}
                onClick={handleSearch}
            >
                <FaSearch />
            </button>
        </div>
    )
}
  

