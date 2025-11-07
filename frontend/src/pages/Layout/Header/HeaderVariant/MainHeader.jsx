import style from "../Header.module.css";
import { SearchBar } from "../SearchBar/SearchBar";
import { UserActionMenus } from "../ActionIcons/UserActionMenus";
import { Logo } from "../Logo";

export function MainHeader() {
  return (
    <div className={style.headerInner}>
      {/* 로고는 따로 뺄 예정 */}
      <Logo />
      <SearchBar />
      <UserActionMenus />
    </div>
  );
}
