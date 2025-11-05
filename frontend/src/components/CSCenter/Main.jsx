// import styles from "./Main.module.css";
import { Link } from "react-router-dom";
import { LuMessageSquareMore } from "react-icons/lu";
import { IoDocumentTextOutline } from "react-icons/io5";

export function Main() {
  return (
    <div>
      <h1>무엇을 도와드릴까요?</h1>
      <h1>
        <span>교보문고 고객센터</span>입니다.
      </h1>
      <div>
        <h2>1:1 문의</h2>
        <ul>
          <li>
            <Link to="/cscenter/qna-form">
              <LuMessageSquareMore />
              <p>문의 접수</p>
            </Link>
            <Link to="#">
              {/* 마이페이지로 연결 */}
              <IoDocumentTextOutline />
              <p>문의 내역</p>
            </Link>
          </li>
          <li>
            <h4>전화 상담</h4>
            <div>
              <p>교보문고 1544-1900</p>
              <p>핫트랙스 1661-1112</p>
            </div>
            <div>
              <p>평일 09:00~18:00 (주말 및 공휴일 휴무)</p>
              <p>점심 12:00~13:00 (교보문고 전화상담만 가능)</p>
            </div>
          </li>
          <li>
            <h4>보이는 ARS</h4>
            <p>평일 09:00~18:00 (주말 및 공휴일 휴무)</p>
            <Link to="/cscenter/contact">전화상담서비스 안내도 {">"}</Link>
          </li>
        </ul>
      </div>
      <div>
        <h2>공지사항</h2>
        <Link to="/cscenter/notice">
          <span>더보기</span>
          <span>{"+"}</span>
        </Link>
      </div>
    </div>
  );
}
