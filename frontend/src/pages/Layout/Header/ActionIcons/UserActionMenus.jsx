import { IoPersonSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "./UserActionMenus.module.css";
export function UserActionMenus() {
  const cart = useSelector((state) => state.cart.items);
  return (
    <div>
      <ul className={style.actionList}>
        <li>
          <Link className={style.actionCartLink} to={"/cart"}>
            <img src="/images/search/ico_cart.png" alt="" />
            {cart && (
              <p className={style.cartBadge}>
                {cart.length !== 0 ? cart.length : 0}
              </p>
            )}
          </Link>
        </li>
        <li>
          <Link to={"/mypage/orders"} className={style.actionMyPageLink}>
            <IoPersonSharp />
          </Link>
        </li>
      </ul>
    </div>
  );
}
