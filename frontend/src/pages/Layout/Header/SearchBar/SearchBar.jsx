import style from "./SearchBar.module.css";

export function SearchBar() {
  return (
    <div className={style.headerInputContainer}>
      <select className={style.headerInputSelect}>
        <option value="">1</option>
        <option value="">2</option>
      </select>
      <div className={style.headerInputWrapper}>
        <input
          className={style.headerInput}
          type="text"
          placeholder="검색ㄱㄱ"
        />
      </div>
    </div>
  );
}
