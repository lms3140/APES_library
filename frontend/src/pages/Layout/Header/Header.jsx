import style from "./Header.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { UserMenu } from "./UserMenu/UserMenu";
import { SearchBar } from "./SearchBar/SearchBar";
import { UserActionMenus } from "./ActionIcons/UserActionMenus";

export function Header() {
  return (
    <div className={style.header}>
      <UserMenu />

      <header id="control_header" className={style.headerContainer}>
        <div className={style.headerInner}>
          {/* 로고는 따로 뺄 예정 */}
          <div className={style.logoWrapper}>
            <h1 className={style.logo}>무슨문고</h1>
          </div>
          <SearchBar />
          <UserActionMenus />
        </div>
      </header>
    </div>
  );
}
