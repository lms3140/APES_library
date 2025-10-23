import style from "./Header.module.css";

export function Header() {
  return (
    <div>
      <div className={style.userMenuContainer}>
        <div className={style.userMenuWrapper}>
          <ul>
            <li>
              <a href="#">회원가입</a>
            </li>
            <li>
              <a href="#">로그인</a>
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
