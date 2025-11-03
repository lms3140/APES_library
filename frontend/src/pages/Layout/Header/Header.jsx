import style from "./Header.module.css";

export function Header({ children }) {
  return (
    <header>
      <div className={style.headerContainer}>{children}</div>
    </header>
  );
}
