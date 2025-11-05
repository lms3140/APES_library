// import styles from "./SideBar.module.css";
import { Link } from "react-router-dom";

export function SideBar() {
  return (
    <nav>
      <h1>고객센터</h1>
      <ul>
        <li>
          <Link to="/cscenter">메인</Link>
        </li>
        <li>
          <Link to="/cscenter/faq">자주 묻는 질문</Link>
        </li>
        <li>
          <Link to="/cscenter/qna-form">1:1 문의</Link>
          <ul>
            <li>
              <Link to="/cscenter/qna-form">1:1 문의 접수</Link>
            </li>
            <li>
              <Link to="#">1:1 문의 내역</Link> {/* 마이페이지로 연결 */}
            </li>
          </ul>
        </li>
        <li>
          <Link to="/cscenter/notice">공지사항</Link>
        </li>
      </ul>
    </nav>
  );
}
