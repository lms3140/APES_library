import style from "./Header.module.css";
import style2 from "./HeaderVariant/FixedHeader.module.css";

const headerTypeObject = {
  default: style.header,
  sticky: style2.fixedHeader,
};

export function Header({ headerType = "default", ref, children }) {
  return (
    <header ref={ref} className={headerTypeObject[headerType] || style.header}>
      <div className={style.headerContainer}>{children}</div>
    </header>
  );
}
