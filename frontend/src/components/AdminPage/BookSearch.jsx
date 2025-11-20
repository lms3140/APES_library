import { useState } from "react";
import style from "../../pages/AdminPage/AdminPage.module.css";
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
        <div className={style.bookSearchContainer}>
            <select 
                className={style.bookSearchSelect}
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
            >
                <option value="bookId">책 ID</option>
                <option value="title">책 제목</option>
            </select>
            <input 
                className={style.bookSearch}
                placeholder="검색"
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyPress}
            />
            <button
                className={style.searchBtn}
                onClick={handleSearch}
            >
                <FaSearch />
            </button>
        </div>
    )
}
  

