/** 로고 */

import { Link } from "react-router-dom";
import headerStyle from "./Header.module.css";

export function Logo() {
  return (
    <div className={headerStyle.logoWrapper}>
      <Link to={"/"}>
        <img src="/images/logo.png" alt="로고" className={headerStyle.logo} />
      </Link>
    </div>
  );
}
