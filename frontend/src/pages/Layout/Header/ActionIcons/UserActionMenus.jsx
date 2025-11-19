import { BsCart2 } from "react-icons/bs";
import { IoPersonSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import style from "./UserActionMenus.module.css";
export function UserActionMenus() {
  return (
    <div>
      <ul className={style.actionList}>
        <li>
          <Link className={style.actionCartLink} to={"#"}>
            <BsCart2 />
          </Link>
        </li>
        <li>
          <Link to={"/mypage"} className={style.actionMyPageLink}>
            <IoPersonSharp />
          </Link>
        </li>
      </ul>
    </div>
  );
}
