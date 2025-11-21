import styles from "./Main.module.css";
import noticeStyles from "./Notice.module.css";
import { Link } from "react-router-dom";
import { Notice } from "./Notice";
import { useEffect, useState } from "react";
import { axiosData } from "../../utils/dataFetch";

export function Main() {
  const [miniNotices, setMiniNotices] = useState([]);

  useEffect(() => {
    (async () => {
      const json = await axiosData("/data/csCenterNotice.json");
      setMiniNotices(json.slice(0, 3)); // ✅ 상위 3개만
    })();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.content}>
        <h1>무엇을 도와드릴까요?</h1>
        <h1>
          <span>교보문고 고객센터</span>입니다.
        </h1>

        <div className={styles.qnaSection}>
          <h2>1:1 문의</h2>
          <ul className={styles.qnaList}>
            <li>
              <Link to="/cscenter/qna-form">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  fill="#4DAC27"
                  fill-opacity="0"
                  stroke="#4DAC27"
                  stroke-width="0"
                  color="#4DAC27"
                >
                  <desc>chat 픽토그램</desc>
                  <path
                    fill="current"
                    fill-opacity="1"
                    stroke="none"
                    d="M25.82 23.46a1.499 1.499 0 0 1 2.56-1.06 1.499 1.499 0 1 1-2.12 2.12c-.28-.28-.44-.66-.44-1.06m-6.02 0a1.499 1.499 0 0 1 2.56-1.06 1.499 1.499 0 1 1-2.12 2.12c-.28-.28-.44-.66-.44-1.06m-6.02 0a1.499 1.499 0 0 1 2.56-1.06 1.499 1.499 0 1 1-2.12 2.12c-.28-.28-.44-.66-.44-1.06"
                  />
                  <path
                    fill="none"
                    stroke="#040000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m9.9 40.54 6.26-5.96h18.18c.86 0 1.7-.34 2.3-.96.62-.62.96-1.44.96-2.3V15c0-.86-.34-1.7-.96-2.3a3.24 3.24 0 0 0-2.3-.96H8.26c-.86 0-1.7.34-2.3.96A3.24 3.24 0 0 0 5 15v16.3c0 .86.34 1.7.96 2.3.62.62 1.44.96 2.3.96h1.72l-.08 5.96z"
                  />
                  <path
                    fill="none"
                    stroke="#040000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M42.78 21v-9.433c0-1.217-.42-2.373-1.18-3.23C40.84 7.478 39.82 7 38.74 7H32"
                  />
                </svg>
                <p>문의 접수</p>
              </Link>

              <Link to="/mypage">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  fill="none"
                  fill-opacity="0"
                  viewBox="0 0 48 48"
                  stroke="#4DAC27"
                  color="#4DAC27"
                >
                  <desc>document 픽토그램</desc>
                  <path
                    stroke="#000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M38 14.988v22.836C38 40.131 36.161 42 33.892 42H14.108C11.838 42 10 40.13 10 37.824V10.176C10 7.869 11.839 6 14.108 6h15.07z"
                  ></path>
                  <path
                    stroke="#000"
                    stroke-miterlimit="10"
                    stroke-width="2"
                    d="M38 16h-8.668A1.33 1.33 0 0 1 28 14.67V6"
                  ></path>
                  <path
                    stroke="current"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 28h16M16 33h12"
                  ></path>
                </svg>
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

        <div className={styles.noticeSection}>
          <h2>공지사항</h2>
          <Link to="/cscenter/notice">
            <span>더보기</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="none"
                stroke="#767676"
                stroke-width="2.5"
                viewBox="0 0 16 16"
              >
                <desc>더보기 플러스 아이콘</desc>
                <g stroke="current" stroke-linecap="round" clip-path="url(#a)">
                  <path d="M8 2v12m6-6H2" />
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" d="M0 0h16v16H0z" />
                  </clipPath>
                </defs>
              </svg>
            </span>
          </Link>

          <ul className={noticeStyles.listBody}>
            {miniNotices.map((item, idx) => (
              <li key={item.id ?? idx} className={noticeStyles.noticeItem}>
                <div className={noticeStyles.colNo}>{idx + 1}</div>
                <div className={noticeStyles.colTitle}>{item.title}</div>
                <div className={noticeStyles.colCategory}>{item.category}</div>
                <div className={noticeStyles.colDate}>{item.date}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
