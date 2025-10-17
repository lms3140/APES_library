import style from "./Header.module.css";

export function Header() {
  return (
    <div className={style.headerContainer}>
      <div className={style.headerInner}>
        <div className={style.headerInputContainer}>
          <h1 className={style.logo}>교보문고</h1>
          <input type="text" />
        </div>
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
    </div>
  );
}
