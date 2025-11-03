/** 로고 */

import { Link } from "react-router-dom";
import headerStyle from "./Header.module.css";

export function Logo() {
  return (
    <div className={headerStyle.logoWrapper}>
      <h1 className={headerStyle.logo}>
        <Link to={"/"}>무슨문고</Link>
      </h1>
    </div>
  );
}
