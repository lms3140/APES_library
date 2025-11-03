import { UserActionMenus } from "../ActionIcons/UserActionMenus";
import style from "../Header.module.css";
import { Logo } from "../Logo";
import { SearchBar } from "../SearchBar/SearchBar";

export function FixedHeader() {
  return (
    <div className={style.headerInner}>
      <Logo />
      <SearchBar />
      <UserActionMenus />
    </div>
  );
}
