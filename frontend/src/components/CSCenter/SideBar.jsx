import styles from "./SideBar.module.css";
import { Link, NavLink } from "react-router-dom";

export function SideBar() {
  return (
    <nav className={styles.sidebar}>
      <h1>고객센터</h1>
      <ul>
        <li>
          <NavLink
            to="/cscenter"
            end
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <span>메인</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cscenter/faq"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <span>자주 묻는 질문</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cscenter/qna-form"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <span>1:1 문의</span>
          </NavLink>
          <ul>
            <li>
              <NavLink
                to="/cscenter/qna-form"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <span>1:1 문의 접수</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/mypage"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <span>1:1 문의 내역</span>
              </NavLink>
              {/* 마이페이지로 연결 */}
            </li>
          </ul>
        </li>
        <li>
          <NavLink
            to="/cscenter/notice"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <span>공지사항</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
