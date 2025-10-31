import style from "../Header.module.css";
import { SearchBar } from "../SearchBar/SearchBar";

export function FixedHeader() {
  return (
    <div className={style.headerInner}>
      <div className={style.logoWrapper}>
        <h1 className={style.logo}>무슨문고</h1>
      </div>

      <SearchBar />
      <div className={style.headerUserMenu}>
        <ul>
          <li>
            <a href="#">🦼</a>
          </li>
          <li>
            <a href="#">👩</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
