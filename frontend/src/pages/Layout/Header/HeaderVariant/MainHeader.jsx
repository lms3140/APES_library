import style from "../Header.module.css";
import { SearchBar } from "../SearchBar/SearchBar";
import { UserActionMenus } from "../ActionIcons/UserActionMenus";

export function MainHeader() {
  return (
    <div className={style.headerInner}>
      {/* 로고는 따로 뺄 예정 */}
      <div className={style.logoWrapper}>
        <h1 className={style.logo}>무슨문고</h1>
      </div>
      <SearchBar />
      <UserActionMenus />
    </div>
  );
}
