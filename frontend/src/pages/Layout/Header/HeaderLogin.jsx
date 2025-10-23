import style from "./Header.module.css";
import { MdArrowDropUp } from "react-icons/md";


export function HeaderLogin() {
  return (
    <div>
      <div className={style.userMenuContainer}>
        <div className={style.userMenuWrapper}>
          <ul>
            <li>
              <a href="#">로그아웃</a>
            </li>
            <li>
              <button type="button">
                <span>회원혜택 <MdArrowDropUp /></span>
              </button>
              <ul>
                <li><a href="#">교보북클럽</a></li>
                <li><a href="#">등급 혜택</a></li>
                <li><a href="#">신규회원 혜택</a></li>
                <li><a href="#">Prestige Lounge</a></li>
                <li><a href="#">제휴 혜택</a></li>
              </ul>
            </li>
            <li>
              <a href="#">주문배송</a>
            </li>
            <li>
              <a href="#">매장안내</a>
            </li>
            <li>
              <a href="#">고객센터</a>
            </li>
          </ul>
        </div>
      </div>

      <header className={style.headerContainer}>
        <div className={style.headerInner}>
          <div className={style.logoWrapper}>
            <h1 className={style.logo}>무슨문고</h1>
          </div>

          {/* 검색 컴포넌트로 분리 */}
          <div className={style.headerInputContainer}>
            <select className={style.headerInputSelect}>
              <option value="">1</option>
              <option value="">2</option>
            </select>
            <div className={style.headerInputWrapper}>
              <input
                className={style.headerInput}
                type="text"
                placeholder="검색ㄱㄱ"
              />
            </div>
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
      </header>
    </div>
  );
}
