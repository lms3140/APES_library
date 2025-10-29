import style from "./Header.module.css";
import { Link } from "react-router-dom";
import { MdArrowDropUp } from "react-icons/md";
import { useState } from "react";

export function Header() {
    // const isLogin = useSelector((state) => state.auth.isLogin);
    const [isLogin, setIslogin] = useState(false);

    return (
        <div>
            <div className={style.userMenuContainer}>
                <div className={style.userMenuWrapper}>
                    <ul>
                        {/* 로그인 안했을 때 노출 */}
                        {!isLogin && (
                            <>
                                <li>
                                    <Link to="/">회원가입</Link>
                                </li>
                                <li>
                                    <Link to="/">로그인</Link>
                                </li>
                            </>
                        )}
                        {/* 로그인 했을 때 노출 */}
                        {isLogin && (
                            <>
                                <li>
                                    <Link to="/">로그아웃</Link>
                                </li>
                            </>
                        )}
                        <li>
                            <button type="button">
                <span>
                  회원혜택 <MdArrowDropUp />
                </span>
                            </button>
                            <ul>
                                <li>
                                    <Link to="/">교보북클럽</Link>
                                </li>
                                <li>
                                    <Link to="/">등급 혜택</Link>
                                </li>
                                <li>
                                    <Link to="/">신규회원 혜택</Link>
                                </li>
                                <li>
                                    <Link to="/">Prestige Lounge</Link>
                                </li>
                                <li>
                                    <Link to="/">제휴 혜택</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/">주문배송</Link>
                        </li>
                        <li>
                            <Link to="/">매장안내</Link>
                        </li>
                        <li>
                            <Link to="/">고객센터</Link>
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