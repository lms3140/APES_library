import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setIsLogin } from "../../../../store/memberSlice";
import style from "./UserMenu.module.css";
import { infoSwal } from "../../../../api/api";

export function UserMenu() {
  const islogin = useSelector((state) => state.member.isLogin);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    dispatch(setIsLogin(false));
    infoSwal("로그아웃 완료", "로그아웃이 완료되었습니다", "확인");
  };

  return (
    <div className={style.userMenuContainer}>
      <div className={style.userMenuWrapper}>
        <ul className={style.userMenuList}>
          {/* 로그인 안했을 때 노출 */}
          {islogin ? (
            <>
              <li>
                <Link to={"/"} onClick={handleLogout}>
                  로그아웃
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signup-intro">회원가입</Link>
              </li>
              <li>
                <Link to="/login">로그인</Link>
              </li>
            </>
          )}
          {/* 로그인 했을 때 노출 */}
          <li className={style.menuItem}>
            <Link to="#">회원혜택</Link>
            {/* 회원 혜택 hover시 그리기 */}
            <div className={style.subMenu}>
              <ul>
                <li>
                  <Link to="#">교보북클럽</Link>
                </li>
                <li>
                  <Link to="#">등급 혜택</Link>
                </li>
                <li>
                  <Link to="#">신규회원 혜택</Link>
                </li>
                <li>
                  <Link to="#">Prestige Lounge</Link>
                </li>
                <li>
                  <Link to="#">제휴 혜택</Link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <Link to="#">주문배송</Link>
          </li>
          <li>
            <Link to="/store-info/001">매장안내</Link>
          </li>
          <li>
            <Link to="/cscenter">고객센터</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
